import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-clicker',
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss',
})
export class ClickerComponent {
  score = signal(0);

  increment() {
    console.log('Button clicked!');
    this.score.update((v) => v + 1);
  }
}
