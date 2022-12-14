export default class SignUp {
    constructor(signUpform) {
        this.form = document.querySelector(signUpform);
    }

    render() {
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
                            break;
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
                if(!this.children[0].classList.contains('error')) {
                    if(login.length > 4 && password.length > 0) {
                        let user = {
                            login: login,
                            password: password,
                            isAdmin: false,
                            canAdd: true,
                            canEdit: true,
                            canDelete: true,
                        };
                        if(login === 'admin' && password === 'admin') {
                            user.isAdmin = true;
                        }
                        usersData.push(user);
                        localStorage.setItem('users', JSON.stringify(usersData));
                        this.reset();
                    } else if(login.length < 5) {
                        this.children[1].textContent = 'Your account must be at least 5 characters';
                        this.children[1].style.display = 'block';
                    } else {
                        this.children[1].style.display = 'none';
                    }
                }
            }
        });
    }
}