import { Routes } from '@angular/router';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';


export const routes: Routes = [
    { path: 'create-announcement', component: CreateAnnouncementComponent },
    { path: 'announcements', component: AnnouncementsComponent }
];
