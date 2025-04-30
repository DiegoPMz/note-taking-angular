import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { map, Observable, tap } from 'rxjs';

@Component({
	selector: 'app-dashboard-mobile',
	templateUrl: './dashboard-mobile.component.html',
})
export class DashboardMobileComponent {
	constructor(
		private _dashboardService: DashboardService,
		private _location: Location
	) {}

	TITLES_NAMES = this._dashboardService.TITLES_NAMES;
	dashboardTitle$: Observable<string> = this._dashboardService.dashboardTitle$;

	filteredNotesBySelectedTag$ =
		this._dashboardService.filteredNotesBySelectedTag$;

	userTags$ = this._dashboardService.userTags$;
	tagSelected$ = this._dashboardService.tagParam;

	dashboardParams$ = this._dashboardService.dashboardParams$;

	isTagDetailsPageVisible$ = this._dashboardService.dashboardParams$.pipe(
		map(params => {
			return params.pgtag && params.tag;
		})
	);

	PAGES_TO_DISPLAY = {
		DEFAULT_PAGE: 'default_page',
		NOTE_PAGE: 'note_page',
		TAG_PAGE: 'tag_page',
		SEARCH_PAGE: 'search_page',
	} as const;

	userNotes$ = this._dashboardService.userNotes$;
	noteSelected$ = this._dashboardService.currentNote$;

	searchParam$ = this._dashboardService.dashboardParams$.pipe(
		map(param => param.search)
	);

	filteredNotesBySearch$ = this._dashboardService.filteredNotesBySearch$.pipe(
		tap(val => console.log('search-value:', val))
	);

	private DEFAULT_ERROR_RESPONSE = {
		hasError: false,
		errMessage: '',
	} as const;

	invalidNotesAllNotesSection = this.userNotes$.pipe(
		map(notes => {
			if (!notes || notes.length < 1)
				return {
					hasError: true,
					errMessage:
						'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.',
				};
			return this.DEFAULT_ERROR_RESPONSE;
		})
	);

	invalidFilteredNotesSearchSection = this.filteredNotesBySearch$.pipe(
		map(filteredNotes => {
			if (filteredNotes && filteredNotes.length < 1)
				return {
					hasError: true,
					errMessage:
						'No notes match your search. Try a different keyword or create a new note.',
				};

			return this.DEFAULT_ERROR_RESPONSE;
		})
	);

	pageToDisplay = this._dashboardService.dashboardParams$.pipe(
		map(params => {
			const isSearchParamDefined =
				params.search !== null || params.search !== undefined;

			if (params.note) return this.PAGES_TO_DISPLAY.NOTE_PAGE;
			if (params.pgtag && params.tag) return this.PAGES_TO_DISPLAY.TAG_PAGE;
			if (params.pgsearch && isSearchParamDefined)
				return this.PAGES_TO_DISPLAY.SEARCH_PAGE;
			return this.PAGES_TO_DISPLAY.DEFAULT_PAGE;
		})
	);

	goBack() {
		this._location.back();
	}
}
