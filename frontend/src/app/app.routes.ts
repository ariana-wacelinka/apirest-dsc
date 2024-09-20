import { Routes } from '@angular/router';
import { AnnouncementCreationComponent } from './announcenmentCreation/announcementCreation.component';

export const routes: Routes = [
    { path: 'home', component: AnnouncementCreationComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin/agenda', component: AnnouncementCreationComponent },
];
