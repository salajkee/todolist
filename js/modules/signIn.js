export default class SignIn {
    constructor(authForm) {
        this.authForm = document.querySelector(authForm);
    }

    signIn() {
        let users = [];
        let user = {
            login: admin,
            password: admin
        }
        // this.authForm.addEventListener('click', function(event) {
        //     event.preventDefault();
        //     let target = event.target;
        //     if(target.classList.contains('auth__form-btn')) {
        //         let users = JSON.parse(localStorage.getItem('users'));
        //         for (let i = 0; i < users.length; i++) {
        //             if(this.children[0].value === users[i].login && this.children[1].value === users[i].password) {
        //                 location.href('notes.html');
        //                 console.log('qwe');
        //             }
        //         }
        //     }
        // });
    }
}