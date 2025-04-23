import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
	isSmallScreen = false;
	private mediaQuery!: MediaQueryList;

	ngOnInit() {
		this.mediaQuery = window.matchMedia('(max-width: 1536px)');
		this.isSmallScreen = this.mediaQuery.matches;

		console.log(this.isSmallScreen);

		this.mediaQuery.addEventListener('change', this.handleScreenChange);
	}

	ngOnDestroy() {
		this.mediaQuery.removeEventListener('change', this.handleScreenChange);
	}

	handleScreenChange = (e: MediaQueryListEvent) => {
		this.isSmallScreen = e.matches;
	};
}
