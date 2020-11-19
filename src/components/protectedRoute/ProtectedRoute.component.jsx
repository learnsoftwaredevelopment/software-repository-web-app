/* eslint-disable react/jsx-props-no-spreading */

import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/auth/Auth.context';

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...otherProps}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
