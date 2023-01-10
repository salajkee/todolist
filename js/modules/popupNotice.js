export default class PopupNotice {
    constructor(popup, checkbox) {
        this.popup = document.querySelector(popup);
        this.popupText = this.popup.children[0];
        this.formCheckbox = document.querySelector(checkbox);
    }

    render() {
        this.formCheckbox.addEventListener('change', () => {
            if(this.formCheckbox.checked) {
                this.popup.classList.add('active');
                this.popupText.textContent = 'Important';
                setTimeout(() => {
                    this.popup.classList.remove('active');
                }, 1000);
            } else {
                this.popup.classList.add('active');
                this.popupText.textContent = 'Usual';
                setTimeout(() => {
                    this.popup.classList.remove('active');
                }, 1000);
            }
        });
    }
}