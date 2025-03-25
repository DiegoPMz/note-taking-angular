import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.template.html',
})
export class HeaderComponent {
	@Input() headerTitle = 'Default Header Title';
}
