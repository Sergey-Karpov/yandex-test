import { preloader } from '../libs/preloader/ilabPreloader.js';

// Вызываем прелоадеры последовательно и затем инициализацию скроллбаров
preloader('.page-preloader', 1000, true).then(() => {
  return Promise.all([
    preloader('.element-preloader', 1500, false),
    preloader('.button-preloader', 1500, false),
  ]);
});
