import { Component } from '@angular/core';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { map } from 'rxjs';

@Component({
	selector: 'app-mobile-home-page',
	templateUrl: './mobile-home-page.component.html',
})
export class MobileHomePageComponent {
	constructor(private _dashboardService: DashboardService) {}

	userNotes$ = this._dashboardService.userNotes$;

	invalidNotesAllNotesSection = this.userNotes$.pipe(
		map(notes => {
			if (!notes || notes.length < 1)
				return {
					hasError: true,
					errMessage:
						'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.',
				};
			return {
				hasError: false,
				errMessage: '',
			};
		})
	);
}
