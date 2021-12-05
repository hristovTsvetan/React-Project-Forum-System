import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdminPanel from "./components/Admin/AdminPanel";
import Posts from "./components/Posts/Posts";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <BrowserRouter>
          <Header />
          <AdminPanel />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/category/:id/subcategory">
              <Posts />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
