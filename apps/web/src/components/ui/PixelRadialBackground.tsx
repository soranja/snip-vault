import { FC, useEffect, useRef } from "react";
import { PixelRadialBackgroundProps } from "../../props";

export const PixelRadialBackground: FC<PixelRadialBackgroundProps> = ({
  pixelSize,
  ringLevels,
  from,
  to,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const centerX = 0.5;
  const centerY = 0.5;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    // color -> rgb
    const toRGB = (color: string): [number, number, number] => {
      const tmp = document.createElement("canvas").getContext("2d");
      if (!tmp) return [0, 0, 0];
      tmp.fillStyle = color;
      const norm = tmp.fillStyle;

      const m1 =
        /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i.exec(
          norm
        );
      if (m1)
        return [m1[1], m1[2], m1[3]].map((n) => Math.round(+n)) as [
          number,
          number,
          number,
        ];

      const m2 = /^#?([0-9a-f]{6})$/i.exec(norm);
      if (m2) {
        const hex = m2[1];
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ];
      }
      return [0, 0, 0];
    };

    const cFrom = toRGB(from);
    const cTo = toRGB(to);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const wCSS = window.innerWidth;
      const hCSS = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // virtual low-res size
      const block = Math.round(pixelSize);
      const vw = Math.max(1, Math.ceil(wCSS / block));
      const vh = Math.max(1, Math.ceil(hCSS / block));

      // hi-DPI aware backing store to avoid weird aspect artifacts
      canvas.width = Math.max(1, Math.floor(wCSS * dpr));
      canvas.height = Math.max(1, Math.floor(hCSS * dpr));
      canvas.style.width = `${wCSS}px`;
      canvas.style.height = `${hCSS}px`;

      // crisp upscaling
      (ctx as CanvasRenderingContext2D).imageSmoothingEnabled = false;
      (canvas.style as any).imageRendering = "pixelated";

      // build stepped radial into a tiny ImageData (vw x vh)
      const img = new ImageData(vw, vh);
      const data = img.data;

      const cx = Math.floor(vw * centerX);
      const cy = Math.floor(vh * centerY);
      const maxR = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
      const denom = Math.max(1, ringLevels - 1);

      let i = 0;
      for (let y = 0; y < vh; y++) {
        for (let x = 0; x < vw; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const r = Math.hypot(dx, dy) / maxR; // 0..1
          const t = Math.min(1, Math.max(0, Math.round(r * denom) / denom)); // snap to ring

          data[i++] = Math.round(lerp(cFrom[0], cTo[0], t));
          data[i++] = Math.round(lerp(cFrom[1], cTo[1], t));
          data[i++] = Math.round(lerp(cFrom[2], cTo[2], t));
          data[i++] = 255;
        }
      }

      // paint the tiny buffer to a tiny offscreen canvas…
      const off = document.createElement("canvas");
      off.width = vw;
      off.height = vh;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.putImageData(img, 0, 0);

      // …then upscale it with nearest-neighbor into the main canvas
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // map CSS -> device pixels
      ctx.clearRect(0, 0, wCSS, hCSS);
      ctx.drawImage(off, 0, 0, vw, vh, 0, 0, wCSS, hCSS);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [pixelSize, ringLevels, from, to, centerX, centerY]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 select-none"
      aria-hidden="true"
    />
  );
};
