import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { MatDivider } from '@angular/material/divider';
import { MatActionList } from '@angular/material/list';
import { provideNativeDateAdapter } from '@angular/material/core';

interface Announcement {
  id: any;
  title: string;
  description: string;
  date: string;
}
@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [MatCardModule, MatDivider, MatActionList, DrawerComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  announcements: any[] = [];
  
  constructor(private announcementService: AnnouncementService) { }
  
  ngOnInit() {
    this.announcementService.getAnnouncements().subscribe((announcement: any) => {
      this.announcements = announcement;
    },
    (error: any) => {
      console.log(error);
    }
    );
  }

  noAnnouncements(): boolean {
    let hasntAnnouncements = false;
    this.announcementService.getAnnouncements().subscribe(() => {
      if (this.announcements.length === 0) {
        hasntAnnouncements = true;
      }
    });
    return hasntAnnouncements;
  }
}
