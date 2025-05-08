import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	DASHBOARD_TITLE_PAGES,
	DashboardPageValues,
} from '@app/dashboard/dashboard-routing.module';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import {
	combineLatest,
	distinctUntilChanged,
	map,
	Observable,
	tap,
} from 'rxjs';

@Component({
	selector: 'app-desktop-dashboard-view',
	templateUrl: './desktop-dashboard-view.component.html',
})
export class DesktopDashboardViewComponent {
	constructor(
		private _dashboardService: DashboardService,
		private _route: ActivatedRoute
	) {}
	userNotes$ = this._dashboardService.userNotes$;
	searchQuery$ = this._dashboardService.searchQuery$;
	userTags$ = this._dashboardService.userTags$;

	filteredNotesBySearchQuery$ =
		this._dashboardService.filteredNotesBySearchQuery$;

	DASHBOARD_ROUTE_DATA = DASHBOARD_TITLE_PAGES;

	invalidNotesAllNotesError$ = this.userNotes$.pipe(
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

	selectedTagParam$ = this._route.paramMap.pipe(
		map(params => {
			const parseTagId = parseInt(params.get('tagId') ?? '');
			return isNaN(parseTagId) ? null : parseTagId;
		})
	);

	selectedNote$ = combineLatest([
		this._dashboardService.selectedNoteId$,
		this.userNotes$,
	]).pipe(
		distinctUntilChanged((prev, curr) => prev[0] === curr[0]),
		map(([noteId, userNotes]) => {
			if (!noteId) return null;
			return userNotes.find(n => n.id === noteId) ?? null;
		})
	);

	selectedTag$ = combineLatest([this.selectedTagParam$, this.userTags$]).pipe(
		distinctUntilChanged((prev, curr) => prev[0] === curr[0]),
		map(([tagId, userTags]) => {
			if (!tagId) return null;
			return userTags.find(n => n.id === tagId) ?? null;
		})
	);

	notesBySelectedTag$ = combineLatest([
		this.userNotes$,
		this.selectedTag$,
	]).pipe(
		map(([notes, tagSelected]) => {
			if (!tagSelected) return null;

			const notesFiltered = notes.filter(note =>
				note.tags.some(tag => tag.id === tagSelected?.id)
			);

			if (notesFiltered.length < 1) return null;
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

	invalidNotesBySearchError$ = this.filteredNotesBySearchQuery$.pipe(
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

	activeRouteData$ = this._route.data.pipe(
		map(data => data['currentPage'] as DashboardPageValues)
	);

	shouldDisplaySearchContent$ = combineLatest([
		this.searchQuery$,
		this.activeRouteData$,
	]).pipe(
		map(([searchQuery, routeData]) => {
			return !!searchQuery && routeData === 'searchPage';
		})
	);

	currentPageTitle$: Observable<string> = combineLatest([
		this._route.data,
		this.searchQuery$,
		this.selectedTag$,
	]).pipe(
		map(([routeData, searchQuery, selectedTag]) => {
			const currentPageKey = routeData['currentPage'] as DashboardPageValues;

			if (
				currentPageKey === 'tagDetailsPage' ||
				currentPageKey === 'searchPage'
			) {
				const titleResponse = {
					tagDetailsPage: selectedTag?.name
						? `Notes Tagged: ${selectedTag.name}`
						: 'Untitled Tag',
					searchPage: searchQuery
						? `Showing results for: ${searchQuery}`
						: 'All notes',
				};

				return titleResponse[currentPageKey];
			}

			return 'All notes';
		}),
		tap(val => console.log('current-tile:', val))
	);
}
