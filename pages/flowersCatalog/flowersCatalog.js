window.onload = () => {
    const filterItems = document.querySelectorAll('.filterItem');
    const filterModalOutside = document.querySelector('.filterMenu__modalOutside')

    const updateFilterCount = (container) => {
        const count = container.querySelectorAll('input:checked').length;
        if (count > 0) {
            container.querySelector('.selectedFiltersCount').innerHTML = count;
            container.querySelector('.selectedFiltersCount').style.display = 'initial'   
        } else {
            container.querySelector('.selectedFiltersCount').style.display = 'none'   
        }
    }

    const filterToggleDesktop = (e) => {
        const filterModal = e.currentTarget.children[e.currentTarget.children.length - 1];
        const activeModal = document.querySelector('.filterModal-active');

        updateFilterCount(e.currentTarget);

        if (!(e.target.parentNode.classList.contains('filterItem-menuBlock') || e.target.classList.contains('filterItem-menuBlock'))) {
            return;
        }

        if (activeModal == filterModal) {
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
            e.currentTarget.classList.remove('filterItem-active')
            return;
        } else if (activeModal) {
            document.querySelector('.filterItem-active').classList.remove('filterItem-active')
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
        }
        
        e.currentTarget.classList.add('filterItem-active')
        filterModalOutside.classList.add('filterMenu__modalOutside-activeModal');
        filterModal.classList.add('filterModal-active');
    }
    
    const closeActiveFilterModal = (e) => {
        console.log(e.target);
        if (e.target == filterModalOutside) {
            const activeModal = document.querySelector('.filterModal-active');
            document.querySelector('.filterItem-active').classList.remove('filterItem-active')
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
        }
    }
    
    filterModalOutside.addEventListener('click', closeActiveFilterModal)
    filterItems.forEach((item) => item.addEventListener('click', filterToggleDesktop))


    if (window.screen.width < 1280) {
        const mobileFilterBtn = document.querySelector('#mobileFilterBtn');
        const submitFiltersBtn = document.querySelector('#submitFiltersBtn');
        const filterTitles = document.querySelectorAll('.sideMenu__filterItem-title');


        const toggleFilters = (e) => {
            e.currentTarget.parentNode.querySelector('.sideMenu__filterList').classList.toggle('sideMenu__filterList-open')
        }

        filterTitles.forEach((item) => item.addEventListener('click', toggleFilters))

        mobileFilterBtn.addEventListener('click', () => {
            document.querySelector('.sideMenuWrapper').style.display = 'initial';
        })

        submitFiltersBtn.addEventListener('click', () => {
            document.querySelector('.sideMenuWrapper').style.display = 'none';
        })
    }
}