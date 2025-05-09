import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-logo',
	templateUrl: './icon-logo.component.html',
	standalone: true,
})
export class IconLogoComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '95px';
	@Input() height?: `${string}px` | undefined = '28px';
}
