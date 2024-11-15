import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
/*
interface data {
  id: number;
  name: string;
  date: string;
  location: string;
}
  */
export class LandingComponent implements OnInit{
  async getData () {
    try {
      const response = await fetch('https://gui230.jitdesigns.com/api/User');
      const data = await response.json();
      console.log(JSON.parse(data));
    } catch (error: any) { //cors issues
      console.error(error);
    }
  }
  ngOnInit(): void {
    this.getData(); 
  }
}
