import { Pipe, PipeTransform } from '@angular/core';
import { Wallpaper } from '../models/wallpaper.model';

@Pipe({
  name: 'wallpaperFilter',
  standalone: true,
  pure: false
})
export class WallpaperFilterPipe implements PipeTransform {
  transform(wallpapers: Wallpaper[], searchTerm: string): Wallpaper[] {
    if (!wallpapers || !searchTerm) {
      return wallpapers;
    }

    const term = searchTerm.toLowerCase();

    return wallpapers.filter(wp => {
      const title = (wp.title || wp.name || '').toLowerCase();
      const matchesTitle = title.includes(term);
      const matchesTags = wp.tags?.some(tag => tag.toLowerCase().includes(term)) || false;

      return matchesTitle || matchesTags;
    });
  }
}

