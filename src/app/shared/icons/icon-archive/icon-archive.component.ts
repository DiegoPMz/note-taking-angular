import { Component, Input } from '@angular/core';
import { IconSizeAttributes } from '../types/icon-size-attributes.interface';

@Component({
	selector: 'app-icon-archive',
	templateUrl: './icon-archive.component.html',
	standalone: true,
})
export class IconArchiveComponent implements IconSizeAttributes {
	@Input() width?: `${string}px` | undefined = '20px';
	@Input() height?: `${string}px` | undefined = '20px';
}
