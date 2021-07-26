/* eslint-disable react/jsx-props-no-spreading */

import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/auth/Auth.context';

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...otherProps}
      render={
        // eslint-disable-next-line no-confusing-arrow
        (props) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([PropTypes.object]),
};

ProtectedRoute.defaultProps = {
  location: {
    state: {
      from: '/',
    },
  },
};

export default ProtectedRoute;
