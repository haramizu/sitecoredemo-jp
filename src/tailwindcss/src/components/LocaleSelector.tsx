import React, { useContext, useEffect } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import languages, { Language } from '@/constants/locales';
import { LanguageContext, ILanguageContext } from '@/contexts/languageContext';

interface LocaleSelectorProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: LocaleSelectorProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const { language, setLanguage } = useContext<ILanguageContext>(LanguageContext);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('lang') as Language | null;

    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as Language;
    const currentPath = window.location.pathname;

    setLanguage(newLanguage);

    window.localStorage.setItem('lang', newLanguage);

    let newPath = currentPath;

    if (currentPath.startsWith('/ja-JP')) {
      newPath = currentPath.replace('/ja-JP', '');
    }

    if (newLanguage === 'ja') {
      newPath = `/ja-JP${newPath}`;
    } else if (newLanguage === 'en') {
      newPath = `${newPath}`;
    }
    window.location.href = newPath;
  };

  return (
    <div className={`component localeselector`} id={id ? id : undefined}>
      <div className="component-content">
        <select onChange={handleLanguageChange} value={language || ''}>
          {Object.keys(languages).map((key) => (
            <option key={key} value={key}>
              {languages[key as Language].label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
