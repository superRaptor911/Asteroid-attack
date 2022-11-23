import { UI } from '../UI';

export class UIButton extends UI {
  element: HTMLButtonElement;
  constructor(text: string, className?: string, id?: string) {
    super('button', className, id);
    this.element.innerText = text;
  }
}
