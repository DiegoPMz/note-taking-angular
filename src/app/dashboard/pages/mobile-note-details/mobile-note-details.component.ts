import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { combineLatest, map } from 'rxjs';

@Component({
	selector: 'app-mobile-note-details',
	templateUrl: './mobile-note-details.component.html',
})
export class MobileNoteDetailsComponent {
	constructor(
		private _dashboardService: DashboardService,
		private route: ActivatedRoute
	) {}

	paramNoteId$ = this.route.paramMap.pipe(
		map(params => {
			const noteId = params.get('noteId');
			if (!noteId || isNaN(parseInt(noteId))) return null;
			return parseInt(noteId);
		})
	);

	noteSelected$ = combineLatest([
		this._dashboardService.userNotes$,
		this.paramNoteId$,
	]).pipe(
		map(([notes, noteId]) => {
			return notes.find(note => note.id === noteId) ?? null;
		})
	);
}
