import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	tagCollection: object[] = [
		{ name: 'Tag' },
		{ name: 'Tag' },
		{ name: 'Tag' },
		{ name: 'Tag' },
	];
}
