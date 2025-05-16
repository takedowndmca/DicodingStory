export default class RegisterView {
  static render() {
    return `
      <section class="register-container form-container">
        <h2>Register</h2>
        <form id="register-form">
          <label for="name">Name</label>
          <input type="text" id="name" required />
          
          <label for="email">Email</label>
          <input type="email" id="email" required />
          
          <label for="password">Password</label>
          <input type="password" id="password" minlength="8" required />
          
          <button type="submit">Register</button>
        </form>
        <p id="register-message"></p>
      </section>
    `;
  }

  get form() {
    return document.getElementById('register-form');
  }

  get messageElement() {
    return document.getElementById('register-message');
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

  getName() {
    return document.getElementById('name').value;
  }

  getEmail() {
    return document.getElementById('email').value;
  }

  getPassword() {
    return document.getElementById('password').value;
  }
}
