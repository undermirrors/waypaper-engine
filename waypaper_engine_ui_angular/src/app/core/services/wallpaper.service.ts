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

  constructor(private tauriService: TauriService) {
    this.tauriService.listen<Wallpaper[]>(APP_CONSTANTS.TAURI_EVENTS.SET_WALLPAPERS).subscribe({
      next: (wallpapers) => this.wallpapersSubject.next(wallpapers),
      error: (error) => console.error('[WallpaperService] Error:', error)
    });
  }

  async notifyLoaded(): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.LOADED);
  }

  async setWallpaper(wpId: number, screen: string): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.SET_WALLPAPER, { wpId, screen });
  }

  async applyFilter(search: string): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.APPLY_FILTER, { search });
  }
}

