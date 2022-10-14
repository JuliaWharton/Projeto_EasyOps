import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(innerProps) =>
        localStorage.getItem('email') ? (
          <Component {...innerProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
