import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-show-password',
	templateUrl: './icon-show-password.component.html',
	standalone: true,
})
export class IconShowPasswordComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '24px';
	@Input() height?: `${string}px` | undefined = '24px';
}
