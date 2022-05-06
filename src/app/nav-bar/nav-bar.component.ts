import { Component, OnInit, OnDestroy, isDevMode, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { CartService } from '../cart.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

	title = 'BuyOldGames';
	itemsInCart = 0;
	logoSrc: string | null = null;
	cartSrc: string | null = null;
	
	constructor(private router: Router, private cart: CartService, private crud: CrudService) {
		
	}
	
	ngOnInit(): void {
		
		if (isDevMode()) {
			this.logoSrc = '../assets/logo.jpg';
			this.cartSrc = '../assets/cart.jpg';
		} else {
			this.logoSrc = './assets/logo.jpg';
			this.cartSrc = './assets/cart.jpg';
		}
		
		this.cart.cartUpdated.subscribe((res: any) => {
			this.itemsInCart = res.length;
		});
	}
	
	ngOnDestroy(): void {
		
	}
	
	onSubmit(f: NgForm) {
		this.router.navigateByUrl('/browse?by=search#' + f.value.searchstring);
		f.resetForm();
	}

}
