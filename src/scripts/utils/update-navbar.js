export function updateNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const loginLink = document.querySelector('#nav-login');
  const registerLink = document.querySelector('#nav-register');
  const logoutLink = document.querySelector('#nav-logout');
  const notif = document.querySelector('#nav-notification');
  const bookmark = document.querySelector('#nav-bookmark');

  if (loginLink && registerLink && logoutLink && notif && bookmark) {
    if (isLoggedIn) {
      loginLink.classList.add('d-none');
      registerLink.classList.add('d-none');
      logoutLink.classList.remove('d-none');
      notif.classList.remove('d-none');
      bookmark.classList.remove('d-none');
    } else {
      loginLink.classList.remove('d-none');
      registerLink.classList.remove('d-none');
      logoutLink.classList.add('d-none');
      notif.classList.add('d-none');
      bookmark.classList.add('d-none');
    }
  }
}
