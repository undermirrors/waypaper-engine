import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TauriService } from './tauri.service';
import { Wallpaper } from '../models/wallpaper.model';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  private wallpapersSubject = new BehaviorSubject<Wallpaper[]>([]);
  public wallpapers$: Observable<Wallpaper[]> = this.wallpapersSubject.asObservable();
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
    // Ne charger qu'une seule fois
    if (!this.isLoaded) {
      await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.LOADED);
    }
  }

  async setWallpaper(wpId: number, screen: string): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.SET_WALLPAPER, { wpId, screen });
  }

  async applyFilter(search: string): Promise<void> {
    // Ne réappliquer le filtre que s'il a changé
    if (this.currentFilter !== search) {
      this.currentFilter = search;
      await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.APPLY_FILTER, { search });
    }
  }

  getCurrentFilter(): string {
    return this.currentFilter;
  }

  // Méthode pour forcer un rechargement si nécessaire
  async reload(): Promise<void> {
    this.isLoaded = false;
    await this.notifyLoaded();
  }
}

