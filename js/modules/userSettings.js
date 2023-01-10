export default class UserSettings {
    constructor(login, password, confirmPassword, generate, showPw, bio, exitBtn, saveBtn) {
        this.login = document.querySelector(login);
        this.password = document.querySelector(password);
        this.confirmPassword = document.querySelector(confirmPassword);
        this.generate = document.querySelector(generate);
        this.showPw = document.querySelector(showPw);
        this.bio = document.querySelector(bio);
        this.exitBtn = document.querySelector(exitBtn);
        this.saveBtn = document.querySelector(saveBtn);
    }

    render() {
        this.generate.addEventListener('click', () => {
            let symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let generatePassword = '';

            for (let i = 0; i < 8; i++) {
                let num = Math.floor(Math.random() * symbols.length);
                generatePassword += symbols[num];
            }

            if(this.generate.checked) {
                this.password.value = generatePassword;
                this.confirmPassword.value = generatePassword;
            } else {
                this.password.value = '';
                this.confirmPassword.value = '';
            }
        });

        this.showPw.addEventListener('click', () => {
            if(this.showPw.checked) {
                this.password.setAttribute('type', 'text');
                this.confirmPassword.setAttribute('type', 'text');
            } else {
                this.password.setAttribute('type', 'password');
                this.confirmPassword.setAttribute('type', 'password');
            }
        });

        this.saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let usersData = JSON.parse(localStorage.getItem('users'));
            if(this.login !== currentUser.login) {
                for (let i = 0; i < usersData.length; i++) {
                    if(currentUser.login === usersData[i].login) {
                        usersData[i].login = this.login.value;
                        usersData[i].password = this.password.value;
                        currentUser.login = this.login.value;
                        currentUser.password = this.password.value;
                        localStorage.setItem('users', JSON.stringify(usersData));
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                }
            }
        });

        this.exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.login = currentUser.login;
            this.password = currentUser.password;
            this.confirmPassword = currentUser.password;
            location.href="notes.html";
        });
    }
}