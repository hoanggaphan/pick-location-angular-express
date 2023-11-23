import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import AuthGuard from './shared/auth.guard';
import RoleGuard from './shared/role.guard';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MapSubmissionComponent } from './pages/map-submission/map-submission.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubmissionDetailsComponent } from './pages/submission-details/submission-details.component';

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
        component: MapSubmissionComponent,
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
        component: DashboardComponent,
      },
      {
        path: 'submission/:id',
        component: SubmissionDetailsComponent,
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
