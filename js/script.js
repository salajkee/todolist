import Tabs from './modules/tabs.js';
import AddLocalStorage from './modules/addLocalStorage.js';
import AddNote from './modules/addNote.js';
import RemoveNote from './modules/removeNote.js';
import MarkNote from './modules/markNote.js';
import SaveNote from './modules/saveNote.js';
import DragDrop from './modules/dragDrop.js';
import SearchTask from './modules/searchNote.js';
import EditNote from './modules/editNote.js'
import SignIn from './modules/signIn.js'
import SignUp from './modules/signUp.js'
import UserSettings from './modules/userSettings.js'
import Permissions from './modules/permissions.js';
import ChangeSettings from './modules/changeSettings.js';
import LogOut from './modules/logOut.js';
import OtherScripts from './modules/otherScripts.js';

window.addEventListener('DOMContentLoaded', () => {
    try {
        let bb = document.querySelector('body');
        if(bb.classList.contains('main-page')) {
            location.href = 'auth.html';
        }
    } catch(e) {}

    try {
        let tabs = new Tabs('.tabs__nav-item', '.tabs__content', '.tabs__nav');
        tabs.render();
    } catch(e) {}

    try {
        let authTabs = new Tabs('.auth__tabs-nav-item', '.auth__tabs-content', '.auth__tabs-nav');
        authTabs.render();
    } catch(e) {}

    try {
        let addLocalStorage = new AddLocalStorage('.header__form');
        addLocalStorage.render();
    } catch(e){}

    try {
        let addNote = new AddNote('.header__form', '.task__items', '.category');
        addNote.render();
    } catch(e){}

    try {
        let removeNote = new RemoveNote('.task', '.category');
        removeNote.render();
    } catch(e){}
        
    try {
        let saveNote = new SaveNote('.task__items', '.category');
        saveNote.render();
    } catch(e){}

    try {
        let markNote = new MarkNote('.task', '.category');
        markNote.render();
    } catch(e){}

    try {
        let searchTask = new SearchTask('.task__search');
        searchTask.render();
    } catch(e){}

    try {
        let editNote = new EditNote('.task', '.category', '.modal-edit');
        editNote.render();
    } catch(e){}

    try {
        let dragDrop = new DragDrop('.category');
        dragDrop.render();
    } catch(e){}

    try {
        let signIn = new SignIn('.signin__form');
        signIn.render();
    } catch(e){}

    try {
        let signUp = new SignUp('.signup__form');
        signUp.render();
    } catch(e){}

    try {
        let userSettings = new UserSettings('.user__form-login',
                                            '.user__form-pw',
                                            '.user__form-pw-confirm',
                                            '.user__form-generate',
                                            '.user__form-showpw',
                                            '.user__form-bio',
                                            '.user__form-exitBtn',
                                            '.user__form-saveBtn');
        userSettings.render();
    } catch(e){}

    try {
        let permissions = new Permissions('.permissions__adduser-form',
                                          '.permissions__users-list',
                                          '.permissions__adduser-form-login',
                                          '.permissions__adduser-form-password',
                                          '.permissions__adduser-form-showpw',
                                          '.permissions__adduser-form-makeadmin',
                                          '.permissions__adduser-form-generate',
                                          '.permissions__adduser-form-btn');
        permissions.render();
    } catch(e){}

    try {
        let changeSettings = new ChangeSettings('.permissions__users-list-delete-btn',
                                                '.permissions__users-list-change-btn',
                                                '.permissions__users-list',
                                                '.permissions-modal',
                                                '.permissions-modal__login',
                                                '.permissions-modal__password',
                                                '.permissions-modal__showpw',
                                                '.permissions-modal__makeadmin',
                                                '.permissions-modal__generate',
                                                '.permissions-modal__exit-btn',
                                                '.permissions-modal__save-btn',
                                                '.permissions-modal__active-items',
                                                '.permissions-modal__available-items');
        changeSettings.render();
    } catch(e){}

    try {
        let logout = new LogOut('.logout-link');
        logout.render();
    } catch(e) {}

    try {
        let otherscripts = new OtherScripts();
        otherscripts.render();
    } catch(e) {}
});