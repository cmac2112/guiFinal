import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{
  async getData () {
    try {
      const response = await fetch('http://localhost:5193/events');
      const data = await response.json();
      console.log(data);
    } catch (error: any) { //cors issues
      console.error(error);
    }
  }
  ngOnInit(): void {
    this.getData(); 
  }
}
