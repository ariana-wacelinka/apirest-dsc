import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-drawer-list',
  standalone: true,
  imports: [MatIconModule,MatListModule, MatDividerModule],
  templateUrl: './drawer-list.component.html',
  styleUrl: './drawer-list.component.scss'
})

export class DrawerListComponent {
  constructor(private router: Router) {}
  appLinks = [
    { id: 1, name: 'Agenda', icon: 'calendar_today', link:'/admin/agenda'},
    { id: 2, name: 'Users',   icon: 'people', link:'/admin/users'},
    { id: 3, name: 'Sales',  icon: 'attach_money', link:'/admin/sales'},
    { id: 4, name: 'Ecomerce',  icon: 'shopping_cart', link:'/admin/ecommerce'},
    { id: 5, name: 'Routines', icon: 'fitness_center', link:'/admin/routines'},
  ];
  
}


