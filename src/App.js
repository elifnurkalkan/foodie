import Category from './components/Category';
import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import './App.css';
import AppContextProvider from './components/context/appContext';
import Logo from './components/Logo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <div className="nav">
            <Logo />
            <Search />
            <Category />
            <Pages />
          </div>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
