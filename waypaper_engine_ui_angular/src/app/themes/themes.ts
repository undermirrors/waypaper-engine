import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';
import { Theme } from '../core/models/theme.model';

@Component({
  selector: 'app-themes',
  imports: [CommonModule],
  templateUrl: './themes.html',
  styleUrl: './themes.css'
})
export class ThemesComponent implements OnInit {
  themes: readonly Theme[] = [];
  currentTheme?: Theme;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  selectTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
  }

  isActive(theme: Theme): boolean {
    return this.currentTheme?.id === theme.id;
  }
}
