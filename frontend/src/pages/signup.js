import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check elems are valid

  const isInvalid = name === "" || password === "" || emailAddress === "";
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(ROUTES.SIGNUP_POST, {
        name,
        email: emailAddress,
        password,
        profilePicture: Math.floor(Math.random() * 5) + 1,
      });

      if (data.success) {
        history.push(ROUTES.BROWSE);
      } else {
        setError("User not created! Please try again.");
      }
    } catch (err) {
      setName("");
      setEmailAddress("");
      setPassword("");
      setError("User not created! Please try again.");
    }
  };

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
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
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
