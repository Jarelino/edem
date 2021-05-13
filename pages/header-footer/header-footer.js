window.onload = () => {
    const burger = document.querySelector('#burger');
    const search = document.querySelector('#search');
    const menuWrapper = document.querySelector('.modalWrapper-menu')
    const menu = document.querySelector('.menu');
    const bottomMenuWrapper = document.querySelector('.bottomMenuWrapper');
    const modalWrap = document.querySelector('.modal');

    const requisites = document.querySelector('#requisites')

    const clearMenu = () => {
        const activeList = document.querySelector('.menu__list-active')
        if (activeList) {
            document.querySelector('.menu__list-active').classList.remove('menu__list-active');
        }
    }


    const closeMenu = () => {
        burger.classList.replace('icon-cross', 'icon-burger')
        menu.classList.remove('menu-active');
        menuWrapper.style.display = 'none'
        clearMenu();
    }
    
    const openMenu = () => {
        burger.classList.replace('icon-burger', 'icon-cross')
        menu.classList.add('menu-active');
        menuWrapper.style.display = 'block';
    }

    const burgerClickHandler = () => {
        menu.classList.contains('menu-active') ? closeMenu() : openMenu();
    }

    const menuItemClickHandler = (e) => {
        if(e.target.classList.contains('menu-title') || e.target.tagName == 'IMG') {
            if (e.currentTarget.classList.contains('menu__list-active')) {
                e.currentTarget.classList.remove('menu__list-active');
            } else {
                clearMenu();
                e.currentTarget.classList.add('menu__list-active');
            }
        }
    }

    const searchClickHandler = () => {
        const menuList = document.querySelector('.navMenu__list');
        const navContainer = document.querySelector('.navMenu');
        menuList.style.display = 'none';
        navContainer.classList.add('navMenu-activeInput');
    }

    openBottomTab = (tabClass) => () => {
        const activeTab = document.querySelector('.bottomMenu-activeTab')
        const targetItem = document.querySelector(`.${tabClass}`);
        if (targetItem.classList.contains('bottomMenu-activeTab')) {
            targetItem.classList.remove('bottomMenu-activeTab');
            bottomMenuWrapper.classList.remove('bottomMenuWrapper-active')
        } else if(activeTab) {
            activeTab.classList.remove('bottomMenu-activeTab');
            targetItem.classList.add('bottomMenu-activeTab');
        } else {
            targetItem.classList.add('bottomMenu-activeTab');
            bottomMenuWrapper.classList.add('bottomMenuWrapper-active')
        }
    }

    openModal = (modalClass) => () => {
        const activeTab = document.querySelector('.modal-active')
        const targetItem = document.querySelector(`.${modalClass}`);
        if (targetItem.classList.contains('modal-active')) {
            targetItem.classList.remove('modal-active');
            modalWrap.classList.remove('modalWrap-active')
        } else if(activeTab) {
            activeTab.classList.remove('modal-active');
            targetItem.classList.add('modal-active');
        } else {
            targetItem.classList.add('modal-active');
            modalWrap.classList.add('modalWrap-active')
        }
    }

    if (window.screen.width < 768) {
        const menuItems = document.querySelectorAll('.menu__list');
        
        menuItems.forEach((item) => item.addEventListener('click', menuItemClickHandler));
    }
    
    
    if (window.screen.width < 1280) {
        const menuInput = document.querySelector('.menu__searchBlock-input');
        const bottomCatalog = document.querySelector('#bottomCatalog');
        const bottomPlace = document.querySelector('#bottomPlace')
        const requisitesMobile = document.querySelector('#requisitesMobile');

        requisitesMobile.addEventListener('click', openBottomTab('bottomMenu__requisites'))
        bottomCatalog.addEventListener('click', openBottomTab('bottomMenu__catalog'))
        bottomPlace.addEventListener('click', openBottomTab('bottomMenu__place'))
        bottomMenuWrapper.addEventListener('click', (e) => {
            if (e.target == bottomMenuWrapper) {
                document.querySelector('.bottomMenu-activeTab').classList.remove('bottomMenu-activeTab');
                bottomMenuWrapper.classList.remove("bottomMenuWrapper-active")
            }
        })
        menuInput.addEventListener('focus', () => {
            document.querySelector('.menu__searchBlock-loop').style.display = 'none';
        })
        menuInput.addEventListener('focusout', () => {
            if(menuInput.value.length === 0) document.querySelector('.menu__searchBlock-loop').style.display = 'block';
        })
    }


    modalWrap.addEventListener('click', (e) => {
        if (e.target == modalWrap) {
            modalWrap.classList.remove('modalWrap-active')
            document.querySelector('.modal-active').classList.remove('modal-active')
        }
    })

    requisites.addEventListener('click', openModal('modal-requisites'))
    menuWrapper.addEventListener('click', (e) => e.target == menuWrapper && closeMenu());
    search.addEventListener('click', searchClickHandler)
    burger.addEventListener('click', burgerClickHandler)
}