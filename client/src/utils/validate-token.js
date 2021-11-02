import jwtDecode from "jwt-decode";

const validateToken = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);

    return decodedToken?.exp * 1000 > Date.now();
  } else {
    return false;
  }
};

export default validateToken;
