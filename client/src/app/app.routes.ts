import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import AuthGuard from './shared/auth.guard';
import RoleGuard from './shared/role.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'submission/:id',
        loadComponent: () =>
          import(
            './pages/submission-details/submission-details.component'
          ).then((m) => m.SubmissionDetailsComponent),
      },
    ],
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
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
