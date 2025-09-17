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
    }
    this.http.post('http://localhost:3001/api/scores/clicker/save', resultBody).subscribe();
  }

  ngOnInit() {
    this.http.get<{ scores: { score: number, timestamp: string }[] }>('http://localhost:3001/api/scores/clicker').subscribe((response) => {
      console.log('Scores fetched:', response.scores);
      // if (response.scores.length > 0) {
      //   this.score.set(response.scores[0].score);
      // }
    });
  }
}
