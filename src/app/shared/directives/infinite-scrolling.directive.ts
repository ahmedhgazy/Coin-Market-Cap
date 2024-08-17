import {
    Directive,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
} from '@angular/core';

@Directive({
    selector: '[appObserveIntersection]',
    standalone: true,
})
export class ObserveIntersectionDirective implements OnInit, OnDestroy {
    @Input() threshold: number | number[] = 0;
    @Input() root: HTMLElement | null = null;
    @Input() rootMargin: string = '0px';

    @Output() visibilityChange = new EventEmitter<boolean>();

    private observer: IntersectionObserver | null = null;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.setupObserver();
    }

    ngOnDestroy() {
        this.destroyObserver();
    }

    private setupObserver() {
        const options: IntersectionObserverInit = {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.visibilityChange.emit(entry.isIntersecting);
            });
        }, options);

        this.observer.observe(this.el.nativeElement);
    }

    private destroyObserver() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
