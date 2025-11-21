export interface Wallpaper {
  id: number;
  title: string;
  name?: string;
  preview_b64?: string;
  preview?: string;
  path: string;
  type?: string;
  tags?: string[];
}

export interface Screen {
  name: string;
  resolution?: string;
  isPrimary?: boolean;
}

