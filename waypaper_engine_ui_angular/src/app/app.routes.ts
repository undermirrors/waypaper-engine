import { Routes } from '@angular/router';
import { InstalledComponent } from './installed/installed';
import { ThemesComponent } from './themes/themes';
import { SettingsComponent } from './settings/settings';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/installed',
    pathMatch: 'full'
  },
  {
    path: 'installed',
    component: InstalledComponent,
    title: 'Wallpapers installés'
  },
  {
    path: 'themes',
    component: ThemesComponent,
    title: 'Thèmes'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Paramètres'
  },
  {
    path: '**',
    redirectTo: '/installed'
  }
];

