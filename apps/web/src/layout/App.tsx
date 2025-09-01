import { PixelRadialBackground } from "../components/ui/PixelRadialBackground";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-black">snip-vault</div>
      <PixelRadialBackground
        pixelSize={25}
        ringLevels={50}
        from="#38bdf8"
        to="#1e40af"
      />
    </div>
  );
}
