import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallpaper } from '../../../core/models/wallpaper.model';

@Component({
  selector: 'app-wallpaper-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallpaper-card.component.html',
  styleUrl: './wallpaper-card.component.css'
})
export class WallpaperCardComponent {
  @Input() wallpaper!: Wallpaper;
  @Output() wallpaperClick = new EventEmitter<number>();

  onCardClick(): void {
    this.wallpaperClick.emit(this.wallpaper.id);
  }
}

