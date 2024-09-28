import { createContext } from 'react';
import { Language } from '@/constants/locales';

export interface ILanguageContext {
  language: string;
  setLanguage: (t: Language) => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: '',
  setLanguage: (l: Language) => {
    console.info(
      `[src/contexts/languageContext.ts]: setLanguage() was called with ${l} as a parameter but is not yet implemented.`
    );
  },
});
