import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementUpdateComponent } from './announcementUpdate.component';

describe('AnnouncementUpdateComponent', () => {
  let component: AnnouncementUpdateComponent;
  let fixture: ComponentFixture<AnnouncementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
