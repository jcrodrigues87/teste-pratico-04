import { ClienteService } from './service/cliente.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testeEddyData';

  constructor(private service: ClienteService){}

}
