import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { runSideBarScroll, activateMenuOnScroll, runNavigationScrolling, runProgressBar } from './animations';

const asideSecondaryMenu = document.querySelector('.aside-content-secondary');
const asideMainContent = document.querySelector('.aside-content');
const asideLogoText = document.querySelector('.logo-title');
const asidebar = document.querySelector('.sidebar');
const articleDescription = document.querySelector('.article-description');
const menuCloseBtn = document.querySelector('.menu-btn-close');
const menuOpenBtn = document.querySelector('.menu-btn-op');

const mainContent = document.querySelector('.content');
const links = document.querySelectorAll('.aside-page-menu a');
const menuItems = document.querySelectorAll('.page-menu-item');
const sections = Array.from(menuItems).map(item => document.querySelector(item.getAttribute('data-target')));

const runMenuNavigation = () => {
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const offset = 300;
      if (targetElement) {
        runNavigationScrolling(targetElement, offset);
      }
    });
  });

  const setActiveMenuItem = (index) => {
    menuItems.forEach(item => item.classList.remove('active'));
    menuItems[index].classList.add('active');
  }

  const removeActiveMenuItem = (index) => {
    menuItems[index].classList.remove('active');
  }

  sections.forEach((section, index) => {
    activateMenuOnScroll(section, index, setActiveMenuItem, removeActiveMenuItem);
  });
};

const runSlider = (e) => {
  new Splide('.splide', {
    type: 'loop',
    perPage: 2,
    perMove: 1,
    gap: '20px',
    pagination: false,
    breakpoints: {
      430: {
        perPage: 1,
      },
    },
  }).mount();
}

const renderInitial = () => {
  runMenuNavigation();
  runSlider();
  runProgressBar();
  runSideBarScroll();
};

const renderInitialXLMenu = () => {
  asidebar.style.display = 'block';
  asidebar.style.position = 'relative';
  if (asideSecondaryMenu.classList.contains('disabled')) {
    menuCloseBtn.style.display = 'block';
    menuOpenBtn.style.display = 'none';
  } else {
    menuCloseBtn.style.display = 'none';
    menuOpenBtn.style.display = 'block';
  }
};

const renderInitialMDMenu = () => {
  asidebar.style.display = 'none';
  menuCloseBtn.style.display = 'none';
  menuOpenBtn.style.display = 'block';
  asidebar.style.position = 'fixed';
};

const renderInitialXSMenu = () => {
  asidebar.style.display = 'none';
  menuCloseBtn.style.display = 'none';
  menuOpenBtn.style.display = 'block';
};

const renderCloseMenu = () => {
  if (window.innerWidth < 769) {
    asidebar.style.display = 'none';
    menuCloseBtn.style.display = 'none';
    articleDescription.classList.remove('disabled');
    menuOpenBtn.style.display = 'block';
  }

  menuCloseBtn.style.display = 'none';
  asideSecondaryMenu.classList.remove('disabled');
  asideMainContent.classList.add('disabled');
  asideLogoText.classList.add('disabled');
  asidebar.classList.add('min-width');
  mainContent.classList.add('max-width');
  menuOpenBtn.style.display = 'block';
  new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    perMove: 3,
    gap: '20px',
    pagination: false,
  }).mount();
}

const renderOpenMenu = () => {
  if (window.innerWidth < 769) {
    asidebar.style.display = 'block';
    menuCloseBtn.style.display = 'block';
    articleDescription.classList.add('disabled');
    menuOpenBtn.style.display = 'none';
    console.log('open');
  }

  if (window.innerWidth < 431) {
    asidebar.style.display = 'block';
    menuCloseBtn.style.display = 'block';
    menuOpenBtn.style.display = 'none';
  }

  asideSecondaryMenu.classList.add('disabled');
  asideMainContent.classList.remove('disabled');
  asideLogoText.classList.remove('disabled');
  asidebar.classList.remove('min-width');
  mainContent.classList.remove('max-width');
  menuCloseBtn.style.display = 'block';
  menuOpenBtn.style.display = 'none';
  new Splide('.splide', {
    type: 'loop',
    perPage: 2,
    perMove: 1,
    gap: '20px',
    pagination: false,
  }).mount();
};

export {
  renderOpenMenu,
  renderCloseMenu,
  renderInitial,
  renderInitialXLMenu,
  renderInitialMDMenu,
  renderInitialXSMenu
};