import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-header-control',
	templateUrl: './header-control.component.html',
})
export class HeaderControlComponent {
	constructor(private _location: Location) {}

	goBack() {
		this._location.back();
	}
}
