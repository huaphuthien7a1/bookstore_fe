import cookie from 'js-cookie';

class AuthService {
  login = ({ accessToken, name, roles, id, email }: any) => {
    cookie.set('accessToken', `${accessToken}`, { expires: 7 });
    const userPayload = { name, roles, id, email };
    const userStringify = JSON.stringify(userPayload);
    localStorage.setItem('user', userStringify);
  };

  logOut = () => {
    cookie.remove('accessToken');
    localStorage.clear();
  };

  getUser = () => {
    let user = localStorage.getItem('user') || '';
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  };

  getAccessToken = () => cookie.get('accessToken') || '';

  isAuthenticated = () => !!this.getAccessToken() && !!this.getUser();
}

const authService = new AuthService();

export default authService;
