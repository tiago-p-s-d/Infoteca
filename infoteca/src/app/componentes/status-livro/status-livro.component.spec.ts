import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLivroComponent } from './status-livro.component';

describe('StatusLivroComponent', () => {
  let component: StatusLivroComponent;
  let fixture: ComponentFixture<StatusLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
