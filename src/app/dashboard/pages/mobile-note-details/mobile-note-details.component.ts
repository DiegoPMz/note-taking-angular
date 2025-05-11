import { Component } from '@angular/core';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { combineLatest, map } from 'rxjs';

@Component({
	selector: 'app-mobile-note-details',
	templateUrl: './mobile-note-details.component.html',
})
export class MobileNoteDetailsComponent {
	constructor(private _dashboardService: DashboardService) {}

	selectedNote$ = combineLatest([
		this._dashboardService.userNotes$,
		this._dashboardService.selectedNoteId$,
	]).pipe(
		map(([notes, noteId]) => {
			return notes.find(note => note.id === noteId) ?? null;
		})
	);
}
