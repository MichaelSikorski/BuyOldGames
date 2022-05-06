import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CrudService } from '../crud.service';
import { CartService } from '../cart.service';
import { Game } from '../models/Game';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
	
	sortType = "";
	filter: string | null = "all";
	browseHeading: string | null = null;
	showAddtoCart: boolean = false;
	showGameDetailsModal: boolean = false;
	focusedGame: Game | null = null;
	
	listOfGames:any = null;
	firstLetters:Array<String> | null = null;
	listOfPlatforms:Array<String> | null = null;
	listOfGenres:Array<String> | null = null;
	listOfDates:Array<Date> | null = null;

	constructor(private route: ActivatedRoute, private crudService: CrudService, private cart: CartService) { 
		this.route.queryParams.subscribe(params => {
			this.sortType = params['by'];
			if (!this.listOfGames) {
				this.getListOfGames();
				this.sortTitles(this.sortType);
			} else {
				this.sortTitles(this.sortType);
				if (this.filter == 'all') {
					this.browseHeading = "Showing all titles sorted by " + this.sortType + (this.sortType == 'release'? " date": "");
				}
			}
		});
		
		this.route.fragment.subscribe(fragments => {
			if (fragments) {
				this.filter = fragments;
				if (this.filter == 'all') {
					this.browseHeading = "Showing all titles sorted by " + this.sortType + (this.sortType == 'release'? " date": "");
					//this.browseHeading = "";
				} else {
					if (this.sortType == 'name') {
						this.browseHeading = "Showing titles starting with the letter " + this.filter;
					} else if (this.sortType == 'platform') {
						this.browseHeading = "Showing titles for the " + this.filter + " platform";
					} else if (this.sortType == 'genre') {
						this.browseHeading = "Showing titles in the " + this.filter + " genre";
					} else if (this.sortType == 'release') {
						this.browseHeading = "Showing titles released in the year " + this.filter.substring(0,4);
					} else if (this.sortType == 'search') {
						this.browseHeading = "Showing search results for " + this.filter;						
					} 
				}

			} else {
				this.filter = "all";
				this.browseHeading = "Showing all titles sorted by " + this.sortType + (this.sortType == 'release'? " date": "");
			}
		});
	}

	ngOnInit(): void {
		
	}
	
	getListOfGames(): void {		
		this.listOfGames = this.crudService.getListOfGames();
	}
	
	filterTitles(x: any): boolean {

		if (this.filter == 'all') {
			return false;
		} else {
			if (this.sortType == 'release') {
				if (x.substring(0,4) == this.filter) {
					return false;
				}

				return true;

			} else {
				if (x == this.filter) {
					return false;
				}

				return true;
			}

		}

		return true;
	}

	sortTitles(by: string): void {

		if (by == 'name') {
			this.listOfGames.sort((a?: Game,b?: Game) => {
				if (!a || !b) {
					return 0;
				} else {
					if (a!.title! < b!.title!) {
						return -1;
					} else if (a!.title! > b!.title!) {
						return 1;
					}
					return 0;
				}
			});

			if (!this.firstLetters) {
				this.firstLetters = new Array<String>();
				for (let game of this.listOfGames) {
					if (!this.firstLetters.includes(game.title.charAt(0))) {
						this.firstLetters.push(game.title.charAt(0));
					}
				}
			}

		} else if (by == 'platform') {
			this.listOfGames.sort((a?: Game,b?: Game) => {
				if (!a || !b) {
					return 0;
				} else {
					if (a!.platform! < b!.platform!) {
						return -1;
					} else if (a!.platform! > b!.platform!) {
						return 1;
					}
					return 0;
				}
			});

			if (!this.listOfPlatforms) {
				this.listOfPlatforms = new Array<String>();
				for (let game of this.listOfGames) {
					if (!this.listOfPlatforms.includes(game.platform)) {
						this.listOfPlatforms.push(game.platform);
					}
				}
			}
		} else if (by == 'genre') {
			this.listOfGames.sort((a?: Game,b?: Game) => {
				if (!a || !b) {
					return 0;
				} else {
					if (a!.genre! < b!.genre!) {
						return -1;
					} else if (a!.genre! > b!.genre!) {
						return 1;
					}
					return 0;
				}
			});

			if (!this.listOfGenres) {
				this.listOfGenres = new Array<String>();
				for (let game of this.listOfGames) {
					if (!this.listOfGenres.includes(game.genre)) {
						this.listOfGenres.push(game.genre);
					}
				}
			}
		} else if (by == 'release') {
			this.listOfGames.sort((a?: Game,b?: Game) => {
				if (!a || !b) {
					return 0;
				} else {
					if (a!.release! < b!.release!) {
						return -1;
					} else if (a!.release! > b!.release!) {
						return 1;
					}
					return 0;
				}
			});

			if (!this.listOfDates) {
				this.listOfDates = new Array<Date>();
				for (let game of this.listOfGames) {
					if (!this.listOfDates.includes(game.release)) {
						this.listOfDates.push(game.release);
					}
				}
			}
		}

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
	
	focusedBoxArt(): String {
		if (this.focusedGame == null) {
			return "";
		} else {
			let srcUrl = "";
			if (isDevMode()) {	// Application run locally with ng serve
				srcUrl = "../../../assets/game_imgs/";	
			} else {	// Application running on Github Pages
				srcUrl = "assets/game_imgs/";
			}
			srcUrl += this.focusedGame._id + ".jpg";	// Image files names are the same as the game's ID in the database
			
			return srcUrl;
		}
	}
	
	addToCart(game: Game): void {
		this.cart.addToCart(game);		
	}
	
	addToCartFromModal(game: Game): void {
		this.cart.addToCart(game);
		this.showGameDetailsModal = false;
	}
	
	cartContainsGame(game: Game): boolean {
		return this.cart.containsGame(game);
	}
	
	isInStock(game: Game): boolean {
		
		let inStock = false;
		for (let i=0; i<this.listOfGames.length; i++) {
			if (this.listOfGames[i]._id == game._id) {
				if (this.listOfGames[i].stock > 0) {				
					return true;
				}
			}
		}
		
		return inStock;
		
	}
	
	removeFromCart(game: Game): void {
		this.cart.removeFromCart(game);
	}
	
	removeFromCartFromModal(game: Game): void {
		this.cart.removeFromCart(game);
		this.showGameDetailsModal = false;
	}
	
	searchTitles(game: Game): boolean {	// Search for games matching the search string by title, platform, or genre
		
		if (game!.title!.toLowerCase().includes(this.filter!.toLowerCase())) {
			return true;
		}
		
		if (game!.platform!.toLowerCase().includes(this.filter!.toLowerCase())) {
			return true;
		}
		
		if (game!.genre!.toLowerCase().includes(this.filter!.toLowerCase())) {
			return true;
		}
		
		return false;
	}
	
	toggleGameDetailsModal(game: Game) {
		this.showGameDetailsModal = !this.showGameDetailsModal;
		this.focusedGame = game;
	}
	
	hideModal() {
		this.showGameDetailsModal = false;
	}
}
