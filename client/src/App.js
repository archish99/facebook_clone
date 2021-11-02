import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import HomePage from "./layout/home-page/home-page.layout";
import LoginSignUp from "./layout/login-signUp/login-signUp.layout";
import { selectUsername, setSignOutState } from "./redux/userSlice/userSlice";
import validateToken from "./utils/validate-token";

function App() {
  const username = useSelector(selectUsername);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const toast = useToast();

  useEffect(() => {
    console.log("Type of token: ", typeof token);
    if (token) {
      if (!validateToken(token)) {
        toast({
          title: "Session expired",
          description: "Logging you out",
          status: "error",
          duration: 1000,
        });
        setTimeout(() => {
          dispatch(setSignOutState());
          localStorage.setItem("token", "");
        }, 1200);
      }
    } else console.log("hello");
  }, [token, validateToken]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          username ? <HomePage /> : <Redirect to="/login-signup" />
        }
      />
      <Route
        path="/login-signup"
        render={() => (username ? <Redirect to="/" /> : <LoginSignUp />)}
      />
    </Switch>
  );
}

export default App;
