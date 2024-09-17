import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';
import { useEffect, useState } from 'react';
import { LanguageContext } from '@/contexts/languageContext';
import locales, { Language } from '@/constants/locales';
import { PageController, WidgetsProvider } from '@sitecore-search/react';
import type { Environment } from '@sitecore-search/data';
import { SEARCH_ENV, SEARCH_CUSTOMER_KEY, SEARCH_API_KEY } from '@/constants/build';
import useStorage from '@/hooks/useLocalStorage';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  const [storageLanguage, setStorageLanguage] = useStorage('lang', 'en' as Language);
  const [language, setLanguage] = useState<Language>(storageLanguage);

  PageController.getContext().setLocaleLanguage(language);
  PageController.getContext().setLocaleCountry(locales[language].country);

  useEffect(() => {
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
    setStorageLanguage(language);
  }, [language, setStorageLanguage]);

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <WidgetsProvider
            env={SEARCH_ENV as Environment}
            customerKey={SEARCH_CUSTOMER_KEY}
            apiKey={SEARCH_API_KEY}
          >
            <Component {...rest} />
          </WidgetsProvider>
        </LanguageContext.Provider>
      </I18nProvider>
    </>
  );
}

export default App;
