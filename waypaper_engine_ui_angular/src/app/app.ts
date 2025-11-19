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
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  screens: string[] = [];
  selectedScreen: string = '';
  wallpapers: any[] = [];
  search: string = '';
  theme: string = localStorage.getItem('theme') || 'light';
  themePanelVisible = false;

  async ngOnInit() {
    const tauri = window.__TAURI__;
    if (!tauri?.invoke || !tauri?.event?.listen) return;

    this.screens = await tauri.invoke('get_screens', {});
    if (this.screens.length) this.selectedScreen = this.screens[0];

    tauri.event.listen('setWPs', (e: any) => {
      this.wallpapers = e.payload;
    });

    await tauri.invoke('loaded', {});
  }

  onScreenChange() {
  }

  async onWallpaperClick(wpId: string) {
    await window.__TAURI__.invoke('set_wp', {
      wpId,
      screen: this.selectedScreen
    });
  }

  async onSearchChange() {
    await window.__TAURI__.invoke('apply_filter', { search: this.search });
  }

  async stopDaemon() {
    await window.__TAURI__.invoke('stop_daemon', {});
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