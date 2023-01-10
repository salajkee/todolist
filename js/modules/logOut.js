export default class LogOut {
    constructor(LogOut) {
        this.LogOut = document.querySelector(LogOut);
    }

    render() {
        this.LogOut.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            location.href = 'auth.html';
        });
    }
}