export default class Tabs {
    constructor(tabs, tabsContent, tabsWrapper) {
        this.tabs = document.querySelectorAll(tabs);
        this.tabsContent = document.querySelectorAll(tabsContent);
        this.tabsWrapper = document.querySelector(tabsWrapper);
    }

    hideTabContent() {
        this.tabsContent.forEach(content => {
            content.classList.add('hide');
            content.classList.remove('show');
        });
    
        this.tabs.forEach(tab => {
            tab.classList.remove('tabs__nav-item-active');
        });
    }
    
    showTabContent(i = 0) {
        this.tabsContent[i].classList.add('show');
        this.tabsContent[i].classList.remove('hide');
        this.tabs[i].classList.add('tabs__nav-item-active');
    }

    tab() {
        this.tabsWrapper.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('tabs__nav-item')) {
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