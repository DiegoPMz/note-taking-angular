import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	NotesWithTags,
	SingleNoteWithTags,
} from '@app/core/services/supabase.service';
import {
	combineLatest,
	distinctUntilChanged,
	map,
	Observable,
	of,
	switchMap,
	tap,
} from 'rxjs';

export interface dashboardParams {
	note: string | null;
	search: string | null;
	pgsearch: string | null;
	tag: string | null;
	pgtag: string | null;
}

@Injectable({
	providedIn: 'platform',
})
export class DashboardService {
	constructor(private route: ActivatedRoute) {}

	TITLES_NAMES = {
		TAGS: 'Tags',
		SEARCH: 'Search',
		ALL_NOTES: 'All notes',
	} as const;

	dashboardParams$: Observable<dashboardParams> = this.route.queryParamMap.pipe(
		map(param => ({
			note: param.get('note'),
			search: param.get('search'),
			pgsearch: param.get('pgsearch'),
			tag: param.get('tag'),
			pgtag: param.get('pgtag'),
		}))
	);

	userNotes$: Observable<NotesWithTags> = of([
		{
			id: 1,
			title: 'Meeting Notes',
			content: 'Discuss project milestones and deadlines.',
			tags: [
				{ id: 1, name: 'Work' },
				{ id: 2, name: 'Personal' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 2,
			title: 'Grocery List',
			content: 'Milk, Bread, Eggs, Butter.',
			tags: [
				{ id: 3, name: 'Shopping' },
				{ id: 2, name: 'Personal' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 3,
			title: 'Workout Plan',
			content: 'Monday: Chest, Tuesday: Back, Wednesday: Legs.',
			tags: [
				{ id: 4, name: 'Fitness' },
				{ id: 2, name: 'Personal' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 4,
			title: 'Vacation Ideas',
			content: 'Visit Bali, Explore Iceland, Road trip in New Zealand.',
			tags: [
				{ id: 5, name: 'Travel' },
				{ id: 2, name: 'Personal' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 5,
			title: 'Personal Journal',
			content: 'Reflections on the day.',
			tags: [{ id: 2, name: 'Personal' }],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 6,
			title: 'Team Lunch Ideas',
			content: 'Italian, Mexican, Sushi, Burgers.',
			tags: [
				{ id: 1, name: 'Work' },
				{ id: 3, name: 'Shopping' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 7,
			title: 'Weekend Plans',
			content: 'Hiking, Movie night, Dinner with friends.',
			tags: [
				{ id: 2, name: 'Personal' },
				{ id: 5, name: 'Travel' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
		{
			id: 8,
			title: 'Project Ideas',
			content: 'Build a mobile app, Create a blog, Start a podcast.',
			tags: [
				{ id: 1, name: 'Work' },
				{ id: 4, name: 'Fitness' },
			],
			archived: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'user1',
		},
	]);

	userTags$ = of([
		{ id: 1, name: 'Work' },
		{ id: 2, name: 'Personal' },
		{ id: 3, name: 'Shopping' },
		{ id: 4, name: 'Fitness' },
		{ id: 5, name: 'Travel' },
		{ id: 6, name: 'Health' },
		{ id: 7, name: 'Education' },
	]);

	currentNote$: Observable<SingleNoteWithTags | null> = combineLatest([
		this.userNotes$,
		this.dashboardParams$,
	]).pipe(
		distinctUntilChanged((prev, current) => prev[1].tag !== current[1].tag),
		map(([notes, params]) => {
			if (!params.note || !notes) return null;
			return notes.find(note => note.id === Number(params.note)) ?? null;
		})
	);

	dashboardTitle$: Observable<string> = this.dashboardParams$.pipe(
		map(params => {
			const TITLES = {
				TAGS: 'Tags',
				SEARCH: 'Search',
				ALL_NOTES: 'All notes',
			};

			if (params.pgtag || params.tag) return TITLES.TAGS;
			if (params.pgsearch || params.search) return TITLES.SEARCH;
			return TITLES.ALL_NOTES;
		}),
		tap(val => console.log(val))
	);

	filteredNotesBySelectedTag$ = this.userNotes$.pipe(
		switchMap(notes =>
			this.tagSelected$.pipe(
				map(selectedTag => {
					if (notes.length === 0) return null;

					const filteredNotes = notes.filter(note =>
						note.tags.some(tag => tag.name === selectedTag)
					);
					return filteredNotes.length > 0 ? filteredNotes : null;
				})
			)
		)
	);

	tagSelected$ = this.dashboardParams$.pipe(map(param => param.tag));

	get tagParam(): Observable<string | null> {
		return this.dashboardParams$.pipe(
			map(param => (param.search ? null : param.tag))
		);
	}

	filteredNotesBySearch$ = this.userNotes$.pipe(
		switchMap(notes =>
			this.dashboardParams$.pipe(
				map(param => {
					const searchValue = param.search;
					if (!searchValue) return null;

					const searchRegex = new RegExp(searchValue, 'i');

					return notes.filter(note => {
						if (note.title && searchRegex.test(note.title)) return note;
						if (note.content && searchRegex.test(note.content)) return note;
						if (note.tags.some(tag => searchRegex.test(tag.name))) return note;
						return;
					});
				})
			)
		)
	);
}
