import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

@Component({
  selector: 'app-installed',
  imports: [CommonModule, FormsModule],
  templateUrl: './installed.html',
  styleUrl: './installed.css'
})
export class InstalledComponent implements OnInit {
  wallpapers: any[] = [];
  search: string = '';
  selectedScreen: string = '';

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      console.log('[INSTALLED] Setting up setWPs listener...');
      await listen<any>('setWPs', (event) => {
        this.ngZone.run(() => {
          console.log('[INSTALLED] Received wallpapers:', event.payload);
          this.wallpapers = event.payload;
          this.cdr.detectChanges();
        });
      });
      console.log('[INSTALLED] Calling loaded...');
      await invoke('loaded', {});
      console.log('[INSTALLED] Loaded command sent');
    } catch (error) {
      console.error('[INSTALLED] Error during initialization:', error);
    }
  }

  async onWallpaperClick(wpId: number) {
    console.log('[INSTALLED] Wallpaper clicked:', wpId);
    try {
      // Get selected screen from localStorage
      const screen = localStorage.getItem('selectedScreen') || '';
      console.log('[INSTALLED] Setting wallpaper:', wpId, 'on screen:', screen);
      await invoke('set_wp', {
        wpId,
        screen
      });
      console.log('[INSTALLED] Wallpaper set successfully');
    } catch (error) {
      console.error('[INSTALLED] Error setting wallpaper:', error);
    }
  }

  async onSearchChange() {
    console.log('[INSTALLED] Search changed:', this.search);
    try {
      console.log('[INSTALLED] Applying filter:', this.search);
      await invoke('apply_filter', { search: this.search });
      console.log('[INSTALLED] Filter applied successfully');
    } catch (error) {
      console.error('[INSTALLED] Error applying filter:', error);
    }
  }
}

