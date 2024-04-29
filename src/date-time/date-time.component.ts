import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { KeyboardEventsDirective } from '../keyboard-events.directive';

enum KeysEvents {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
}

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  standalone: true,
  imports: [CommonModule, KeyboardEventsDirective],
})
export class DateTimeComponent implements AfterViewInit {
  @ViewChild('input') inputEl!: ElementRef<HTMLLabelElement>;

  private _inputs!: HTMLInputElement[];
  private _inputEventsCount = 0;

  public keysToListen = Object.values(KeysEvents);

  ngAfterViewInit(): void {
    this._inputs = Array.from(
      this.inputEl.nativeElement.children
    ) as HTMLInputElement[];
  }

  public onKeyEvent(keyEvent: KeyboardEvent): void {
    const selectedInputIndex = this._inputs.findIndex(
      (input) => input === keyEvent.target
    );

    if (
      !keyEvent.target ||
      !(keyEvent.target instanceof HTMLInputElement) ||
      !(selectedInputIndex >= 0)
    ) {
      return;
    }

    if (
      keyEvent.key === KeysEvents.BACKSPACE ||
      keyEvent.key === KeysEvents.DELETE
    ) {
      this._inputs[selectedInputIndex].value = '';

      return;
    }

    if (
      keyEvent.key === KeysEvents.ARROW_LEFT ||
      keyEvent.key === KeysEvents.ARROW_RIGHT
    ) {
      this._selectInput(keyEvent.key, selectedInputIndex);

      return;
    }
  }

  public onInputPartFocus(): void {
    this._inputEventsCount = 0;
  }

  public onInputPartChange(ev: InputEvent, min: number, max: number): void {
    const input = ev.target as HTMLInputElement;

    if (String(max).length <= ++this._inputEventsCount) {
      const selectedInputIndex = this._inputs.findIndex((el) => el === input);
      const nextInputIndex = Math.min(
        selectedInputIndex + 1,
        this._inputs.length - 1
      );

      this._inputs[nextInputIndex].focus();
      this._inputEventsCount = 0;
    }

    if (input) {
      const value = input.valueAsNumber;

      if (value >= max) {
        input.value = this._padNumberWithZeroes(min, max);
        return;
      }

      if (value < min) {
        input.value = String(max);
        return;
      }

      input.value = this._padNumberWithZeroes(value, max);
    }
  }

  private _selectInput(key: string, currentInputIndex: number): void {
    let nextIndex = 0;

    if (key === KeysEvents.ARROW_LEFT) {
      nextIndex =
        currentInputIndex - 1 < 0
          ? this._inputs.length - 1
          : currentInputIndex - 1;
    }

    if (key === KeysEvents.ARROW_RIGHT) {
      nextIndex =
        currentInputIndex + 1 > this._inputs.length - 1
          ? 0
          : currentInputIndex + 1;
    }

    this._inputs[nextIndex].focus();
  }

  private _padNumberWithZeroes(value: number, maxValue: number) {
    const zeroesToAdd = Math.max(
      0,
      String(maxValue).length - String(value).length
    );

    return '0'.repeat(zeroesToAdd) + value;
  }
}
