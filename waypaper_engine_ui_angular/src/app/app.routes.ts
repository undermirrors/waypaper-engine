import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/installed',
    pathMatch: 'full'
  },
  {
    path: 'installed',
    loadComponent: () => import('./installed/installed').then(m => m.InstalledComponent),
    title: 'Installed Wallpapers'
  },
  {
    path: 'themes',
    loadComponent: () => import('./themes/themes').then(m => m.ThemesComponent),
    title: 'Themes'
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings').then(m => m.SettingsComponent),
    title: 'Settings'
  },
  {
    path: '**',
    redirectTo: '/installed'
  }
];

