import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-info',
	templateUrl: './icon-info.component.html',
})
export class IconInfoComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '24px';
	@Input() height?: `${string}px` | undefined = '24px';
}
