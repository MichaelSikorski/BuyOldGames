import { Component, OnInit, isDevMode, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { CrudService } from './crud.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'BuyOldGames';

	constructor(cart: CartService, crud: CrudService) {
		
	}
	
	ngOnInit(): void {
			
	}
	
	ngOnDestroy(): void {
		
	}
}
