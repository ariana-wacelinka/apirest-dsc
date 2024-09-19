import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar';
import { DrawerComponent } from './drawer/drawer.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, DrawerComponent, CreateAnnouncementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
