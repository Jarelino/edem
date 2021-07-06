const tabs = document.querySelectorAll('.filterItem');


const tabClick = (e) => {
    if (!e.currentTarget.classList.contains('filter-active') && !e.currentTarget.classList.contains('filter-disabled')) {
        console.log(e.currentTarget.id);
        document.querySelector('.catalog__container-active').classList.remove('catalog__container-active');
        document.querySelector('.filter-active').classList.remove('filter-active');
        e.currentTarget.classList.add('filter-active');
        document.querySelector(`.${e.currentTarget.id}`).classList.add('catalog__container-active');
        console.log(document.querySelector(`.${e.currentTarget.id}`));
    }
}


tabs.forEach((tab) => tab.addEventListener('click', tabClick))