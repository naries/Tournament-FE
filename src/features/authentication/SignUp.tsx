import { AuthModel } from "authentication-feature";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "../../store";

const SignUp = () => {
  const {
    auth: { signup },
  } = useDispatch<Dispatch>();

  const [credentials, setCredentials] = useState<
    AuthModel & { fplid: string; username: string }
  >({
    emailAddress: "",
    password: "",
    fplid: "",
    username: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(credentials);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <div>
      <div>Sign Up</div>
      <form onSubmit={submit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="emailAddress"
          value={credentials.emailAddress}
          onChange={handleChange}
        />
        <label htmlFor="fpl-id">FPL Manager ID</label>
        <input
          id="fpl-id"
          type="text"
          name="fplid"
          value={credentials.fplid}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={credentials.username}
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
      <Link to="/sign-in">Sign in instead</Link>
    </div>
  );
};

export default SignUp;
