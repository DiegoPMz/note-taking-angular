import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	@Input() tagCollection$?: Observable<{ name: string; id: number }[]>;
	@Input() selectedTag$?: Observable<{ name: string; id: number }>;

	trackByTagId(index: number, tag: { name: string; id: number }) {
		return tag.id;
	}
}
