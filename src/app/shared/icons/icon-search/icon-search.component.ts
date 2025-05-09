import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-search',
	templateUrl: './icon-search.component.html',
	standalone: true,
})
export class IconSearchComponent implements IconSizeAttributes {
	@Input() height?: `${string}px` | undefined = '20px';
	@Input() width?: `${string}px` | undefined = '20px';
}
