import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TauriService } from './tauri.service';
import { APP_CONSTANTS } from '../constants/app.constants';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private readonly screensSubject = new BehaviorSubject<string[]>([]);
  public readonly screens$: Observable<string[]> = this.screensSubject.asObservable();

  private readonly selectedScreenSubject = new BehaviorSubject<string>('');
  public readonly selectedScreen$: Observable<string> = this.selectedScreenSubject.asObservable();

  constructor(private tauriService: TauriService) {
    const savedScreen = StorageUtil.get<string>(APP_CONSTANTS.STORAGE_KEYS.SELECTED_SCREEN, '');
    if (savedScreen) {
      this.selectedScreenSubject.next(savedScreen);
    }
  }

  async loadScreens(): Promise<void> {
    const screens = await this.tauriService.invoke<string[]>(APP_CONSTANTS.TAURI_COMMANDS.GET_SCREENS, {});
    this.screensSubject.next(screens);

    if (screens.length > 0 && !this.selectedScreenSubject.value) {
      this.selectScreen(screens[0]);
    }
  }

  selectScreen(screen: string): void {
    this.selectedScreenSubject.next(screen);
    StorageUtil.set(APP_CONSTANTS.STORAGE_KEYS.SELECTED_SCREEN, screen);
  }

  getSelectedScreen(): string {
    return this.selectedScreenSubject.value;
  }
}

