import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-tags-list-mobile',
	templateUrl: './tags-list-mobile.component.html',
})
export class TagsListMobileComponent {
	@Input({ required: true }) tags$!: Observable<
		{
			id: number;
			name: string;
		}[]
	>;
}
