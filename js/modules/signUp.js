import PopupNotice from './popupNotice.js';

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
                            this.nextElementSibling.textContent = 'That username is taken. Try another.';
                            this.nextElementSibling.style.display = 'block';
                            break;
                        } else {
                            this.nextElementSibling.textContent = '';
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
                let usersData = JSON.parse(localStorage.getItem('users'));
                if(!this.children[0].classList.contains('error')) {
                    if(this.children[0].value.length >= 5 && this.children[2].value.length > 0) {
                        let user = {
                            login: this.children[0].value,
                            password: this.children[2].value,
                            isAdmin: false,
                            canAdd: true,
                            canEdit: true,
                            canDelete: true,
                        };
                        if(this.children[0].value === 'admin' && this.children[2].value === 'admin') {
                            user.isAdmin = true;
                        }
                        usersData.push(user);
                        localStorage.setItem('users', JSON.stringify(usersData));
                        let popupNotice = new PopupNotice('.popup-notice');
                        popupNotice.popupNotice('You have successfully registered!');
                        this.reset();
                    } else if(this.children[0].value.length < 5) {
                        this.children[0].classList.add('error');
                        this.children[1].textContent = 'Your account must be at least 5 characters.';
                        this.children[1].style.display = 'block';
                    }
                }
            }
        });
    }
}