import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-games',
  imports: [RouterModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

  private route = inject(ActivatedRoute)
  private router = inject(Router)

  protected get currentRoute() {
    return this.router.url;
  }
}
