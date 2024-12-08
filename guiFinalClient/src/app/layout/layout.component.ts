import { Component, Input } from '@angular/core';
import { LoggedInService } from '../logged-in.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(public loggedInService: LoggedInService) {
    console.log('logged in: ' + this.loggedInService.getLoggedIn());
    this.isLoggedIn = this.loggedInService.getLoggedIn();
   }
   isLoggedIn: boolean = false;

   
//this will house our layout
// so header and footer elements will be here
  @Input() title: string = '';
}
