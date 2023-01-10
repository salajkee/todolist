export default class ChangeSettings {
    constructor(deleteBtn, changeBtn, usersList, modal, login, password, showpw, makeAdmin, generate, exitBtn, saveBtn, activeItems, availableItems) {
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
        this.activeItems = document.querySelector(activeItems)
        this.availableItems = document.querySelector(availableItems)
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

        this.deleteBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                num = deleteBtn.getAttribute('data-item');
                let name = deleteBtn.previousElementSibling.textContent;
                let item = document.querySelector(`.permissions__users-list-item-${num}`);
                if(name === currentUser.login) {
                    for (let i = 0; i < usersData.length; i++) {
                        if(name === usersData[i].login) {
                            usersData.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(usersData));
                            break;
                        }
                    }
                    localStorage.removeItem('currentUser');
                    item.remove();
                    location.href = 'auth.html';
                } else {
                    for (let i = 0; i < usersData.length; i++) {
                        if(name === usersData[i].login) {
                            usersData.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(usersData));
                            break;
                        }
                    }
                    item.remove();
                }
            });
        });

        this.login.addEventListener('change', () => {
            if(this.login.classList.contains('error') && this.login.nextElementSibling.style.display == 'block') {
                this.login.classList.remove('error');
                this.login.nextElementSibling.style.display = 'none';
            }
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
            if(this.login.value !== usersData[num].login || this.makeAdmin) {
                if(this.login.value.length > 4) {
                    if(currentUser.login === usersData[num].login) {
                        currentUser.login = this.login.value;
                        currentUser.password = this.password.value;
                    }
                    usersData[num].login = this.login.value;
                    usersData[num].password = this.password.value;
                    localStorage.setItem('users', JSON.stringify(usersData));
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.usersList.children[num].children[0].children[0].textContent = this.login.value;
                    this.modal.classList.remove('active');
                    this.modalOverlay.classList.remove('active');
                    this.modalWrapper.classList.remove('active');
                    this.modalForm.reset();
                } else if(this.login.value.length < 5) {
                    this.login.classList.add('error');
                    this.login.nextElementSibling.style.display = 'block';
                } else {
                    this.login.classList.remove('error');
                    this.login.nextElementSibling.style.display = 'none';
                }
            }
        });

        // changesettings drag&drop

        let canItems = document.querySelectorAll('.permissions-modal__item');
        let dragItem = null;

        function dragStart() {
            dragItem = this;
        }

        function dragEnd() {
            dragItem = null;
        }

        canItems.forEach(canItem => {
            canItem.addEventListener('dragstart', dragStart);
            canItem.addEventListener('dragend', dragEnd);
        });

        function dragOver(e){
            e.preventDefault();
        }

        function dragDrop(){
            this.append(dragItem);
            canItems.forEach(canItem => {
                let canName = canItem.getAttribute('data-item');
                let name = document.querySelector(`.permissions__name-${num}`);
                let usersData = JSON.parse(localStorage.getItem('users'));
                if(canItem.parentNode.classList.contains('permissions-modal__available-items')) {
                    for (let i = 0; i < usersData.length; i++) {
                        if(name.textContent === usersData[i].login) {
                            canName === 'canEdit' ? usersData[i].canEdit = false : canName;
                            canName === 'canDelete' ? usersData[i].canDelete = false : canName;
                            canName === 'canAdd' ? usersData[i].canAdd = false : canName;
                            localStorage.setItem('users', JSON.stringify(usersData));
                        }
                    }
                } else {
                    for (let i = 0; i < usersData.length; i++) {
                        if(name.textContent === usersData[i].login) {
                            canName === 'canEdit' ? usersData[i].canEdit = true : canName;
                            canName === 'canDelete' ? usersData[i].canDelete = true : canName;
                            canName === 'canAdd' ? usersData[i].canAdd = true : canName;
                            localStorage.setItem('users', JSON.stringify(usersData));
                        }
                    }
                }
            });
        }

        this.activeItems.addEventListener('drop', dragDrop);
        this.activeItems.addEventListener('dragover', dragOver);
        this.availableItems.addEventListener('drop', dragDrop);
        this.availableItems.addEventListener('dragover', dragOver);
    }
}