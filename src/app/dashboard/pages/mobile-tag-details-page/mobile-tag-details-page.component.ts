import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
	selector: 'app-mobile-tag-details-page',
	templateUrl: './mobile-tag-details-page.component.html',
})
export class MobileTagDetailsPageComponent {
	constructor(
		private route: ActivatedRoute,
		private _dashboardService: DashboardService
	) {}

	tagParamId$ = this.route.paramMap.pipe(
		map(params => {
			const tagId = params.get('tagId');
			if (!tagId || isNaN(Number(tagId))) return null;

			return Number(tagId);
		})
	);

	tagSelectedDetails$ = this._dashboardService.userTags$.pipe(
		switchMap(userTags =>
			this.tagParamId$.pipe(
				map(tagId => {
					return userTags.find(tag => tag.id === tagId) ?? null;
				})
			)
		)
	);

	notesBySelectedTag$ = combineLatest([
		this._dashboardService.userNotes$,
		this.tagSelectedDetails$,
	]).pipe(
		map(([notes, tagSelected]) => {
			const notesFiltered = notes.filter(note =>
				note.tags.some(tag => tag.id === tagSelected?.id)
			);

			if (!notesFiltered || notesFiltered.length < 1) return null;
			return notesFiltered;
		})
	);

	invalidNotesBySelectedTagError$ = this.notesBySelectedTag$.pipe(
		map(filteredNotes => {
			if (!filteredNotes || filteredNotes.length < 1)
				return {
					hasError: true,
					errMessage:
						'No notes found for this tag. Try adding notes to this tag or selecting a different one.',
				};

			return {
				hasError: false,
				errMessage: '',
			};
		})
	);
}
