import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-screen-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './screen-selector.component.html',
  styleUrl: './screen-selector.component.css'
})
export class ScreenSelectorComponent {
  @Input() screens: string[] = [];
  @Input() selectedScreen = '';
  @Output() screenChange = new EventEmitter<string>();

  onScreenChange(screen: string): void {
    this.screenChange.emit(screen);
  }
}

