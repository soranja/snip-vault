export const enum ESnippetLanguageSyntax {
  js = 'js',
  ts = 'ts',
  jsx = 'jsx',
  tsx = 'tsx',
  json = 'json',
  astro = 'astro',
  css = 'css',
  html = 'html',
  command = 'command',
  quote = 'quote',
}

export type TSnippetFile = {
  path: string; // relative to the snippet
  syntax: ESnippetLanguageSyntax;
  code: string; // verbatim UTF-8 text
};

export type TSnippetEntry = {
  id: string; // folder / slug (unique across all snippets)
  title: string; // human-readable title (must be searchable)
  tags: string[]; // default to [], for filtering
};

export type TSnippetMeta = {
  entry: TSnippetEntry;
  description: string | null; //  short description (optional)
  createdAt: string; // ISO, default now()
  updatedAt: string; // ISO, default to createdAt if missing
};

export type TSnippet = {
  meta: TSnippetMeta;
  files: TSnippetFile[];
  html: Record<string, string>; // HTML per file (single theme); key = file path, value = highlighted HTML
  plainText: string; // for quick client-side search; joined raw files + title + description
};

export type TSnippetList = {
  count: number; // number of snippets
  snippets: TSnippetEntry[]; // list for gallery
};
