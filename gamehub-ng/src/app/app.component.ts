import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';

type HealthResponse = {
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'gamehub-ng';

  value = 0
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
    this.value++;
  }
}
