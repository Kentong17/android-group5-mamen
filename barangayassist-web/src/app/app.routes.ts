import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ConcernsComponent } from './concerns/concerns.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainLayoutComponent } from './layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { PuroksComponent } from './puroks/puroks.component';
import { ReportsComponent } from './reports/reports.component';
import { ResidentsComponent } from './residents/residents.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'residents', component: ResidentsComponent },
      { path: 'puroks', component: PuroksComponent },
      { path: 'concerns', component: ConcernsComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
