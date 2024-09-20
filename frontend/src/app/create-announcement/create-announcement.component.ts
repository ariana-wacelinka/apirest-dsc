import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButton, MatDatepickerModule, ReactiveFormsModule, FormsModule],
  providers: [provideNativeDateAdapter(), FormControl],
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.scss'
})
export class CreateAnnouncementComponent {
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toISOString());

  constructor(private router: Router) {
    this.router.navigate(['/create-announcement']);
  }

  createAnnouncement() {
    // Create announcement
  }
}
