import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaNascimentoComponent } from './busca-nascimento.component';

describe('BuscaNascimentoComponent', () => {
  let component: BuscaNascimentoComponent;
  let fixture: ComponentFixture<BuscaNascimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaNascimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaNascimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
