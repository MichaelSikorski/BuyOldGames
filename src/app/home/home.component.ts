import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	image1src;
	image2src;

	constructor() { 
		if (isDevMode()) {	// Application run locally with ng serve
		
			this.image1src = "../assets/home_fantasy.jpg";
			this.image2src = "../assets/home_scifi.jpg";
			
		} else {	// Application running on Github Pages
		
			this.image1src = "assets/home_fantasy.jpg";
			this.image2src = "assets/home_scifi.jpg";
		}
	}

	ngOnInit(): void {
	}

}
