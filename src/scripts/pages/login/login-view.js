export default class LoginView {
  static render() {
    return `
      <section class="login-container form-container">
        <h2>Login</h2>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" required />
          
          <label for="password">Password</label>
          <input type="password" id="password" minlength="8" required />
          
          <button type="submit">Login</button>
        </form>
        <p id="login-message"></p>
      </section>
    `;
  }

  get form() {
    return document.getElementById('login-form');
  }

  get messageElement() {
    return document.getElementById('login-message');
  }

  showMessage(message) {
    this.messageElement.textContent = message;
  }

  disableButton() {
    const button = this.form.querySelector('button');
    button.disabled = true;
    button.classList.add('loading');
  }

  enableButton() {
    const button = this.form.querySelector('button');
    button.disabled = false;
    button.classList.remove('loading');
  }

  getEmail() {
    return document.getElementById('email').value;
  }

  getPassword() {
    return document.getElementById('password').value;
  }
}
