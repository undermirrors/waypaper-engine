import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { ThemeService, Theme } from './theme.service';

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
  themes: Theme[] = [];
  currentTheme: Theme | undefined;
  themePanelVisible = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    // Charger les thèmes disponibles
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
    if (this.currentTheme) {
      this.themeService.applyTheme(this.currentTheme);
    }

    try {
      console.log('[APP] Calling get_screens...');
      this.screens = await invoke<string[]>('get_screens', {});
      console.log('[APP] Screens loaded:', this.screens);
      if (this.screens.length) {
        this.selectedScreen = this.screens[0];
      }
      this.cdr.detectChanges();
      console.log('[APP] Setting up setWPs listener...');
      await listen<any>('setWPs', (event) => {
        this.ngZone.run(() => {
          console.log('[APP] Received wallpapers:', event.payload);
          this.wallpapers = event.payload;
          this.cdr.detectChanges();
        });
      });
      console.log('[APP] Calling loaded...');
      await invoke('loaded', {});
      console.log('[APP] Loaded command sent');
    } catch (error) {
      console.error('[APP] Error during initialization:', error);
    }
  }

  onScreenChange() {
    console.log('[APP] Screen changed to:', this.selectedScreen);
  }

  async onWallpaperClick(wpId: number) {
    console.log('[APP] Wallpaper clicked:', wpId);
    try {
      console.log('[APP] Setting wallpaper:', wpId, 'on screen:', this.selectedScreen);
      await invoke('set_wp', {
        wpId,
        screen: this.selectedScreen
      });
      console.log('[APP] Wallpaper set successfully');
    } catch (error) {
      console.error('[APP] Error setting wallpaper:', error);
    }
  }

  async onSearchChange() {
    console.log('[APP] Search changed:', this.search);
    try {
      console.log('[APP] Applying filter:', this.search);
      await invoke('apply_filter', { search: this.search });
      console.log('[APP] Filter applied successfully');
    } catch (error) {
      console.error('[APP] Error applying filter:', error);
    }
  }

  async stopDaemon() {
    console.log('[APP] Stop daemon button clicked');
    try {
      console.log('[APP] Stopping daemon...');
      await invoke('stop_daemon', {});
      console.log('[APP] Daemon stopped');
    } catch (error) {
      console.error('[APP] Error stopping daemon:', error);
    }
  }

  selectTheme(theme: Theme) {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
  }
}
