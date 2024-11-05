import { useState, useEffect } from 'react';
import { GoSun } from 'react-icons/go';
import { FaMoon } from 'react-icons/fa';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface ThemeSwitherProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ThemeSwitherProps): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);
  const id = props.params.RenderingIdentifier;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`component ${props.params.Styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <GoSun /> : <FaMoon />}</button>
      </div>
    </div>
  );
};
