import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarStatusComponent } from './adicionar-status.component';

describe('AdicionarStatusComponent', () => {
  let component: AdicionarStatusComponent;
  let fixture: ComponentFixture<AdicionarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
