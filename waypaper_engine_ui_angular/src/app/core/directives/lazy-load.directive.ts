import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective {
  @Input() appLazyLoad: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isVisible && this.appLazyLoad) {
      this.loadImage();
    }
  }

  private loadImage() {
    const img = this.el.nativeElement;
    if (img.tagName === 'IMG' && this.appLazyLoad) {
      img.src = this.appLazyLoad;
    } else {
      img.style.backgroundImage = `url(${this.appLazyLoad})`;
    }
  }
}

