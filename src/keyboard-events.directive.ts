import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[keyboardEvents]',
  standalone: true,
})
export class KeyboardEventsDirective {
  @Input({ required: true }) keysToListen: string[] = [];

  @Output() onKeyPress = new EventEmitter<KeyboardEvent>();

  @HostListener('document:keydown', ['$event'])
  handleArrowKeys(event: KeyboardEvent): void {
    if (this.keysToListen.includes(event.key)) {
      this.onKeyPress.emit(event);
    }
  }
}
