export default class EditNote {
    constructor(task, category, modal) {
        this.body = document.body;
        this.task = document.querySelector(task);
        this.category = document.querySelector(category);
        this.modal = document.querySelector(modal);
        this.modalEditForm = document.querySelector('.modal-edit__form');
        this.num = null;
    }

    render() {
        this.task.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('task__item-edit')) {
                this.modal.classList.add('active');
                this.num = target.getAttribute('data-item');
                let inputEdit = document.querySelector('.modal-edit__input');
                let targetParent = target.parentNode;
                let noteValue = targetParent.children[1].textContent;
                inputEdit.value = noteValue;
            }
        });
        this.category.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('category__task-item-edit')) {
                this.modal.classList.add('active');
                this.num = target.getAttribute('data-item');
                let inputEdit = document.querySelector('.modal-edit__input');
                let targetParent = target.parentNode.parentNode;
                let noteValue = targetParent.children[0].textContent;
                inputEdit.value = noteValue;
            }
        });
        this.modal.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('modal-edit__close-btn')) {
                event.preventDefault();
                this.modalEditForm.reset();
                this.modal.classList.remove('active');
                this.num = null;
            }
            if(target.classList.contains('modal-edit__save-btn')) {
                event.preventDefault();
                let inputEdit = document.querySelector('.modal-edit__input').value;
                let dateEdit = document.querySelector('.modal-edit__date').value;
                let data = JSON.parse(localStorage.getItem('notes'));
                let taskName = document.querySelectorAll('.task__item-name');
                let taskDate = document.querySelectorAll('.task__item-date');
                let categoryTaskItem = this.category.querySelector(`.item-${this.num}`);
                let categoryTaskName = categoryTaskItem.querySelector('.category__task-item-title');
                let categoryTaskDate = categoryTaskItem.querySelector('.category__task-item-date');
                if(inputEdit !== '') {
                    taskName[this.num].textContent = inputEdit;
                    categoryTaskName.textContent = inputEdit;
                    data[this.num].noteName = inputEdit;
                }
                if(dateEdit !== '') {
                    while(dateEdit.includes('-')) {
                        dateEdit = dateEdit.replace('-', '.');
                    }
                    taskDate[this.num].textContent = dateEdit;
                    categoryTaskDate.textContent = dateEdit;
                    data[this.num].noteDate = dateEdit;
                }
                localStorage.setItem('notes', JSON.stringify(data));
                this.modalEditForm.reset();
                this.modal.classList.remove('active');
                this.num = null;
            }
        });
    }
}