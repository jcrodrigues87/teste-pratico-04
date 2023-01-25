import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoBuscaComponent } from './metodo-busca.component';

describe('MetodoBuscaComponent', () => {
  let component: MetodoBuscaComponent;
  let fixture: ComponentFixture<MetodoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoBuscaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
