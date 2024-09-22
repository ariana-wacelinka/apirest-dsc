import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Announcement {
  id: any;
  title: string;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    private apiUrl = 'http://localhost:1337/announcements';

  constructor(private http: HttpClient) { }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }

  getAnnouncementById(id: string): Observable<Announcement> {
    return this.http.get<Announcement>(`${this.apiUrl}/${id}`);
  }

  createAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, announcement);
  }

  deleteAnnouncement(id: number): Observable<any> {
    const options = {body: { id }};
    return this.http.delete(`${this.apiUrl}`, options);
  }

  updateAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.put<Announcement>(`${this.apiUrl}/${announcement.id}`, announcement);
  }
}
