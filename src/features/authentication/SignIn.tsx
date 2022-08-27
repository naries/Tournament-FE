import { AuthModel } from "authentication-feature";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch, RootState } from "../../store";
/* eslint-disable */
const SignIn = () => {
  const authentication = useSelector((state: RootState) => state.auth);
  console.log(authentication);
  const {
    auth: { signin },
  } = useDispatch<Dispatch>();

  const [credentials, setCredentials] = useState<AuthModel>({
    emailAddress: "",
    password: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(credentials);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <div>
      <div>SignIn</div>
      <form onSubmit={submit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="emailAddress"
          value={credentials.emailAddress}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
      <Link to="/sign-up">Sign up instead</Link>
    </div>
  );
};

export default SignIn;
