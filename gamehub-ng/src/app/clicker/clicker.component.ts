import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-clicker',
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss',
})
export class ClickerComponent {

  private http = inject(HttpClient);
  score = signal(0);

  protected increment() {
    console.log('Button clicked!');
    this.score.update((v) => v + 1);
  }
  
  protected save() {
    console.log('Score saved:', this.score());
    const resultBody = {
      score: this.score(),
      timestamp: new Date().toISOString(),
    }
    this.http.post('/api/save/clicker', resultBody).subscribe();
  }
}
