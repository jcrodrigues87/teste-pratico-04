import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCnpjComponent } from './busca-cnpj.component';

describe('BuscaCnpjComponent', () => {
  let component: BuscaCnpjComponent;
  let fixture: ComponentFixture<BuscaCnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaCnpjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaCnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
