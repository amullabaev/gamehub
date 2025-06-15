import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

type HealthResponse = {
  status: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  location = inject(Location);
  router = inject(Router);

  health: string | null = null;

  ngOnInit() {
    this.http
      .get<HealthResponse>('http://localhost:3001/api/health')
      .subscribe({
        next: (data) => {
          console.log('Healthcheck:', data.status);
          this.health = data.status;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  back() {
    if (this.router.url !== '/home') {
      this.location.back();
    }
  }
}
