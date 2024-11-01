import { useState, useEffect } from 'react';

export const Default = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'ライトモード' : 'ダークモード'}
      </button>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <p>このテキストはテーマに応じて色が変わります。</p>
      </div>
    </>
  );
};
