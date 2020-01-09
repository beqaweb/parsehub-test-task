import React from 'react';
import './App.css';

import CodeWrapper from './components/CodeWrapper';
import FileExplorer from './components/FileExplorer';

const App = () => {
  return (
    <div className="App">
      <FileExplorer />
      <CodeWrapper />
    </div>
  );
};

export default App;
