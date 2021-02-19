import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components";
import { signinUser } from "../redux/slices/userSlice";
import * as ROUTES from "../constants/routes";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.user);

  const isInvalid = password === "" || email === "";
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  useEffect(() => {
    if (!error && data.role) {
      history.push(ROUTES.BROWSE);
    }
  }, [data, error, history]);

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignIn} method="POST">
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            ></Form.Input>
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></Form.Input>
            <Form.Submit disabled={isInvalid} type="submit">
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Netflix?
            <Form.Link to={ROUTES.SIGNUP}> Sign up now.</Form.Link>
          </Form.Text>
          <Form.Text>
            This page is protected by Google reCAPTCHA, so don't span me
          </Form.Text>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
