import { Component } from '@angular/core';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../index';
import { DrawerComponent } from "../drawer/drawer.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-announcement-update',
  standalone: true,
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ToolbarComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DrawerComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcementUpdate.component.html',
  styleUrls: ['./announcementUpdate.component.scss'],
})
export class AnnouncementUpdateComponent {
  encontrado = true;
  id: string = '';
  readonly date = new FormControl(new Date());
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: this.date
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.announcementService.getAnnouncements().subscribe((announcement ) => {
        const announcementToUpdate = announcement.find((announcement) => announcement.id === this.id);
        if (announcementToUpdate) {
          this.encontrado = true;
          this.form.patchValue(announcementToUpdate);
        } else {
          this.encontrado = false;
          console.error('No se ha encontrado el anuncio a modificar');
        }
      });
    }
  }

  updateAnnouncement() {
    if (this.form.valid) {
      const announcement: Announcement = {
        ...this.form.value,
        id: this.id,
      };

      this.announcementService.updateAnnouncement(announcement).subscribe({
        next: (updatedAnnouncement: Announcement) => {
          alert('Anuncio modificado correctamente');
        },
        error: (error: any) => {
          console.error('Error al modificar anuncio:', error);
        },
        complete: () => {
          console.log('Actualización completada');
        }
      });

    } else {
      console.error('Formulario inválido');
    }
  }

  volver(){
    this.router.navigate(['/home']);
  }
}