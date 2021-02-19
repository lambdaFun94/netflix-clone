import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components";
import { signupUser } from "../redux/slices/userSlice";
import * as ROUTES from "../constants/routes";

export default function Signup({ history, location }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.user);

  const isInvalid = name === "" || password === "" || email === "";
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  const redirect = location.history
    ? location.search.split("=")[1]
    : ROUTES.BROWSE;

  useEffect(() => {
    data && data.user === "user" && history.push(redirect);
  }, [data, history, redirect]);

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignup}>
            <Form.Input
              placeholder="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            ></Form.Input>
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
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already signed up? <Form.Link to="/signin">Sign in now.</Form.Link>
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
