export default class SearchTask {
    constructor(seachInput) {
        this.seachInput = document.querySelector(seachInput);
    }

    render() {
        this.seachInput.addEventListener('input', function() {
            let value = this.value.trim().toLowerCase();
            this.taskItems = document.querySelectorAll('.task__item');
            this.taskItemName = document.querySelectorAll('.task__item-name');
            if(value != '') {
                this.taskItemName.forEach((itemName, i) => {
                    if(itemName.textContent.search(value) == -1) {
                        this.taskItems[i].style.display = 'none';
                    } else {
                        this.taskItems[i].style.display = 'flex';
                    }
                });
            } else {
                this.taskItemName.forEach((itemName, i) => {
                    this.taskItems[i].style.display = 'flex';
                });
            }
        })
    }
}