export default class SignUp {
    constructor(signUpform) {
        this.form = document.querySelector(signUpform);
    }

    signUp() {
        this.form.addEventListener('click', function(event) {
            event.preventDefault();
            let target = event.target;
            let users = [];
            this.children[0].addEventListener('input', function() {
                if(localStorage.getItem('users')) {
                    let usersData = JSON.parse(localStorage.getItem('users'));
                    for (let i = 0; i < usersData.length; i++) {
                        if(this.value === usersData[i].login) {
                            this.classList.add('error');
                            this.nextElementSibling.style.display = 'block';
                        } else {
                            this.nextElementSibling.style.display = 'none';
                            this.classList.remove('error');
                        }
                    }
                }
            });
            if(target.classList.contains('signup__form-btn')) {
                if(localStorage.getItem('users') === null) {
                    localStorage.setItem('users', JSON.stringify(users));
                }
                let login = this.children[0].value;
                let password = this.children[2].value;
                let usersData = JSON.parse(localStorage.getItem('users'));   
                if(login.length > 0 && password.length > 0) {
                    let user = {
                        login: login,
                        password: password,
                        isAdmin: false,
                        canAdd: true,
                        canEdit: true,
                        canDelete: true,
                    };
                    usersData.push(user);
                    localStorage.setItem('users', JSON.stringify(usersData));
                    this.reset();
                }
            }
        });
    }
}