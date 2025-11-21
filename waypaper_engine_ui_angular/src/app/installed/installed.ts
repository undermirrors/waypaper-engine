import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallpaperService } from '../core/services/wallpaper.service';
import { ScreenService } from '../core/services/screen.service';
import { Wallpaper } from '../core/models/wallpaper.model';
import { WallpaperCardComponent } from '../shared/components/wallpaper-card/wallpaper-card.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-installed',
  imports: [CommonModule, WallpaperCardComponent, SearchBarComponent],
  templateUrl: './installed.html',
  styleUrl: './installed.css'
})
export class InstalledComponent implements OnInit {
  wallpapers: Wallpaper[] = [];
  search: string = '';

  constructor(
    private wallpaperService: WallpaperService,
    private screenService: ScreenService
  ) {}

  async ngOnInit() {
    this.wallpaperService.wallpapers$.subscribe(wallpapers => this.wallpapers = wallpapers);
    await this.wallpaperService.notifyLoaded();
  }

  async onWallpaperClick(wpId: number): Promise<void> {
    const screen = this.screenService.getSelectedScreen();
    await this.wallpaperService.setWallpaper(wpId, screen);
  }

  async onSearchChange(search: string): Promise<void> {
    this.search = search;
    await this.wallpaperService.applyFilter(search);
  }
}

