import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';
import { DaemonService } from '../core/services/daemon.service';
import { Theme } from '../core/models/theme.model';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent implements OnInit {
  themes: Theme[] = [];
  currentTheme: Theme | undefined;

  constructor(
    private themeService: ThemeService,
    private daemonService: DaemonService
  ) {}

  ngOnInit() {
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  selectTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
  }

  async stopDaemon(): Promise<void> {
    await this.daemonService.stop();
  }
}
