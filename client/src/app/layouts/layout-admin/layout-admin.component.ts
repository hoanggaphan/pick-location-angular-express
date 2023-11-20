import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './layout-admin.component.html',
})
export class LayoutAdminComponent {}
