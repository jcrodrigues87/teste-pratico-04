import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaRazaoComponent } from './busca-razao.component';

describe('BuscaRazaoComponent', () => {
  let component: BuscaRazaoComponent;
  let fixture: ComponentFixture<BuscaRazaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaRazaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaRazaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
