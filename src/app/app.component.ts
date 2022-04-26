import { Component, OnInit, isDevMode, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'BuyOldGames';
	logoSrc: string | null = null;
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	
	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 768px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}
	
	ngOnInit(): void {
		
		if (isDevMode()) {
			this.logoSrc = '../assets/logo.jpg';
		} else {
			this.logoSrc = './assets/logo.jpg';
		}
		
	}
	
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
