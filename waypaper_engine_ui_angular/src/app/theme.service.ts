import { Injectable } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  className: string;
  preview: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themes: Theme[] = [
    {
      id: 'light',
      name: 'Light',
      className: '',
      preview: '#4a90e1'
    },
    {
      id: 'dark-theme',
      name: 'Dark',
      className: 'dark-theme',
      preview: '#4299e1'
    },
    {
      id: 'theme-nord',
      name: 'Nord',
      className: 'theme-nord',
      preview: '#88c0d0'
    },
    {
      id: 'theme-dracula',
      name: 'Dracula',
      className: 'theme-dracula',
      preview: '#bd93f9'
    },
    {
      id: 'theme-monokai',
      name: 'Monokai',
      className: 'theme-monokai',
      preview: '#f92672'
    },
    {
      id: 'theme-gruvbox',
      name: 'Gruvbox',
      className: 'theme-gruvbox',
      preview: '#d65d0e'
    },
    {
      id: 'theme-catppuccin',
      name: 'Catppuccin',
      className: 'theme-catppuccin',
      preview: '#cba6f7'
    },
    {
      id: 'theme-ocean',
      name: 'Ocean',
      className: 'theme-ocean',
      preview: '#00b4d8'
    },
    {
      id: 'theme-solarized-light',
      name: 'Solarized Light',
      className: 'theme-solarized-light',
      preview: '#268bd2'
    },
    {
      id: 'theme-solarized-dark',
      name: 'Solarized Dark',
      className: 'theme-solarized-dark',
      preview: '#268bd2'
    },
    {
      id: 'theme-tokyo-night',
      name: 'Tokyo Night',
      className: 'theme-tokyo-night',
      preview: '#7aa2f7'
    },
    {
      id: 'theme-one-dark',
      name: 'One Dark',
      className: 'theme-one-dark',
      preview: '#61afef'
    },
    {
      id: 'theme-material',
      name: 'Material',
      className: 'theme-material',
      preview: '#82aaff'
    },
    {
      id: 'theme-github-dark',
      name: 'GitHub Dark',
      className: 'theme-github-dark',
      preview: '#58a6ff'
    },
    {
      id: 'theme-ayu-dark',
      name: 'Ayu Dark',
      className: 'theme-ayu-dark',
      preview: '#ffcc66'
    },
    {
      id: 'theme-cobalt',
      name: 'Cobalt',
      className: 'theme-cobalt',
      preview: '#0088ff'
    },
    {
      id: 'theme-synthwave',
      name: 'Synthwave',
      className: 'theme-synthwave',
      preview: '#ff7edb'
    },
    {
      id: 'theme-everforest',
      name: 'Everforest',
      className: 'theme-everforest',
      preview: '#a7c080'
    },
    {
      id: 'theme-palenight',
      name: 'Palenight',
      className: 'theme-palenight',
      preview: '#82aaff'
    },
    {
      id: 'theme-horizon',
      name: 'Horizon',
      className: 'theme-horizon',
      preview: '#fab795'
    },
    {
      id: 'theme-forest',
      name: 'Forêt',
      className: 'theme-forest',
      preview: '#6b8e23'
    },
    {
      id: 'theme-sunset',
      name: 'Sunset',
      className: 'theme-sunset',
      preview: '#ff6b6b'
    },
    {
      id: 'theme-midnight-blue',
      name: 'Midnight Blue',
      className: 'theme-midnight-blue',
      preview: '#64ffda'
    },
    {
      id: 'theme-coral-reef',
      name: 'Coral Reef',
      className: 'theme-coral-reef',
      preview: '#ff6b9d'
    },
    {
      id: 'theme-desert-sand',
      name: 'Desert Sand',
      className: 'theme-desert-sand',
      preview: '#e67e22'
    },
    {
      id: 'theme-lavender',
      name: 'Lavender',
      className: 'theme-lavender',
      preview: '#9b59b6'
    },
    {
      id: 'theme-mint',
      name: 'Mint',
      className: 'theme-mint',
      preview: '#26d0ce'
    },
    {
      id: 'theme-cherry-blossom',
      name: 'Cherry Blossom',
      className: 'theme-cherry-blossom',
      preview: '#ff69b4'
    },
    {
      id: 'theme-volcano',
      name: 'Volcano',
      className: 'theme-volcano',
      preview: '#ff4500'
    },
    {
      id: 'theme-arctic',
      name: 'Arctic',
      className: 'theme-arctic',
      preview: '#00bfff'
    },
    {
      id: 'theme-amber',
      name: 'Amber',
      className: 'theme-amber',
      preview: '#ff9800'
    },
    {
      id: 'theme-slate',
      name: 'Slate',
      className: 'theme-slate',
      preview: '#636e72'
    },
    {
      id: 'theme-wine',
      name: 'Wine',
      className: 'theme-wine',
      preview: '#c2185b'
    },
    {
      id: 'theme-teal',
      name: 'Teal',
      className: 'theme-teal',
      preview: '#009688'
    },
    {
      id: 'theme-plum',
      name: 'Plum',
      className: 'theme-plum',
      preview: '#7b2cbf'
    },
    {
      id: 'theme-bronze',
      name: 'Bronze',
      className: 'theme-bronze',
      preview: '#cd7f32'
    },
    {
      id: 'theme-cyber',
      name: 'Cyber',
      className: 'theme-cyber',
      preview: '#f72585'
    },
    {
      id: 'theme-emerald',
      name: 'Emerald',
      className: 'theme-emerald',
      preview: '#27ae60'
    },
    {
      id: 'theme-rust',
      name: 'Rust',
      className: 'theme-rust',
      preview: '#b7410e'
    },
    {
      id: 'theme-blueberry',
      name: 'Blueberry',
      className: 'theme-blueberry',
      preview: '#4c51bf'
    }
  ];

  constructor() {
    console.log('[ThemeService] Initialized with', this.themes.length, 'themes:', this.themes.map(t => t.name).join(', '));
  }

  getThemes(): Theme[] {
    return [...this.themes];
  }

  applyTheme(theme: Theme) {
    document.documentElement.className = theme.className;
    localStorage.setItem('theme', theme.className);
    console.log('[ThemeService] Applied theme:', theme.name);
  }

  getCurrentTheme(): Theme | undefined {
    const savedTheme = localStorage.getItem('theme') || '';
    return this.themes.find(t => t.className === savedTheme) || this.themes[0];
  }
}

