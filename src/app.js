import { 
  renderOpenMenu, 
  renderCloseMenu, 
  renderInitial, 
  renderInitialXLMenu, 
  renderInitialMDMenu, 
  renderInitialXSMenu  
} from './view';
import onChange from 'on-change';

const runApp = () => {
  const menuCloseBtn = document.querySelector('.menu-btn-close');
  const menuOpenBtn = document.querySelector('.menu-btn-op');
  const asidebar = document.querySelector('.sidebar');
  const articleDescription = document.querySelector('.article-description');

  const appState = {
    uiState: {
      menu: {
        isOpened: true,
        size: 'XL',
      },
    }
  };
  
  const setInitialMenuState = () => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth > 769) {
      appState.uiState.menu.size = 'XL';
      appState.uiState.menu.isOpened = true;
    } else if (currentWindowWidth > 431) {
      appState.uiState.menu.size = 'MD';
      appState.uiState.menu.isOpened = false;
    } else {
      appState.uiState.menu.size = 'XS';
      appState.uiState.menu.isOpened = false;
    }
  };

  setInitialMenuState();

  const watchedState = onChange(appState, (path, value) => {
    if (path === 'uiState.menu.isOpened') {
      if (value) {
        renderOpenMenu();
      } else {
        renderCloseMenu();
      }
    } else if (path === 'uiState.menu.size') {
      switch (value) {
        case 'XL':
          renderInitialXLMenu();
          break;
        case 'MD':
          renderInitialMDMenu();
          break;
        case 'XS':
          renderInitialXSMenu();
          break;
        default:
          break;
      }
    }
  });

  menuCloseBtn.addEventListener('click', () => {
    watchedState.uiState.menu.isOpened = false;
  });

  menuOpenBtn.addEventListener('click', () => {
    watchedState.uiState.menu.isOpened = true;
  });

  window.addEventListener('resize', () => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth > 769) {
      if (watchedState.uiState.menu.size !== 'XL') {
        watchedState.uiState.menu.isOpened = true;
        watchedState.uiState.menu.size = 'XL';
      }
    } else if (currentWindowWidth < 768 && currentWindowWidth > 431) {
      if (watchedState.uiState.menu.size !== 'MD') {
        watchedState.uiState.menu.isOpened = false;
        watchedState.uiState.menu.size = 'MD';
      }
    } else {
      if (watchedState.uiState.menu.size !== 'XS') {
        watchedState.uiState.menu.isOpened = false;
        watchedState.uiState.menu.size = 'XS';
      }
    }
  });

  let lastScrollTop = -50;
  window.addEventListener('scroll', function() {
    if (watchedState.uiState.menu.size === 'XL') {
      return;
    }
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      asidebar.style.display = 'none';
      articleDescription.style.display = 'block';
    } else {
      if (!watchedState.uiState.menu.isOpened) {
        return;
      }
      asidebar.style.display = 'block';
      articleDescription.style.display = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderInitial();
  });
};

export default runApp;
