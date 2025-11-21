import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './theme.service';
import { ScreenService } from './core/services/screen.service';
import { ScreenSelectorComponent } from './shared/components/screen-selector/screen-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScreenSelectorComponent
  ]
})
export class AppComponent implements OnInit {
  screens: string[] = [];
  selectedScreen: string = '';

  constructor(
    private themeService: ThemeService,
    private screenService: ScreenService
  ) {}

  async ngOnInit() {
    // Appliquer le thème par défaut
    const currentTheme = this.themeService.getCurrentTheme();
    if (currentTheme) {
      this.themeService.applyTheme(currentTheme);
    }

    // Charger les écrans
    await this.screenService.loadScreens();
    this.screenService.screens$.subscribe(screens => this.screens = screens);
    this.screenService.selectedScreen$.subscribe(screen => this.selectedScreen = screen);
  }

  onScreenChange(screen: string): void {
    this.screenService.selectScreen(screen);
  }
}
