import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardPageValues } from '@app/dashboard/dashboard-routing.module';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import {
	combineLatest,
	distinctUntilChanged,
	map,
	Observable,
	switchMap,
	tap,
} from 'rxjs';

interface InvalidNotesError {
	hasError: boolean;
	errMessage: string;
}

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

	selectedTagParam$ = this._route.paramMap.pipe(
		map(params => {
			const parseTagId = parseInt(params.get('tagId') ?? '');
			return isNaN(parseTagId) ? null : parseTagId;
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

	currentPageData$ = this._route.data.pipe(
		map(data => data['currentPage'] as DashboardPageValues)
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

	notesToDisplayByRoute$ = combineLatest([
		this.currentPageData$,
		this.searchQuery$,
	]).pipe(
		switchMap(([routeData, searchQuery]) => {
			if (routeData === 'homePage') return this.userNotes$;
			if (routeData === 'searchPage') {
				return searchQuery ? this.filteredNotesBySearchQuery$ : this.userNotes$;
			}
			if (routeData === 'tagDetailsPage') return this.notesBySelectedTag$;
			return this.userNotes$;
		})
	);

	notesDisplayErrorState$: Observable<InvalidNotesError> = combineLatest([
		this.currentPageData$,
		this.notesToDisplayByRoute$,
	]).pipe(
		map(([currentPage, notesToDisplay]) => {
			const DEFAULT_RESPONSE: InvalidNotesError = {
				hasError: false,
				errMessage: '',
			};

			if (currentPage === 'homePage' || currentPage === 'tagsPage') {
				if (!notesToDisplay || notesToDisplay.length < 1)
					return {
						hasError: true,
						errMessage:
							'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.',
					};
			}

			if (currentPage === 'searchPage') {
				if (notesToDisplay && notesToDisplay.length < 1)
					return {
						hasError: true,
						errMessage:
							'No notes match your search. Try a different keyword or create a new note.',
					};
			}

			if (currentPage === 'tagDetailsPage') {
				if (!notesToDisplay || notesToDisplay.length < 1)
					return {
						hasError: true,
						errMessage:
							'No notes found for this tag. Try adding notes to this tag or selecting a different one.',
					};
			}

			return DEFAULT_RESPONSE;
		})
	);
}
