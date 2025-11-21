import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../../core/models/theme.model';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css'
})
export class ThemeSelectorComponent {
  @Input() themes: Theme[] = [];
  @Input() currentTheme?: Theme;
  @Input() visible: boolean = false;
  @Output() themeSelect = new EventEmitter<Theme>();
  @Output() close = new EventEmitter<void>();

  onThemeSelect(theme: Theme): void {
    this.themeSelect.emit(theme);
  }

  onClose(): void {
    this.close.emit();
  }
}

