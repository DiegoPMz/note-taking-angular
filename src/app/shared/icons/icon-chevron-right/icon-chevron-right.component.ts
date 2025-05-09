import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-chevron-right',
	templateUrl: './icon-chevron-right.component.html',
	standalone: true,
})
export class IconChevronRightComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '24px';
	@Input() height?: `${string}px` | undefined = '24px';
}
