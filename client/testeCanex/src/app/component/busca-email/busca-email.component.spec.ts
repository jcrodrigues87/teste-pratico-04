import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaEmailComponent } from './busca-email.component';

describe('BuscaEmailComponent', () => {
  let component: BuscaEmailComponent;
  let fixture: ComponentFixture<BuscaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
