import {OnInit, ElementRef, Input, Directive, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[focuMe]'
})
export class FocusMeDirective implements OnInit, AfterViewInit {

    @Input('focuMe') isFocused: boolean;

    constructor(private hostElement: ElementRef) {
    }

    ngOnInit() {
        if (this.isFocused) {
            this.hostElement.nativeElement.focus();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.isFocused) {
                this.hostElement.nativeElement.focus();
            }
        }, 0);
    }
}
