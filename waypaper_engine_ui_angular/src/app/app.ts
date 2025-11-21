import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';
import { WallpaperService } from './core/services/wallpaper.service';
import { ScreenService } from './core/services/screen.service';
import { DaemonService } from './core/services/daemon.service';
import { Theme } from './core/models/theme.model';
import { Wallpaper } from './core/models/wallpaper.model';
import { WallpaperCardComponent } from './shared/components/wallpaper-card/wallpaper-card.component';
import { ScreenSelectorComponent } from './shared/components/screen-selector/screen-selector.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { ThemeSelectorComponent } from './shared/components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    CommonModule,
    WallpaperCardComponent,
    ScreenSelectorComponent,
    SearchBarComponent,
    ThemeSelectorComponent
  ]
})
export class AppComponent implements OnInit {
  screens: string[] = [];
  selectedScreen: string = '';
  wallpapers: Wallpaper[] = [];
  search: string = '';
  themes: Theme[] = [];
  currentTheme: Theme | undefined;
  themePanelVisible = false;

  constructor(
    private themeService: ThemeService,
    private wallpaperService: WallpaperService,
    private screenService: ScreenService,
    private daemonService: DaemonService
  ) {}

  async ngOnInit() {
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
    if (this.currentTheme) {
      this.themeService.applyTheme(this.currentTheme);
    }

    await this.screenService.loadScreens();
    this.screenService.screens$.subscribe(screens => this.screens = screens);
    this.screenService.selectedScreen$.subscribe(screen => this.selectedScreen = screen);

    this.wallpaperService.wallpapers$.subscribe(wallpapers => this.wallpapers = wallpapers);
    await this.wallpaperService.notifyLoaded();
  }

  onScreenChange(screen: string): void {
    this.screenService.selectScreen(screen);
  }

  async onWallpaperClick(wpId: number): Promise<void> {
    await this.wallpaperService.setWallpaper(wpId, this.selectedScreen);
  }

  async onSearchChange(search: string): Promise<void> {
    this.search = search;
    await this.wallpaperService.applyFilter(search);
  }

  async stopDaemon(): Promise<void> {
    await this.daemonService.stop();
  }

  selectTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
    this.themePanelVisible = false;
  }

  toggleThemePanel(): void {
    this.themePanelVisible = !this.themePanelVisible;
  }
}
