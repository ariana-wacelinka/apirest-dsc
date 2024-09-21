import { Routes } from '@angular/router';
import { AnnouncementCreationComponent } from './announcenmentCreation/announcementCreation.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

export const routes: Routes = [
    { path: 'home', component: AnnouncementsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'create-announcement', component: AnnouncementCreationComponent },
];
