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
import CreatePost from "./components/Posts/CreatePost";
import CreateComment from "./components/Comments/CreateComment";

function App() {
  const {modal} = useModal();
  const {isAuthReady, user} = useUser();

  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          {modal && <Modal />}
          <div className="wrapper">
            <Header />
            {user && user.role === 'admin' && <AdminPanel />}
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
              <Route path="/CreatePost/:categoryid/:subcategoryid">
                {user && <CreatePost />}
                {!user && <Redirect to="/" />}
              </Route>
              <Route path="/CreateComment/:categoryid/:subcategoryid/:postId">
                {user && <CreateComment />}
                {!user && <Redirect to="/" />}
              </Route>
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
