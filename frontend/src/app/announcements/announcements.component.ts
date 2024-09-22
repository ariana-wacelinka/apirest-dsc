import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { MatDivider } from '@angular/material/divider';
import { MatActionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
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
  imports: [MatCardModule, MatButtonModule, MatDivider, MatActionList, DrawerComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  announcements: any[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.announcementService.getAnnouncements().subscribe({
      next: (announcements: any) => {
        this.announcements = announcements;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }  

  deleteAnnouncement(id: any) {
    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.announcements = this.announcements.filter(
        (announcement: any) => announcement.id !== id
      );
    });
  }
}