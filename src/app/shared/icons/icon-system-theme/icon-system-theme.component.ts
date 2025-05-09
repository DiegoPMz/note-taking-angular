import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-system-theme',
	templateUrl: './icon-system-theme.component.html',
	standalone: true,
})
export class IconSystemThemeComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '24px';
	@Input() height?: `${string}px` | undefined = '24px';
}
