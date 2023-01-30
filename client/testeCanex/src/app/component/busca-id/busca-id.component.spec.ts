import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaIdComponent } from './busca-id.component';

describe('BuscaIdComponent', () => {
  let component: BuscaIdComponent;
  let fixture: ComponentFixture<BuscaIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
