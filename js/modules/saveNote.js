export default class SaveNote {
    constructor(taskItems, category) {
        this.taskItems = document.querySelector(taskItems);
        this.category = document.querySelector(category);
        this.categoryInProcess = this.category.children[0];
        this.categoryImportant = this.category.children[1];
        this.categoryDone = this.category.children[2];
    }

    showNotes(i) {
        let data = JSON.parse(localStorage.getItem('notes'));
        let primary, done;
        if(data[i].important === true) {
            primary = 'primary';
        } else {
            primary = '';
        }
        data[i].done === true ? done = 'done' : done = '';
        let task = `
            <li class="task__item item-${i}">
                <span class="task__item-status ${primary} ${done}"></span>
                <p data-item="${i}" class="task__item-name ${primary} ${done}">${data[i].noteName}</p>
                <span class="task__item-date ${done}">${data[i].noteDate}</span>
                <button data-item="${i}" class="task__item-delete">Delete</button>
                <button data-item="${i}" class="task__item-edit">Edit</button>
            </li>
        `;
        let categoryTask = `
            <div class="category__task-item item-${i}" data-item="${i}" draggable="true">
                <p class="category__task-item-title">${data[i].noteName}</p>
                <div class="category__task-item-bot">
                    <span class="category__task-item-date">${data[i].noteDate}</span>
                    <button data-item="${i}" class="category__task-item-delete">Delete</button>
                    <button data-item="${i}" class="category__task-item-edit">Edit</button>
                </div>
            </div>
        `;
        this.taskItems.insertAdjacentHTML('beforeend', task);
        if(data[i].important === false && data[i].done === false) {
            this.categoryInProcess.insertAdjacentHTML('beforeend', categoryTask);
        } else if(data[i].important === true && data[i].done === false) {
            this.categoryImportant.insertAdjacentHTML('beforeend', categoryTask);
        } else if(data[i].done === true && data[i].important === false) {
            this.categoryDone.insertAdjacentHTML('beforeend', categoryTask);
        } else if(data[i].done === true && data[i].important === true) {
            this.categoryDone.insertAdjacentHTML('beforeend', categoryTask);
        }
    }
    
    render() {
        if(localStorage.getItem('notes')) {
            let data = JSON.parse(localStorage.getItem('notes'));
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            for (let i = 0; i < data.length; i++) {
                if(currentUser.isAdmin) {
                    this.showNotes(i);
                } else {
                    if(currentUser.login === data[i].user) {
                        this.showNotes(i);
                    }
                }
            }
        }
    }
}