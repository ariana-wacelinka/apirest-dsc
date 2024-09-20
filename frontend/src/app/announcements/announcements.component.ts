import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { MatDivider } from '@angular/material/divider';
import { MatActionList } from '@angular/material/list';
@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [MatCardModule, MatDivider, MatActionList, DrawerComponent],
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

  createAnnouncement(announcementService: AnnouncementService) {
    this.announcementService.createAnnouncement(announcementService).subscribe((announcement: any) => {
      this.announcements.push(announcement);
    },
    (error: any) => {
      console.log(error);
    }
    );
  }

  noAnnouncements() {
    return this.announcementService.existsAnnouncement().subscribe(() => {
      return false;
    }
  );
  }
}
