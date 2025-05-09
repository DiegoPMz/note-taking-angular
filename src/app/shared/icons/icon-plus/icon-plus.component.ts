import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-plus',
	templateUrl: './icon-plus.component.html',
	standalone: true,
})
export class IconPlusComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '24px';
	@Input() height?: `${string}px` | undefined = '24px';
}
