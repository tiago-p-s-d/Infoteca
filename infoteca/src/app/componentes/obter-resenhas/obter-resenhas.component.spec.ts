import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObterResenhasComponent } from './obter-resenhas.component';

describe('ObterResenhasComponent', () => {
  let component: ObterResenhasComponent;
  let fixture: ComponentFixture<ObterResenhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObterResenhasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObterResenhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
