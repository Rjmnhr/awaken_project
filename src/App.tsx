

import './App.css';
import AppRoute from './app-router/app-router';
import { AppContextProvider } from './context/app-context';

function App() {
  return (
    
    <div className="App">
      <AppContextProvider>

    <AppRoute/>
      </AppContextProvider>
    </div>
  );
}

export default App;
