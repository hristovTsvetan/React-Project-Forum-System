import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useModal } from "./hooks/useModal";

import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdminPanel from "./components/Admin/AdminPanel";
import Posts from "./components/Posts/Posts";
import Comments from "./components/Comments/Comments";
import Modal from "./components/Modal/Modal";
import { useUser } from "./hooks/useUser";

function App() {
  const {modal} = useModal();
  const {isAuthReady, user} = useUser();

  return (
    <div className="App">
      {isAuthReady && <>
        {modal && <Modal />}
          <div className="wrapper">
            <BrowserRouter>
              <Header />
              <AdminPanel />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  {!user && <Login />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/signup">
                  {!user && <Signup />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/posts/:categoryid/:subcategoryid">
                  <Posts />
                </Route>
                <Route path="/comments/:catId/:subId/:postId">
                  <Comments />
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
          <Footer />
          </>}
    </div>
  );
}

export default App;
