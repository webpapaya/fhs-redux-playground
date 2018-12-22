import jwtDecode from 'jwt-decode';

const isJWTValid = () => {
    const jwt = global.localStorage.getItem('jwtToken');
    if (!jwt) { return false }
    const expiryDate = new Date(jwtDecode(jwt).exp * 1000)
    return expiryDate >= new Date();   
}

export default ({ children, authenticated }) => isJWTValid() === authenticated 
    ? children
    : null;
