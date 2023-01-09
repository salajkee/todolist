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

    permissions() {
        let usersData = JSON.parse(localStorage.getItem('users'));
        if(usersData) {
            for (let i = 0; i < usersData.length; i++) {
                let user = `<li><div class="permissions__users-list-inner">
                            <p class="permissions__users-list-name">${usersData[i].login}</p>
                            <button class="permissions__users-list-delete-btn" data-item="${i}">Delete</button>
                            <button class="permissions__users-list-change-btn" data-item="${i}">Change</button>
                        </div></li>`;
                this.usersList.insertAdjacentHTML('beforeend', user);
            }
        }

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

        this.showPw.addEventListener('click', () => {
            if(this.showPw.checked) {
                this.password.setAttribute('type', 'text');
            } else {
                this.password.setAttribute('type', 'password');
            }
        });

        // this.addUserBtn.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     let admin;
        //     if(this.makeAdmin.checked) {
        //         admin = true;
        //     } else {
        //         admin = false;
        //     }
        //     let data = {
        //         id: num,
        //         login: this.login.value,
        //         password: this.password.value,
        //         isAdmin: admin,
        //         permissions: [
        //             {
        //                 canAdd: true,
        //                 canDelete: true,
        //                 canEdit: true
        //             }
        //         ]
        //     }
        //     users.push(data);
        //     let user = `<li><div class="permissions__users-list-inner">
        //                     <p class="permissions__users-list-name">${users[num].login}</p>
        //                     <button class="permissions__users-list-delete-btn" data-item="${num}">Delete</button>
        //                     <button class="permissions__users-list-change-btn" data-item="${num}">Change</button>
        //                 </div></li>`;
        //     this.usersList.insertAdjacentHTML('beforeend', user);
        //     this.permissionsForm.reset();
        //     console.log(users);
        // });
    }
}