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
        this.formBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if(this.formDate.value !== '' && this.formNote.value !== '') {
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
    
                this.date = this.formDate.value;
                while(this.date.includes('-')) {
                    this.date = this.date.replace('-', '.');
                }
    
                this.data = {
                    userId: 0,
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
            }
        });
    }
}