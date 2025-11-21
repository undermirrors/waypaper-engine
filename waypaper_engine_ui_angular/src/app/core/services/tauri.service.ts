import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  async invoke<T>(command: string, args?: Record<string, any>): Promise<T> {
    return invoke<T>(command, args);
  }

  listen<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      let unlisten: UnlistenFn;

      listen<T>(event, (event) => {
        subscriber.next(event.payload);
      }).then((fn) => {
        unlisten = fn;
      }).catch((error) => {
        subscriber.error(error);
      });

      return () => {
        if (unlisten) {
          unlisten();
        }
      };
    });
  }
}

