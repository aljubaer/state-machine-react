import { Route, Redirect } from "react-router-dom";


export default function PrivateRoute({ children, machine, ...rest }) {
    const user = machine.context.user;

    const hasValidUser = () => user !== undefined;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          hasValidUser() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }