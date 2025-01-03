import { createApp } from 'vue';
import './assets/css/style.css';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { attachConsole } from '@tauri-apps/plugin-log';
import { logger } from './services/logger.service';
import { getLogMessage, preventGlobalContextMenu } from './utils/helper';
import AppAsync from './AppAsync.vue';
import documentService from './services/document.service';

(async () => {
  try {
    preventGlobalContextMenu();

    if (import.meta.env.DEV) {
      await attachConsole();
    }
    await Promise.all([documentService.init()]);

    createApp(AppAsync).use(VueQueryPlugin).use(createPinia()).mount('#app');
  } catch (error) {
    logger.error(getLogMessage('init-app', error));
    throw error;
  }
})();
