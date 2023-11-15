import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map-submission',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'map-submission',
        loadComponent: () =>
          import('./pages/map-submission/map-submission.component').then(
            (m) => m.MapSubmissionComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./pages/user/user.component').then((m) => m.UserComponent),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },

  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/no-match/no-match.component').then(
        (m) => m.NoMatchComponent
      ),
  },
];
