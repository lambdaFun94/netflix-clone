import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Home, Browse, Signin, Signup } from "./pages";
import * as ROUTES from "./constants/routes";

export default function App() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.data && user.data.role === "user";

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            {isAuthenticated ? <Redirect to={ROUTES.BROWSE} /> : <Home />}
          </Route>
          <Route exact path={ROUTES.BROWSE}>
            {!isAuthenticated ? <Redirect to={ROUTES.HOME} /> : <Browse />}
          </Route>
          <Route exact path={ROUTES.SIGNIN} component={Signin}></Route>
          <Route exact path={ROUTES.SIGNUP} component={Signup}></Route>
        </Switch>
      </Router>
    </>
  );
}

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  console.log("auth:" + auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
