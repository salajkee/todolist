export default class OtherScripts {
    constructor() {}

    render() {
        let profileName = document.querySelector('.header__profile-name');
        let permissions = document.querySelector('.permissions-link');
        let userLogin = document.querySelector('.user__form-login');
        let userPassword = document.querySelector('.user__form-pw');
        let userConfirmPassword = document.querySelector('.user__form-pw-confirm');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        profileName.textContent = currentUser.login;

        currentUser.isAdmin ? permissions : permissions.style.display = 'none'

        userLogin.value = currentUser.login;

        userPassword.value = currentUser.password;

        userConfirmPassword.value = currentUser.password;

    }
}