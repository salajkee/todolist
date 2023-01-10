export default class RemoveNote {
    constructor(task, category) {
        this.task = document.querySelector(task);
        this.category = document.querySelector(category);
    }

    render() {
        this.task.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('task__item-delete')) {
                let num = target.getAttribute('data-item');
                let taskItem = document.querySelectorAll(`.item-${num}`);
                taskItem.forEach(item => {
                    item.remove();
                });
                this.data = JSON.parse(localStorage.getItem('notes'));
                this.data.splice(num, 1);
                localStorage.setItem('notes', JSON.stringify(this.data));
                this.count = JSON.parse(localStorage.getItem('count'));
                --this.count;
                localStorage.setItem('count', this.count);
                if(this.count === -1) {
                    localStorage.removeItem('count');
                    localStorage.removeItem('notes');
                }
            }
        });
        this.category.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('category__task-item-delete')) {
                let num = target.getAttribute('data-item');
                let taskItem = document.querySelectorAll(`.item-${num}`);
                taskItem.forEach(item => {
                    item.remove();
                });
                this.data = JSON.parse(localStorage.getItem('notes'));
                this.data.splice(num, 1);
                localStorage.setItem('notes', JSON.stringify(this.data));
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