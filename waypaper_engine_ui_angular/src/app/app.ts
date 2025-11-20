import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    __TAURI__: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AppComponent implements OnInit {
  screens: string[] = [];
  selectedScreen: string = '';
  wallpapers: any[] = [];
  search: string = '';
  theme: string = '';
  themePanelVisible = false;

  async ngOnInit() {
    // Initialiser le theme depuis localStorage
    this.theme = localStorage.getItem('theme') || '';

    const tauri = window.__TAURI__;
    if (!tauri?.invoke || !tauri?.event?.listen) {
      console.error('Tauri API not available');
      return;
    }

    try {
      this.screens = await tauri.invoke('get_screens', {});
      console.log('Screens loaded:', this.screens);
      if (this.screens.length) this.selectedScreen = this.screens[0];

      tauri.event.listen('setWPs', (e: any) => {
        console.log('Received wallpapers:', e.payload);
        this.wallpapers = e.payload;
      });

      await tauri.invoke('loaded', {});
      console.log('Loaded command sent');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  onScreenChange() {
  }

  async onWallpaperClick(wpId: number) {
    try {
      console.log('Setting wallpaper:', wpId, 'on screen:', this.selectedScreen);
      await window.__TAURI__.invoke('set_wp', {
        wpId,
        screen: this.selectedScreen
      });
      console.log('Wallpaper set successfully');
    } catch (error) {
      console.error('Error setting wallpaper:', error);
    }
  }

  async onSearchChange() {
    try {
      console.log('Applying filter:', this.search);
      await window.__TAURI__.invoke('apply_filter', { search: this.search });
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  }

  async stopDaemon() {
    try {
      console.log('Stopping daemon...');
      await window.__TAURI__.invoke('stop_daemon', {});
      console.log('Daemon stopped');
    } catch (error) {
      console.error('Error stopping daemon:', error);
    }
  }

  toggleThemePanel() {
    this.themePanelVisible = !this.themePanelVisible;
  }

  onThemeChange() {
    document.documentElement.className = this.theme;
    localStorage.setItem('theme', this.theme);
    this.themePanelVisible = false;
  }
}