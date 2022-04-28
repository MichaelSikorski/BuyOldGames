import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { Game } from './models/Game';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {	// Shopping cart service for "Buy Old Games" project
	
	private itemsInCart: Game[] = [];

	cartUpdated = new Subject<any>();

	constructor() {

	}
	
	addToCart(game: Game) {
		this.itemsInCart.push(game);
		this.cartUpdated.next(this.itemsInCart);
	}
	
	getItemsInCart(): Game[] {
		return this.itemsInCart;
	}
	
	getCartSize() {
		return this.itemsInCart.length;	
	}
	
	clearCart(): void {
		this.itemsInCart = [];
		this.cartUpdated.next(this.itemsInCart);
	}
	
	containsGame(game: Game): boolean {
		let contains = false;
		for (let item of this.itemsInCart) {
			if (game?._id == item?._id) {
				return true;
			}
		}
		
		return contains;
	}
	
	removeFromCart(game: Game): void {
		let indexOfGame = this.itemsInCart.indexOf(game);	
		this.itemsInCart.splice(indexOfGame, 1);
		this.cartUpdated.next(this.itemsInCart);
	}
	
	
	ngOnDestroy() {
		console.log("Cart service destroyed");
	}
	
}
