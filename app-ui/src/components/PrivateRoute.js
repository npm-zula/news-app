import { useNavigate, Route } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  const navigate = useNavigate();

  const checkUserAuthentication = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (cookieValue) {
      const token = cookieValue.split("=")[1];
      // Replace this with your actual token verification logic
      const isValidToken = verifyToken(token);

      return isValidToken;
    }

    return false;
  };

  const verifyToken = (token) => {
    // Perform token verification logic, e.g., decoding and checking expiration
    // Return true if the token is valid, false otherwise
    return true;
  };

  if (checkUserAuthentication()) {
    return <Route path={path} element={element} />;
  } else {
    navigate("/login"); // Redirect to login page if user is not authenticated
    return null;
  }
};

export default PrivateRoute;
