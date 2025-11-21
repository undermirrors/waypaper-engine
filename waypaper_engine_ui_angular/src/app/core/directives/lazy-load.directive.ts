import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() appLazyLoad = '';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!this.appLazyLoad) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private loadImage(): void {
    const element = this.el.nativeElement;

    if (element.tagName === 'IMG') {
      (element as HTMLImageElement).src = this.appLazyLoad;
    } else {
      element.style.backgroundImage = `url(${this.appLazyLoad})`;
    }
  }
}

