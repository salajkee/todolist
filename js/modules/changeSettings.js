export default class ChangeSettings {
    constructor(deleteBtn, changeBtn, usersList, modal, login, password, showpw, makeAdmin, generate, exitBtn, saveBtn) {
        this.deleteBtn = document.querySelectorAll(deleteBtn);
        this.changeBtn = document.querySelectorAll(changeBtn);
        this.usersList = document.querySelector(usersList);
        this.modal = document.querySelector(modal);
        this.modalOverlay = this.modal.children[0];
        this.modalWrapper = this.modal.children[1];
        this.modalForm = this.modalWrapper.children[1];
        this.login = document.querySelector(login);
        this.password = document.querySelector(password);
        this.showpw = document.querySelector(showpw);
        this.makeAdmin = document.querySelector(makeAdmin);
        this.generate = document.querySelector(generate);
        this.exitBtn = document.querySelector(exitBtn);
        this.saveBtn = document.querySelector(saveBtn);
    }

    render() {
        let usersData = JSON.parse(localStorage.getItem('users'));
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let num;
        this.changeBtn.forEach(changeBtn => {
            changeBtn.addEventListener('click', () => {
                num = changeBtn.getAttribute('data-item');
                this.modal.classList.add('active');
                this.modalOverlay.classList.add('active');
                this.modalWrapper.classList.add('active');
                this.login.value = usersData[num].login;
                this.password.value = usersData[num].password;
            });
        });

        this.showpw.addEventListener('click', () => {
            if(this.showpw.checked) {
                this.password.setAttribute('type', 'text');
            } else {
                this.password.setAttribute('type', 'password');
            }
        });

        this.makeAdmin.addEventListener('click', () => {
            if(this.makeAdmin.checked) {
                usersData[num].isAdmin = true;
            } else {
                usersData[num].isAdmin = false;
            }
        });

        this.generate.addEventListener('click', () => {
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
        });

        this.exitBtn.addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.modalOverlay.classList.remove('active');
            this.modalWrapper.classList.remove('active');
            this.login.value = usersData[num].login;
            this.password.value = usersData[num].password;
            this.modalForm.reset();
        });

        this.saveBtn.addEventListener('click', () => {
            if(this.login.value !== usersData[num].login) {
                for (let i = 0; i < usersData.length; i++) {
                    if(currentUser.login === usersData[i].login) {
                        usersData[i].login = this.login.value;
                        usersData[i].password = this.password.value;
                        currentUser.login = this.login.value;
                        currentUser.password = this.password.value;
                        localStorage.setItem('users', JSON.stringify(usersData));
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        this.usersList.children[num].children[0].children[0].textContent = this.login.value;
                        this.modal.classList.remove('active');
                        this.modalOverlay.classList.remove('active');
                        this.modalWrapper.classList.remove('active');
                        this.modalForm.reset();
                    }
                }
            }
        });
    }
}