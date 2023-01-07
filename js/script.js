import Tabs from './modules/tabs.js';
import AddLocalStorage from './modules/addLocalStorage.js';
import AddNote from './modules/addNote.js';
import RemoveNote from './modules/removeNote.js';
import MarkNote from './modules/markNote.js';
import SaveNote from './modules/saveNote.js';
import PopupNotice from './modules/popupNotice.js';
import DragDrop from './modules/dragDrop.js';
import SearchTask from './modules/searchNote.js';
import EditNote from './modules/editNote.js'
import SignIn from './modules/signIn.js'
import UserSettings from './modules/userSettings.js'
import Permissions from './modules/permissions.js'

window.addEventListener('DOMContentLoaded', () => {
    try {
        let tabs = new Tabs('.tabs__nav-item', '.tabs__content', '.tabs__nav');
        tabs.tab();
    } catch(e) {}

    try {
        let addLocalStorage = new AddLocalStorage('.header__form');
        addLocalStorage.addKey();
    } catch(e){}

    try {
        let addNote = new AddNote('.header__form', '.task__items', '.category');
        addNote.addNote();
    } catch(e){}

    try {
        let removeNote = new RemoveNote('.task', '.category');
        removeNote.removeNote();
    } catch(e){}
        
    try {
        let saveNote = new SaveNote('.task__items', '.category');
        saveNote.saveNote();
    } catch(e){}

    try {
        let markNote = new MarkNote('.task', '.category');
        markNote.markNote();
    } catch(e){}

    try {
        let popupNotice = new PopupNotice('.popup-notice', '.header__form-checkbox');
        popupNotice.popupNotice();
    } catch(e){}

    try {
        let searchTask = new SearchTask('.task__search');
        searchTask.searchTask();
    } catch(e){}

    try {
        let editNote = new EditNote('.task', '.category', '.modal-edit');
        editNote.editNote();
    } catch(e){}

    try {
        let dragDrop = new DragDrop('.category');
        dragDrop.dragDropp();
    } catch(e){}

    try {
        let signIn = new SignIn('.auth__form');
        signIn.signIn();
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
        userSettings.userSettings();
    } catch(e){}

    try {
        let permissions = new Permissions('.permissions__adduser-form',
                                            '.permissions__users-list',
                                            '.permissions__adduser-form-login',
                                            '.permissions__adduser-form-password',
                                            '#permissions__adduser-form-showpw',
                                            '#permissions__adduser-form-makeadmin',
                                            '#permissions__adduser-form-generate',
                                            '.permissions__adduser-form-btn');
        permissions.permissions();
    } catch(e){}
});