export default class MarkNote {
    constructor(task, category) {
        this.task = document.querySelector(task);
        this.category = document.querySelector(category);
        this.categoryInProcess = this.category.children[0];
        this.categoryImportant = this.category.children[1];
        this.categoryDone = this.category.children[2];
    }

    render() {
        this.task.addEventListener('click', (event) => {
            let target = event.target;
            let targetPrev = target.previousElementSibling;
            let targetNext = target.nextElementSibling;
            if(target.classList.contains('task__item-name')) {
                target.classList.toggle('done');
                targetPrev.classList.toggle('done');
                targetNext.classList.toggle('done');
                let num = target.getAttribute('data-item');
                let categoryItem = this.category.querySelector(`.item-${num}`);
                let data = JSON.parse(localStorage.getItem('notes'));
                if(targetPrev.classList.contains('done')) {
                    data[num].done = true;
                }
                if(targetPrev.classList.contains('primary')) {
                    data[num].important = true;
                }
                if(!targetPrev.classList.contains('primary')) {
                    data[num].important = false;
                }
                if(!targetPrev.classList.contains('done')) {
                    data[num].done = false;
                }
                localStorage.setItem('notes', JSON.stringify(data));
                if(target.classList.contains('done')) {
                    this.categoryDone.insertAdjacentElement('beforeend', categoryItem);
                } else {
                    if(targetPrev.classList.contains('primary')) {
                        this.categoryImportant.insertAdjacentElement('beforeend', categoryItem);
                    } else {
                        this.categoryInProcess.insertAdjacentElement('beforeend', categoryItem);
                    }
                }
            }
        })
    }
}