import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import AuthService from '../../services/auth.service';
import SocketService from '../../services/socket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  _authService = inject(AuthService);
  _socketService = inject(SocketService);
  user = JSON.parse(this._authService.getUser());

  logout() {
    this._authService.logout();
    this._socketService.disconnect();
  }
}
