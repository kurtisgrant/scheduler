import { useState } from 'react';

export default (initMode) => {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => {
        prev.pop();
        return [...prev, newMode];
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }

    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  return { mode, transition, back };
};