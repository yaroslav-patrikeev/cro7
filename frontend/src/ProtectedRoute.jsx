import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ isLoggedIn, component }) => {
	return isLoggedIn ? component : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;
