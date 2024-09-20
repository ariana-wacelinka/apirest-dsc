import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnnouncementService } from '../../services/announcement/announcement.service';
@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [MatCardModule],
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
}
