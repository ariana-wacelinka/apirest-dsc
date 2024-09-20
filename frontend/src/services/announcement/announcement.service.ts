import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {private apiUrl = 'http://localhost:1337/announcements';

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post(this.apiUrl, announcement);
  }

  existsAnnouncement(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
