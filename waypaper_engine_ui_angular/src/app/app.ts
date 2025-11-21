import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly destroyRef = inject(DestroyRef);

  screens: string[] = [];
  selectedScreen = '';

  constructor(
    private themeService: ThemeService,
    private screenService: ScreenService
  ) {}

  async ngOnInit(): Promise<void> {
    this.themeService.applyTheme(this.themeService.getCurrentTheme());

    await this.screenService.loadScreens();

    this.screenService.screens$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(screens => this.screens = screens);

    this.screenService.selectedScreen$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(screen => this.selectedScreen = screen);
  }

  onScreenChange(screen: string): void {
    this.screenService.selectScreen(screen);
  }
}
