export default class SignIn {
    constructor(signInForm) {
        this.form = document.querySelector(signInForm);
    }

    signIn() {
        this.form.addEventListener('click', function(e) {
            let target = e.target;
            if(target.classList.contains('signin__form-btn')) {
                e.preventDefault();
                if(localStorage.getItem('users')) {
                    let users = JSON.parse(localStorage.getItem('users'));
                    let login = this.children[0].value;
                    let password = this.children[1].value;
                    for (let i = 0; i < users.length; i++) {
                        if(login === users[i].login && password === users[i].password) {
                            let currentUser = {
                                login: login,
                                password: password
                            }
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            this.reset();
                            location.href="notes.html";
                        }
                    }
                }
            }
        });
    }
}