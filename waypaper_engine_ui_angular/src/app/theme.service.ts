import { Injectable } from '@angular/core';
import { Theme } from './core/models/theme.model';
import { StorageUtil } from './core/utils/storage.util';
import { APP_CONSTANTS } from './core/constants/app.constants';
import { THEMES } from './core/constants/themes.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  getThemes(): readonly Theme[] {
    return THEMES;
  }

  applyTheme(theme: Theme): void {
    document.documentElement.className = theme.className;
    StorageUtil.set(APP_CONSTANTS.STORAGE_KEYS.THEME, theme.className);
  }

  getCurrentTheme(): Theme {
    const savedTheme = StorageUtil.get<string>(APP_CONSTANTS.STORAGE_KEYS.THEME, '');
    return THEMES.find(t => t.className === savedTheme) || THEMES[0];
  }
}

