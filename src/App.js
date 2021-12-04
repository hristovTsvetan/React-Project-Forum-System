import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
      <BrowserRouter>
        <Header />

        <Switch>
          
        </Switch>

      </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
