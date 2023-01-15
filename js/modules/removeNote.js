export default class RemoveNote {
    constructor(task, category) {
        this.task = document.querySelector(task);
        this.category = document.querySelector(category);
    }

    render() {
        this.task.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('task__item-delete')) {
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if(currentUser.canDelete) {
                    let num = target.getAttribute('data-item');
                    let taskItem = document.querySelectorAll(`.item-${num}`);
                    this.data = JSON.parse(localStorage.getItem('notes'));
                    taskItem.forEach(item => {
                        for (let i = 0; i < this.data.length; i++) {
                            if(item.children[1].textContent === this.data[i].noteName) {
                                this.data.splice(i, 1);
                                localStorage.setItem('notes', JSON.stringify(this.data));
                                break;
                            }
                        }
                        item.remove();
                    });
                    this.count = JSON.parse(localStorage.getItem('count'));
                    --this.count;
                    localStorage.setItem('count', this.count);
                    if(this.count === -1) {
                        localStorage.removeItem('count');
                        localStorage.removeItem('notes');
                    }
                } else {
                    alert('You don’t have permission to modify');
                }
            }
        });
        this.category.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('category__task-item-delete')) {
                let num = target.getAttribute('data-item');
                let taskItem = document.querySelectorAll(`.item-${num}`);
                this.data = JSON.parse(localStorage.getItem('notes'));
                taskItem.forEach(item => {
                    for (let i = 0; i < this.data.length; i++) {
                        if(item.children[0].textContent === this.data[i].noteName) {
                            this.data.splice(i, 1);
                            localStorage.setItem('notes', JSON.stringify(this.data));
                            break;
                        }
                    }
                    item.remove();
                });
                this.count = JSON.parse(localStorage.getItem('count'));
                --this.count;
                localStorage.setItem('count', this.count);
                if(this.count === -1) {
                    localStorage.removeItem('count');
                    localStorage.removeItem('notes');
                }
            }
        });
    }
}