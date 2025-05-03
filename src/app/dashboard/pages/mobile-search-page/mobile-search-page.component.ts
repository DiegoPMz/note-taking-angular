import { Component } from '@angular/core';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { map } from 'rxjs';

@Component({
	selector: 'app-mobile-search-page',
	templateUrl: './mobile-search-page.component.html',
})
export class MobileSearchPageComponent {
	constructor(private _dashboardService: DashboardService) {}

	searchQuery$ = this._dashboardService.searchQuery$;

	filteredNotesBySearchQuery$ =
		this._dashboardService.filteredNotesBySearchQuery$;

	invalidFilteredNotesSearchSection$ = this.filteredNotesBySearchQuery$.pipe(
		map(filteredNotes => {
			if (filteredNotes && filteredNotes.length < 1)
				return {
					hasError: true,
					errMessage:
						'No notes match your search. Try a different keyword or create a new note.',
				};

			return {
				hasError: false,
				errMessage: '',
			};
		})
	);
}
