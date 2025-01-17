import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Head>
        <title>Next.js Front Page</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" />
      </Head>
      <h1 className="main-font">...less</h1>
      <a href="https://pendless.com" className="no-style-link">go pendless</a>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <style jsx>{`
        .dark {
          background-color: #545454;
          color: #e4e2dd;
        }
        .light {
          background-color: #e4e2dd;
          color: #545454;
        }
        .main-font {
          font-family: 'Archivo Black', sans-serif;
          text-align: center;
        }
        .no-style-link {
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          color: inherit;
          display: block;
          text-align: center;
          margin-top: 10px;
        }
        button {
          display: block;
          margin: 20px auto;
        }
      `}</style>
    </div>
  );
};

export default Home;
