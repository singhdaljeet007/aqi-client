import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class AqiHighlightDirective {
  @Input() appHighlight: number | undefined;
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.setTextColor();
  }

  setTextColor() {
    if (!this.appHighlight) {
      this.elRef.nativeElement.style.color = '#000';
    } else if (this.appHighlight >= 0 && this.appHighlight < 51) {
      this.elRef.nativeElement.style.color = '#55a84f'; // good
    } else if (this.appHighlight >= 51 && this.appHighlight < 101) {
      this.elRef.nativeElement.style.color = '#748e3b'; // satisfactory
    } else if (this.appHighlight >= 101 && this.appHighlight < 201) {
      this.elRef.nativeElement.style.color = '#fff733'; //moderate
    } else if (this.appHighlight >= 201 && this.appHighlight < 300) {
      this.elRef.nativeElement.style.color = '#f29c33'; //poor
    } else if (this.appHighlight >= 301 && this.appHighlight < 400) {
      this.elRef.nativeElement.style.color = '#e83f33'; // very poor
    } else {
      this.elRef.nativeElement.style.color = '#af2d24';  //severe
    }
  }
}

