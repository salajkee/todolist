import PopupNotice from './popupNotice.js';

export default class AddLocalStorage {
    constructor(form) {
        this.form = document.querySelector(form);
        this.formDate = this.form.children[0];
        this.formNote = this.form.children[1];
        this.formCheckbox = this.form.children[2];
        this.formBtn = this.form.children[3];
        this.important = null;
        this.date;
        this.notes = [];
        this.count;
    }

    render() {
        let popupNotice = new PopupNotice('.popup-notice');
        this.formCheckbox.addEventListener('click', () => {
            if(this.formCheckbox.checked) {
                popupNotice.popupNotice('Important');
            } else {
                popupNotice.popupNotice('Usual');
            }
        });

        this.formBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(currentUser.canAdd) {
                if(this.formNote.value !== '') {
                    if(localStorage.getItem('notes') === null) {
                        localStorage.setItem('notes', JSON.stringify(this.notes));
                    }
        
                    if(localStorage.getItem('count') === null) {
                        this.count = 0;
                    } else {
                        this.count = localStorage.getItem('count');
                    }
    
                    if(this.formCheckbox.checked) {
                        this.important = true;
                    } else {
                        this.important = false;
                    }
    
                    if(this.formDate.value === '') {
                        let date = new Date();
    
                        function addZero(num) {
                            if(0 < num && num < 10) {
                                return `0${num}`;
                            } else {
                                return num;
                            }
                        }
    
                        this.date = `${addZero(date.getFullYear())}.${addZero(date.getMonth() + 1)}.${addZero(date.getDate())}`;
                    } else {
                        this.date = this.formDate.value;
                        while(this.date.includes('-')) {
                            this.date = this.date.replace('-', '.');
                        }
                    }
    
                    this.data = {
                        user: currentUser.login,
                        important: this.important,
                        done: false,
                        noteName: this.formNote.value,
                        noteDate: this.date,
                    }
        
                    this.oldData = JSON.parse(localStorage.getItem('notes'));
                    this.oldData.push(this.data);
                    localStorage.setItem('notes', JSON.stringify(this.oldData));
                    this.count = localStorage.getItem('count');
                    this.oldData.length === 1 ? this.count = 0 : this.count++;
                    localStorage.setItem('count', this.count);
                    
                    popupNotice.popupNotice('Note added');
                }
            } else {
                alert('You don’t have permission to modify');
            }
        });
    }
}