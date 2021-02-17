import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Home, Browse, Signin, Signup } from "./pages";
import * as ROUTES from "./constants/routes";

export default function App() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.data && user.data.role === "user";

  return (
    <>
      <Router>
        <Route exact path={ROUTES.HOME}>
          {isAuthenticated ? <Browse /> : <Home />}
        </Route>
        <Route exact path={ROUTES.BROWSE}>
          {isAuthenticated ? <Browse /> : <Signin />}
        </Route>
        <Route exact path={ROUTES.SIGNIN} component={Signin}></Route>
        <Route exact path={ROUTES.SIGNUP} component={Signup}></Route>
      </Router>
    </>
  );
}
