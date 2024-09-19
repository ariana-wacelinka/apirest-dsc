import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [ MatCardModule, MatFormFieldModule, MatInputModule, MatButton ],
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.scss'
})
export class CreateAnnouncementComponent {
  createAnnouncement() {
    // Create announcement
  }
}
