import { Component, OnInit, isDevMode } from '@angular/core';
import { CartService } from '../cart.service';
import { Game } from '../models/Game';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
	
	emptyCartSrc: String = "";

  constructor(private cart: CartService) { 
  
	if (isDevMode()) {	// Application run locally with ng serve
		this.emptyCartSrc = "../../assets/empty_cart.png";	
	} else {	// Application running on Github Pages
		this.emptyCartSrc = "assets/empty_cart.png";
	}
  
  }

  ngOnInit(): void {
	
  }
  
  getCartSize() {
	return this.cart.getCartSize();
  }
  
  getCartItems(): Game[] {
	  return this.cart.getItemsInCart();
  }
  
  removeFromCart(game: Game) {
	  this.cart.removeFromCart(game);
  }
  
  getSubtotal(): number {
	  let subtotal = 0;
	  
	  for (let item of this.cart.getItemsInCart()) {
		  subtotal += Number(item.price);
	  }
	  
	  return subtotal;
  }
  
  boxArt(game: any): String {
		if (!game.src) {
			
			let srcUrl = "";
			if (isDevMode()) {	// Application run locally with ng serve
				srcUrl = "../../../assets/game_imgs/";	
			} else {	// Application running on Github Pages
				srcUrl = "assets/game_imgs/";
			}
			srcUrl += game._id + ".jpg";	// Image files names are the same as the game's ID in the database
			
			return srcUrl;
		}
		
		return "";
	}

}
