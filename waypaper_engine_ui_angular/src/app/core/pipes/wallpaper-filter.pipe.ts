import { Pipe, PipeTransform } from '@angular/core';
import { Wallpaper } from '../models/wallpaper.model';

@Pipe({
  name: 'wallpaperFilter',
  standalone: true
})
export class WallpaperFilterPipe implements PipeTransform {
  transform(wallpapers: Wallpaper[] | null, searchTerm: string): Wallpaper[] {
    if (!wallpapers || !searchTerm) {
      return wallpapers || [];
    }

    const term = searchTerm.toLowerCase();

    return wallpapers.filter(wp => {
      const title = (wp.title || wp.name || '').toLowerCase();
      return title.includes(term) || wp.tags?.some(tag => tag.toLowerCase().includes(term));
    });
  }
}

