import { defaultLang, languages, type LangCode } from './config';

const langPattern = () => new RegExp(`/(${languages.join('|')})/`);

/** Normaliza `import.meta.env.BASE_URL` para que termine en "/". */
export function getBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}

export function getLangFromPath(pathname: string): LangCode {
  const match = pathname.match(langPattern());
  return (match?.[1] as LangCode) ?? defaultLang;
}

export function localizePath(pathname: string, toLang: string): string {
  const pattern = langPattern();
  if (pattern.test(pathname)) return pathname.replace(pattern, `/${toLang}/`);

  const base = getBase();
  const withoutBase = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, '');
  return `${base}${toLang}/${withoutBase}`;
}
