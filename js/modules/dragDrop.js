export default class dragDrop {
    constructor(category) {
        this.category = document.querySelector(category);
        this.categoryNodes = this.category.children;
        this.categoryInProcess = this.categoryNodes[0];
        this.categoryImportant = this.categoryNodes[1];
        this.categoryDone = this.categoryNodes[2];
    }

    render() {
        function dragOver(e){
            e.preventDefault();
        }

        function dragDrop(){
            let categoryTaskItem = document.querySelector('.category__task-item');
            this.append(categoryTaskItem);
            console.log(categoryTaskItem.parentNode);
            if(categoryTaskItem.parentNode.classList.contains('category__important')) {
                let data = JSON.parse(localStorage.getItem('notes'));
                let num = categoryTaskItem.getAttribute('data-item');
                data[num].important = true;
                localStorage.setItem('notes', JSON.stringify(data));
            }
        }

        this.categoryInProcess.addEventListener('drop', dragDrop);
        this.categoryInProcess.addEventListener('dragover', dragOver);
        this.categoryImportant.addEventListener('drop', dragDrop);
        this.categoryImportant.addEventListener('dragover', dragOver);
        this.categoryDone.addEventListener('drop', dragDrop);
        this.categoryDone.addEventListener('dragover', dragOver);
    }
}