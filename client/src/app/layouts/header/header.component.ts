import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  user = JSON.parse(this.authService.getUser());

  logout() {
    this.authService.logout();
  }
}
