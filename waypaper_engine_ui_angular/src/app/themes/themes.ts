import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

@Component({
  selector: 'app-themes',
  imports: [CommonModule],
  templateUrl: './themes.html',
  styleUrl: './themes.css'
})
export class ThemesComponent implements OnInit {
  currentTheme: string = '';

  themes: Theme[] = [
    {
      id: '',
      name: 'Light',
      description: 'Thème clair et épuré pour un usage quotidien',
      colors: {
        primary: '#4299e1',
        secondary: '#f5f7fa',
        accent: '#48bb78',
        background: '#ffffff'
      }
    },
    {
      id: 'dark-theme',
      name: 'Dark',
      description: 'Thème sombre élégant pour réduire la fatigue visuelle',
      colors: {
        primary: '#4299e1',
        secondary: '#2d3748',
        accent: '#63b3ed',
        background: '#1a202c'
      }
    },
    {
      id: 'theme-nord',
      name: 'Nord',
      description: 'Palette arctique inspirée par la beauté du Grand Nord',
      colors: {
        primary: '#88c0d0',
        secondary: '#3b4252',
        accent: '#5e81ac',
        background: '#2e3440'
      }
    },
    {
      id: 'theme-dracula',
      name: 'Dracula',
      description: 'Thème sombre avec des accents violets vibrants',
      colors: {
        primary: '#bd93f9',
        secondary: '#44475a',
        accent: '#ff79c6',
        background: '#282a36'
      }
    },
    {
      id: 'theme-monokai',
      name: 'Monokai',
      description: 'Palette inspirée de l\'éditeur Sublime Text',
      colors: {
        primary: '#f92672',
        secondary: '#3e3d32',
        accent: '#a6e22e',
        background: '#272822'
      }
    },
    {
      id: 'theme-gruvbox',
      name: 'Gruvbox',
      description: 'Couleurs rétro chaleureuses et confortables',
      colors: {
        primary: '#d65d0e',
        secondary: '#3c3836',
        accent: '#b8bb26',
        background: '#282828'
      }
    },
    {
      id: 'theme-catppuccin',
      name: 'Catppuccin',
      description: 'Palette pastel douce et apaisante',
      colors: {
        primary: '#cba6f7',
        secondary: '#313244',
        accent: '#f5c2e7',
        background: '#1e1e2e'
      }
    },
    {
      id: 'theme-ocean',
      name: 'Ocean',
      description: 'Inspiré par les profondeurs de l\'océan',
      colors: {
        primary: '#00b4d8',
        secondary: '#16213e',
        accent: '#48cae4',
        background: '#0f3460'
      }
    },
    {
      id: 'theme-solarized-light',
      name: 'Solarized Light',
      description: 'Palette claire optimisée pour la lecture',
      colors: {
        primary: '#268bd2',
        secondary: '#fdf6e3',
        accent: '#859900',
        background: '#fdf6e3'
      }
    },
    {
      id: 'theme-solarized-dark',
      name: 'Solarized Dark',
      description: 'Version sombre de la palette Solarized',
      colors: {
        primary: '#268bd2',
        secondary: '#073642',
        accent: '#2aa198',
        background: '#002b36'
      }
    },
    {
      id: 'theme-tokyo-night',
      name: 'Tokyo Night',
      description: 'Thème inspiré des nuits de Tokyo',
      colors: {
        primary: '#7aa2f7',
        secondary: '#1a1b26',
        accent: '#bb9af7',
        background: '#1a1b26'
      }
    },
    {
      id: 'theme-one-dark',
      name: 'One Dark',
      description: 'Palette populaire d\'Atom et VS Code',
      colors: {
        primary: '#61afef',
        secondary: '#282c34',
        accent: '#98c379',
        background: '#282c34'
      }
    },
    {
      id: 'theme-material',
      name: 'Material',
      description: 'Design Material inspiré de Google',
      colors: {
        primary: '#82aaff',
        secondary: '#263238',
        accent: '#c3e88d',
        background: '#263238'
      }
    },
    {
      id: 'theme-github-dark',
      name: 'GitHub Dark',
      description: 'Thème sombre de GitHub',
      colors: {
        primary: '#58a6ff',
        secondary: '#161b22',
        accent: '#7ee787',
        background: '#0d1117'
      }
    },
    {
      id: 'theme-ayu-dark',
      name: 'Ayu Dark',
      description: 'Thème élégant et minimaliste',
      colors: {
        primary: '#ffcc66',
        secondary: '#0f1419',
        accent: '#39bae6',
        background: '#0f1419'
      }
    },
    {
      id: 'theme-cobalt',
      name: 'Cobalt',
      description: 'Bleu cobalt profond et énergique',
      colors: {
        primary: '#0088ff',
        secondary: '#002240',
        accent: '#ff9d00',
        background: '#002240'
      }
    },
    {
      id: 'theme-synthwave',
      name: 'Synthwave',
      description: 'Palette rétro-futuriste années 80',
      colors: {
        primary: '#ff7edb',
        secondary: '#262335',
        accent: '#72f1b8',
        background: '#262335'
      }
    },
    {
      id: 'theme-everforest',
      name: 'Everforest',
      description: 'Thème vert forêt apaisant',
      colors: {
        primary: '#a7c080',
        secondary: '#2d353b',
        accent: '#83c092',
        background: '#2d353b'
      }
    },
    {
      id: 'theme-palenight',
      name: 'Palenight',
      description: 'Violet pâle élégant pour la nuit',
      colors: {
        primary: '#82aaff',
        secondary: '#292d3e',
        accent: '#c792ea',
        background: '#292d3e'
      }
    },
    {
      id: 'theme-horizon',
      name: 'Horizon',
      description: 'Coucher de soleil chaleureux',
      colors: {
        primary: '#fab795',
        secondary: '#1c1e26',
        accent: '#f43e5c',
        background: '#1c1e26'
      }
    },
  ];

  ngOnInit() {
    this.currentTheme = localStorage.getItem('theme') || '';
  }

  selectTheme(themeId: string) {
    this.currentTheme = themeId;
    document.documentElement.className = themeId;
    localStorage.setItem('theme', themeId);
  }

  isActive(themeId: string): boolean {
    return this.currentTheme === themeId;
  }
}
