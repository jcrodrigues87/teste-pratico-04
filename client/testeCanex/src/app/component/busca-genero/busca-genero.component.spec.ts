import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaGeneroComponent } from './busca-genero.component';

describe('BuscaGeneroComponent', () => {
  let component: BuscaGeneroComponent;
  let fixture: ComponentFixture<BuscaGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
