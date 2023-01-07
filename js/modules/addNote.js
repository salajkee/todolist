export default class AddNote {
    constructor(form, taskItems, category) {
        this.form = document.querySelector(form);
        this.taskItems = document.querySelector(taskItems);
        this.category = document.querySelector(category);
        this.categoryNodes = this.category.children;
        this.formDate = this.form.children[0];
        this.formNote = this.form.children[1];
        this.formCheckbox = this.form.children[2];
        this.formBtn = this.form.children[3];
        this.categoryInProcess = this.categoryNodes[0];
        this.categoryImportant = this.categoryNodes[1];
        this.categoryDone = this.categoryNodes[2];
    }

    addNote() {
        this.formBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if(this.formDate.value !== '' && this.formNote.value !== '') {
                let oldData = JSON.parse(localStorage.getItem('notes'));
                let count = Number(localStorage.getItem('count'));
                let primary;
                if(oldData[count].important === true) {
                    primary = 'primary';
                } else {
                    primary = '';
                }
                let task = `
                    <li class="task__item item-${count}">
                        <span class="task__item-status ${primary}"></span>
                        <p data-item="${count}" class="task__item-name">${oldData[count].noteName}</p>
                        <span class="task__item-date">${oldData[count].noteDate}</span>
                        <button data-item="${count}" class="task__item-delete">Delete</button>
                        <button data-item="${count}" class="task__item-edit">Edit</button>
                    </li>
                `;
                let categoryTask = `
                    <div class="category__task-item item-${count}" data-item="${count}" draggable="true">
                        <p class="category__task-item-title">${oldData[count].noteName}</p>
                        <div class="category__task-item-bot">
                            <span class="category__task-item-date">${oldData[count].noteDate}</span>
                            <button data-item="${count}" class="category__task-item-delete">Delete</button>
                            <button data-item="${count}" class="category__task-item-edit">Edit</button>
                        </div>
                    </div>
                `;
                this.taskItems.insertAdjacentHTML('beforeend', task);
                if(oldData[count].important === false) {
                    this.categoryInProcess.insertAdjacentHTML('beforeend', categoryTask);
                } else {
                    this.categoryImportant.insertAdjacentHTML('beforeend', categoryTask);
                }
                this.form.reset();
            } else {
                alert('Заполните все поля');
            }
        });
    }
}