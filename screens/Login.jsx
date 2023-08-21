import React, { Fragment } from "react";
import RegiserUser from "../components/AuthComponents/RegiserUser";
import SignIn from "../components/AuthComponents/SignIn";

const Login = () => {
  const [newUser, setNewUser] = React.useState(true);
  return (
    <Fragment>
      {newUser ? (
        <RegiserUser setNewUser={(value) => setNewUser(value)} />
      ) : (
        <SignIn setNewUser={(value) => setNewUser(value)} />
      )}
    </Fragment>
  );
};
export default Login;
