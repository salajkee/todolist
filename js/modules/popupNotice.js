export default class PopupNotice {
    constructor(popup) {
        this.popup = document.querySelector(popup);
        this.popupText = this.popup.children[0];
    }

    popupNotice(text) {
        this.popup.classList.add('active');
        this.popupText.textContent = text;
        setTimeout(() => {
            this.popup.classList.remove('active');
        }, 1000);
    }
}