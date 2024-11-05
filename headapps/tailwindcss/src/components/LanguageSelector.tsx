import React, { useCallback, useMemo, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface LanguageSelectorProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: LanguageSelectorProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const availableLanguages = useMemo(
    () => [
      { code: 'en', label: 'English' },
      { code: 'ja-JP', label: '日本語' },
    ],
    []
  );

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const changeLanguage = useCallback(
    (langCode: string) => {
      if (pathname && asPath && query) {
        router.push(
          {
            pathname,
            query,
          },
          asPath,
          {
            locale: langCode,
            shallow: false,
          }
        );
      }
    },
    [asPath, pathname, query, router]
  );

  return (
    <div
      className={`component ${props.params.Styles}`}
      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
    >
      <div className="component-content language-switcher flex items-center relative">
        <span className="selected-language">
          {availableLanguages.find((lang) => lang.code === sitecoreContext.language)?.label}
        </span>
        {showLanguageDropdown ? (
          <IoIosArrowUp className="ml-2" />
        ) : (
          <IoIosArrowDown className="ml-2" />
        )}
        {showLanguageDropdown && (
          <div className="absolute top-full mt-2 language-dropdown z-50 bg-white dark:bg-gray-900 border rounded shadow-lg">
            {availableLanguages.map((lang) => (
              <span
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="block px-4 py-2 hover:bg-gray-200 hover:dark:bg-gray-800 cursor-pointer"
              >
                {lang.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
