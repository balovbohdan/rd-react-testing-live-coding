import { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { v4 } from 'uuid';
import logo from './logo.svg';
import './App.css';

/*
App
  Header1
    Header2
      Paragraph1
        Paragraph2
*/

const CounterContext = createContext<{
  value: number,
  incerement: () => void
}>({
  value: 0,
  incerement() {}
});

const useCounterContext = () =>
  useContext(CounterContext);

function Paragraph() {
  const counterContext = useCounterContext();

  return (
    <p>
        <img src={logo} className="App-logo" alt="logo" />
        Edit <code>src/App.tsx</code> and save to reload.
        Count: {counterContext.value}
        <button onClick={() => {
          counterContext.incerement();
        }}>Increment</button>
      </p>
  )
}

function Header() {
  return (
    <header className="App-header">
      <Paragraph />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function App() {
  const [count, setCount] = useState<number>(0);

  const handleDocumentClick = useCallback(() => {
    console.log('document clicked!');
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <CounterContext.Provider value={{
      value: count,
      incerement() {
        setCount((currentCount) => currentCount + 1);
      }
    }}>
      <div className="App">
        <Header />
        {v4()}
      </div>
    </CounterContext.Provider>
  );
}

export default App;
