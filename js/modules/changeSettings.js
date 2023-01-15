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

    showPassword() {
        if(this.showpw.checked) {
            this.password.setAttribute('type', 'text');
        } else {
            this.password.setAttribute('type', 'password');
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

    removeDeleteChangeBtns() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.deleteBtn.forEach(deleteBtn => {
            let userName = deleteBtn.previousElementSibling.textContent;
            let changeBtn = deleteBtn.nextElementSibling;
            let parentNode = deleteBtn.parentNode;
            let yourLoginElem = document.createElement('div');
            yourLoginElem.classList.add('your-login');
            yourLoginElem.textContent = 'Your login';
            if(userName === currentUser.login) {
                deleteBtn.remove();
                changeBtn.remove();
                parentNode.insertAdjacentElement('beforeend', yourLoginElem);
            }
        });
    }

    render() {
        let users;
        let userName;
        let dataItem;
        let num;
        let canEdit = document.querySelector('.canEdit');
        let canDelete = document.querySelector('.canDelete');
        let canAdd = document.querySelector('.canAdd');

        this.removeDeleteChangeBtns();

        this.usersList.addEventListener('click', (e) => {
            let target = e.target;
            if(target.classList.contains('permissions__users-list-delete-btn')) {
                dataItem = target.getAttribute('data-item');
                let usersData = JSON.parse(localStorage.getItem('users'));
                let userName = target.previousElementSibling.textContent;
                let item = document.querySelector(`.permissions__users-list-item-${dataItem}`);
                for (let i = 0; i < usersData.length; i++) {
                    if(userName === usersData[i].login) {
                        usersData.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem('users', JSON.stringify(usersData));
                item.remove();
            }

            if(target.classList.contains('permissions__users-list-change-btn')) {
                dataItem = target.getAttribute('data-item');
                let usersData = JSON.parse(localStorage.getItem('users'));
                users = JSON.parse(localStorage.getItem('users'));
                this.activeItems.innerHTML = '';
                this.availableItems.innerHTML = '';
                userName = target.previousElementSibling.previousElementSibling.textContent;
                for (let i = 0; i < usersData.length; i++) {
                    if(usersData[i].login === userName) {
                        num = i;
                        this.modal.classList.add('active');
                        this.modalOverlay.classList.add('active');
                        this.modalWrapper.classList.add('active');
                        this.login.value = usersData[i].login;
                        this.password.value = usersData[i].password;
                        if(usersData[i].isAdmin) {
                            this.makeAdmin.setAttribute('checked', true);
                        } else {
                            this.makeAdmin.removeAttribute('checked');
                        }
                        if(usersData[i].canAdd) {
                            this.activeItems.insertAdjacentElement('beforeend', canAdd);
                        } else {
                            this.availableItems.insertAdjacentElement('beforeend', canAdd);
                        }
                        if(usersData[i].canDelete) {
                            this.activeItems.insertAdjacentElement('beforeend', canDelete);
                        } else {
                            this.availableItems.insertAdjacentElement('beforeend', canDelete);
                        }
                        if(usersData[i].canEdit) {
                            this.activeItems.insertAdjacentElement('beforeend', canEdit);
                        } else {
                            this.availableItems.insertAdjacentElement('beforeend', canEdit);
                        }
                    }
                }
            }
        });

        this.login.addEventListener('input', function() {
            let usersData = JSON.parse(localStorage.getItem('users'));
            for (let i = 0; i < usersData.length; i++) {
                if(this.value === userName) {
                    this.nextElementSibling.style.display = 'none';
                    this.classList.remove('error');
                } else if(this.value === usersData[i].login) {
                    this.classList.add('error');
                    this.nextElementSibling.textContent = 'That username is taken. Try another';
                    this.nextElementSibling.style.display = 'block';
                    break;
                } else {
                    this.nextElementSibling.style.display = 'none';
                    this.classList.remove('error');
                }
            }
        });

        this.showpw.addEventListener('click', () => {
            this.showPassword();
        });

        this.generate.addEventListener('click', () => {
            this.generatePassword();
        });

        this.exitBtn.addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.modalOverlay.classList.remove('active');
            this.modalWrapper.classList.remove('active');
            this.modalForm.reset();
        });

        // changesettings drag&drop

        let dragItem = null;

        function dragStart() {
            dragItem = this;
        }

        function dragEnd() {
            dragItem = null;
        }

        this.activeItems.addEventListener('mousemove', (e) => {
            let target = e.target;
            if(target.classList.contains('permissions-modal__item')) {
                target.addEventListener('dragstart', dragStart);
                target.addEventListener('dragend', dragEnd);
            }
        });

        this.availableItems.addEventListener('mousemove', (e) => {
            let target = e.target;
            if(target.classList.contains('permissions-modal__item')) {
                target.addEventListener('dragstart', dragStart);
                target.addEventListener('dragend', dragEnd);
            }
        });

        function dragOver(e){
            e.preventDefault();
        }

        function dragDrop(){
            this.append(dragItem);
            let canItems = document.querySelectorAll('.permissions-modal__item');
            canItems.forEach(canItem => {
                let canName = canItem.getAttribute('data-item');
                let name = document.querySelector(`.permissions__name-${dataItem}`);
                if(canItem.parentNode.classList.contains('permissions-modal__available-items')) {
                    for (let i = 0; i < users.length; i++) {
                        if(name.textContent === users[i].login) {
                            canName === 'canEdit' ? users[i].canEdit = false : canName;
                            canName === 'canDelete' ? users[i].canDelete = false : canName;
                            canName === 'canAdd' ? users[i].canAdd = false : canName;
                        } else if(name.textContent === users[i].login) {
                            canName === 'canEdit' ? users[i].canEdit = false: canName;
                            canName === 'canDelete' ? users[i].canDelete = false: canName;
                            canName === 'canAdd' ? users[i].canAdd = false: canName;
                        }
                    }
                } else {
                    for (let i = 0; i < users.length; i++) {
                        if(name.textContent === users[i].login) {
                            if(canName === 'canEdit') {
                                users[i].canEdit = true;
                            }
                            if(canName === 'canDelete') {
                                users[i].canDelete = true;
                            }
                            if(canName === 'canAdd') {
                                users[i].canAdd = true;
                            }
                        } else if(name.textContent === users[i].login) {
                            canName === 'canEdit' ? users[i].canEdit = true: canName;
                            canName === 'canDelete' ? users[i].canDelete = true: canName;
                            canName === 'canAdd' ? users[i].canAdd = true: canName;
                        }
                    }
                }
            });
        }

        this.activeItems.addEventListener('drop', dragDrop);
        this.activeItems.addEventListener('dragover', dragOver);
        this.availableItems.addEventListener('drop', dragDrop);
        this.availableItems.addEventListener('dragover', dragOver);

        this.saveBtn.addEventListener('click', () => {
            if(!this.login.classList.contains('error')) {
                if(this.login.value !== userName || this.makeAdmin) {
                    if(this.login.value.length > 4) {
                        if(this.makeAdmin.checked) {
                            users[num].isAdmin = true;
                            this.makeAdmin.setAttribute('checked', true);
                        } else {
                            users[num].isAdmin = false;
                            this.makeAdmin.removeAttribute('checked', false);
                        }
                        users[num].login = this.login.value;
                        users[num].password = this.password.value;
                        localStorage.setItem('users', JSON.stringify(users));
                        this.usersList.children[num].children[0].children[0].textContent = this.login.value;
                        this.modal.classList.remove('active');
                        this.modalOverlay.classList.remove('active');
                        this.modalWrapper.classList.remove('active');
                        this.password.setAttribute('type', 'password');
                        this.modalForm.reset();
                    } else if(this.login.value.length < 5) {
                        this.login.classList.add('error');
                        this.login.nextElementSibling.textContent = 'Your account must be at least 5 characters';
                        this.login.nextElementSibling.style.display = 'block';
                    } else {
                        this.login.classList.remove('error');
                        this.login.nextElementSibling.style.display = 'none';
                    }
                }
            }
        });
    }
}