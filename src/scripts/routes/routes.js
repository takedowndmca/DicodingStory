import HomePage from '../pages/home/home-page';
import RegisterPage from '../pages/register/register-page.js';
import LoginPage from '../pages/login/login-page.js';
import LogoutPage from '../pages/logout/logout-page.js';
import DetailPage from '../pages/detail/detail-page';
import AddPage from '../pages/add/add-page';
import BookmarkPage from '../pages/bookmark/bookmark-page';

const routes = {
  '/': new HomePage(),
  '/register': new RegisterPage(),
  '/login': new LoginPage(),
  '/logout': new LogoutPage(),
  '/story/:id': new DetailPage(),
  '/add': new AddPage(),
  '/bookmark': new BookmarkPage(),
};

export default routes;
