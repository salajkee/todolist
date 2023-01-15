export default class Permissions {
    constructor(form, usersList, login, password, showPw, makeAdmin, generate, addUserBtn) {
        this.permissionsForm = document.querySelector(form);
        this.usersList = document.querySelector(usersList);
        this.login = document.querySelector(login);
        this.password = document.querySelector(password);
        this.showPw = document.querySelector(showPw);
        this.makeAdmin = document.querySelector(makeAdmin);
        this.generate = document.querySelector(generate);
        this.addUserBtn = document.querySelector(addUserBtn);
    }

    saveUserList(data) {
        if(data) {
            for (let i = 0; i < data.length; i++) {
                let user = `<li class="permissions__users-list-item-${i}"><div class="permissions__users-list-inner">
                                <p class="permissions__users-list-name permissions__name-${i}">${data[i].login}</p>
                                <button class="permissions__users-list-delete-btn" data-item="${i}">Delete</button>
                                <button class="permissions__users-list-change-btn" data-item="${i}">Change</button>
                            </div></li>`;
                this.usersList.insertAdjacentHTML('beforeend', user);
            }
        }
    }

    generatePassword() {
        let symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let generatePassword = '';

        for (let i = 0; i < 8; i++) {
            let num = Math.floor(Math.random() * symbols.length);
            generatePassword += symbols[num];
        }

        if(this.generate.checked) {
            this.password.value = generatePassword;
        } else {
            this.password.value = '';
        }
    }

    render() {
        let usersData = JSON.parse(localStorage.getItem('users'));
        this.saveUserList(usersData);

        this.login.addEventListener('input', () => {
            let usersData = JSON.parse(localStorage.getItem('users'));
            for (let i = 0; i < usersData.length; i++) {
                if(this.login.value === usersData[i].login) {
                    this.login.classList.add('error');
                    this.login.nextElementSibling.textContent = 'That username is taken. Try another';
                    this.login.nextElementSibling.style.display = 'block';
                    break;
                } else {
                    this.login.nextElementSibling.style.display = 'none';
                    this.login.classList.remove('error');
                }
            }
        });

        this.generate.addEventListener('click', () => {
            this.generatePassword();
        });

        this.showPw.addEventListener('click', () => {
            if(this.showPw.checked) {
                this.password.setAttribute('type', 'text');
            } else {
                this.password.setAttribute('type', 'password');
            }
        });

        this.addUserBtn.addEventListener('click', (e) => {
            let usersData = JSON.parse(localStorage.getItem('users'));
            e.preventDefault();
            let admin;
            if(this.makeAdmin.checked) {
                admin = true;
            } else {
                admin = false;
            }
            if(!this.login.classList.contains('error')) {
                if(this.login.value.length >= 5 && this.password.value.length > 0) {
                    let user = {
                        login: this.login.value,
                        password: this.password.value,
                        isAdmin: admin,
                        canAdd: true,
                        canEdit: true,
                        canDelete: true,
                    };
                    usersData.push(user);
                    let num = usersData.length - 1;
                    let userItem = `<li class="permissions__users-list-item-${num}"><div class="permissions__users-list-inner">
                                <p class="permissions__users-list-name permissions__name-${num}">${usersData[num].login}</p>
                                <button class="permissions__users-list-delete-btn" data-item="${num}">Delete</button>
                                <button class="permissions__users-list-change-btn" data-item="${num}">Change</button>
                            </div></li>`;
                    this.usersList.insertAdjacentHTML('beforeend', userItem);
                    localStorage.setItem('users', JSON.stringify(usersData));
                    this.permissionsForm.reset();
                } else if(this.login.value.length < 5) {
                    this.permissionsForm.children[1].textContent = 'Your account must be at least 5 characters';
                    this.permissionsForm.children[1].style.display = 'block';
                } else {
                    this.permissionsForm.children[1].style.display = 'none';
                }
            }
        });
    }
}