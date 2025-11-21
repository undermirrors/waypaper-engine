import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallpaperService } from '../core/services/wallpaper.service';
import { ScreenService } from '../core/services/screen.service';
import { Wallpaper } from '../core/models/wallpaper.model';
import { WallpaperCardComponent } from '../shared/components/wallpaper-card/wallpaper-card.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-installed',
  imports: [CommonModule, WallpaperCardComponent, SearchBarComponent],
  templateUrl: './installed.html',
  styleUrl: './installed.css'
})
export class InstalledComponent implements OnInit, OnDestroy {
  wallpapers: Wallpaper[] = [];
  search: string = '';
  private subscription?: Subscription;

  constructor(
    private wallpaperService: WallpaperService,
    private screenService: ScreenService
  ) {}

  async ngOnInit() {
    // Récupérer le filtre actuel pour maintenir l'état de recherche
    this.search = this.wallpaperService.getCurrentFilter();

    // S'abonner aux changements de wallpapers
    this.subscription = this.wallpaperService.wallpapers$.subscribe(
      wallpapers => this.wallpapers = wallpapers
    );

    // Charger uniquement si pas déjà chargé (mise en cache)
    await this.wallpaperService.notifyLoaded();
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement pour éviter les fuites mémoire
    this.subscription?.unsubscribe();
  }

  async onWallpaperClick(wpId: number): Promise<void> {
    const screen = this.screenService.getSelectedScreen();
    await this.wallpaperService.setWallpaper(wpId, screen);
  }

  async onSearchChange(search: string): Promise<void> {
    this.search = search;
    await this.wallpaperService.applyFilter(search);
  }

  // Fonction trackBy pour optimiser les performances de *ngFor
  trackByWallpaperId(index: number, wallpaper: Wallpaper): number {
    return wallpaper.id;
  }
}

