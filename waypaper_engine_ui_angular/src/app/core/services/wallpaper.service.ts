import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TauriService } from './tauri.service';
import { Wallpaper } from '../models/wallpaper.model';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  private readonly wallpapersSubject = new BehaviorSubject<Wallpaper[]>([]);
  public readonly wallpapers$: Observable<Wallpaper[]> = this.wallpapersSubject.asObservable();

  private isLoaded = false;
  private currentFilter = '';

  constructor(private tauriService: TauriService) {
    this.tauriService.listen<Wallpaper[]>(APP_CONSTANTS.TAURI_EVENTS.SET_WALLPAPERS).subscribe({
      next: (wallpapers) => {
        this.wallpapersSubject.next(wallpapers);
        this.isLoaded = true;
      },
      error: (error) => console.error('[WallpaperService] Error:', error)
    });
  }

  async notifyLoaded(): Promise<void> {
    if (!this.isLoaded) {
      await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.LOADED);
    }
  }

  async setWallpaper(wpId: number, screen: string): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.SET_WALLPAPER, { wpId, screen });
  }

  async applyFilter(search: string): Promise<void> {
    if (this.currentFilter !== search) {
      this.currentFilter = search;
      await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.APPLY_FILTER, { search });
    }
  }

  getCurrentFilter(): string {
    return this.currentFilter;
  }

  async reload(): Promise<void> {
    this.isLoaded = false;
    await this.notifyLoaded();
  }
}

