export default class dragDrop {
    constructor(category, taskItems) {
        this.category = document.querySelector(category);
        this.categoryInProcess = this.category.children[0];
        this.categoryImportant = this.category.children[1];
        this.categoryDone = this.category.children[2];
    }

    render() {
        let categoryTaskItems = document.querySelectorAll('.category__task-item');
        let dragItem = null;

        function dragStart() {
            dragItem = this;
        }

        function dragEnd() {
            dragItem = null;
        }

        categoryTaskItems.forEach(categoryTaskItem => {
            categoryTaskItem.addEventListener('dragstart', dragStart);
            categoryTaskItem.addEventListener('dragend', dragEnd);
        });

        function dragOver(e){
            e.preventDefault();
        }

        function dragDrop(){
            this.append(dragItem);
            categoryTaskItems.forEach(categoryTaskItem => {
                if(categoryTaskItem.parentNode.classList.contains('category__important')) {
                    let data = JSON.parse(localStorage.getItem('notes'));
                    let num = categoryTaskItem.getAttribute('data-item');
                    data[num].important = true;
                    data[num].done = false;
                    localStorage.setItem('notes', JSON.stringify(data));
                    let taskItem = document.querySelector(`.item-${num}`);
                    taskItem.children[0].classList.add('primary');
                    taskItem.children[0].classList.remove('done');
                    taskItem.children[1].classList.remove('done');
                    taskItem.children[2].classList.remove('done');
                } else if(categoryTaskItem.parentNode.classList.contains('category__done')) {
                    let data = JSON.parse(localStorage.getItem('notes'));
                    let num = categoryTaskItem.getAttribute('data-item');
                    data[num].done = true;
                    localStorage.setItem('notes', JSON.stringify(data));
                    let taskItem = document.querySelector(`.item-${num}`);
                    taskItem.children[0].classList.add('done');
                    taskItem.children[1].classList.add('done');
                    taskItem.children[2].classList.add('done');
                } else {
                    let data = JSON.parse(localStorage.getItem('notes'));
                    let num = categoryTaskItem.getAttribute('data-item');
                    data[num].important = false;
                    data[num].done = false;
                    let taskItem = document.querySelector(`.item-${num}`);
                    taskItem.children[0].classList.remove('primary', 'done');
                    taskItem.children[1].classList.remove('done');
                    taskItem.children[2].classList.remove('done');
                    localStorage.setItem('notes', JSON.stringify(data));
                }
            });
        }

        this.categoryInProcess.addEventListener('drop', dragDrop);
        this.categoryInProcess.addEventListener('dragover', dragOver);
        this.categoryImportant.addEventListener('drop', dragDrop);
        this.categoryImportant.addEventListener('dragover', dragOver);
        this.categoryDone.addEventListener('drop', dragDrop);
        this.categoryDone.addEventListener('dragover', dragOver);
    }
}