import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

type HealthResponse = {
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'gamehub-ng';

  value = signal(0)
  health: string | null = null;

  http = inject(HttpClient);

  ngOnInit() {
    this.http.get<HealthResponse>('http://localhost:3001/api/health')
      .subscribe({
        next: (data) => {
          console.log('Healthcheck:', data.status);
          this.health = data.status;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  handleClick() {
    console.log('Button clicked!');
    this.value.update(v => v + 1);
  }
}
