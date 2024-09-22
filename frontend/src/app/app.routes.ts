import { Routes } from '@angular/router';
import { AnnouncementCreationComponent } from './announcenmentCreation/announcementCreation.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementUpdateComponent } from './announcementUpdate/announcementUpdate.component';

export const routes: Routes = [
    { path: 'home', component: AnnouncementsComponent },
    { path: '', redirectTo: '/announcements', pathMatch: 'full' },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'create-announcement', component: AnnouncementCreationComponent },
    { path: 'update-announcement/:id', component: AnnouncementUpdateComponent },
    { path: 'update-announcement/', redirectTo: '/home'},
];
