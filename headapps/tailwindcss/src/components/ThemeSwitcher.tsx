import { useState, useEffect } from 'react';
import { GoSun } from 'react-icons/go';
import { FaMoon } from 'react-icons/fa';
import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

interface ThemeSwitherProps {
  params: ComponentParams;
}

export const Default = (props: ThemeSwitherProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`component ${props.params.Styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <GoSun />}</button>
      </div>
    </div>
  );
};
