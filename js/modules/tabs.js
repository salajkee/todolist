export default class Tabs {
    constructor(tabs, tabsContent, tabsWrapper) {
        this.tabs = document.querySelectorAll(tabs);
        this.tabsItem = tabs.slice(1);
        this.tabsContent = document.querySelectorAll(tabsContent);
        this.tabsWrapper = document.querySelector(tabsWrapper);
    }

    hideTabContent() {
        this.tabsContent.forEach(content => {
            content.classList.add('hide');
            content.classList.remove('show');
        });
    
        this.tabs.forEach(tab => {
            tab.classList.remove(`${this.tabsItem}-active`);
        });
    }
    
    showTabContent(i = 0) {
        this.tabsContent[i].classList.add('show');
        this.tabsContent[i].classList.remove('hide');
        this.tabs[i].classList.add(`${this.tabsItem}-active`);
    }

    tab() {
        this.tabsWrapper.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains(this.tabsItem)) {
                this.tabs.forEach((tab, i) => {
                    if(target === tab) {
                        this.hideTabContent();
                        this.showTabContent(i);
                    }
                });
            }
        });
    }
}