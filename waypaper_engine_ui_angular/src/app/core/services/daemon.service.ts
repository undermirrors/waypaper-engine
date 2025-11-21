import { Injectable } from '@angular/core';
import { TauriService } from './tauri.service';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DaemonService {
  constructor(private tauriService: TauriService) {}

  async stop(): Promise<void> {
    await this.tauriService.invoke(APP_CONSTANTS.TAURI_COMMANDS.STOP_DAEMON);
  }
}

