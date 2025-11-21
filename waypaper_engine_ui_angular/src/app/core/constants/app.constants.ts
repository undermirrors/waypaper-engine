export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    THEME: 'theme',
    SELECTED_SCREEN: 'selectedScreen'
  },
  TAURI_EVENTS: {
    SET_WALLPAPERS: 'setWPs'
  },
  TAURI_COMMANDS: {
    GET_SCREENS: 'get_screens',
    SET_WALLPAPER: 'set_wp',
    APPLY_FILTER: 'apply_filter',
    LOADED: 'loaded',
    STOP_DAEMON: 'stop_daemon'
  }
} as const;

