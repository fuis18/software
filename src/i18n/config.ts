export const languages = ['es', 'en'] as const;

export type LangCode = (typeof languages)[number];

export const defaultLang = 'es' satisfies LangCode;

export const labelOf = (code: string): string => code.toUpperCase();

/** hreflang a nivel de idioma: el propio código ("es"). */
export const hreflangOf = (code: string): string => code;

export const ogLocaleOf = (code: string): string => {
  try {
    const region = new Intl.Locale(code).maximize().region;
    if (region) return `${code.split('-')[0]}_${region}`;
  } catch {
  }
  return code.replace('-', '_').toUpperCase();
};

export const isSupportedLang = (value: unknown): value is LangCode =>
  typeof value === 'string' && (languages as readonly string[]).includes(value);
