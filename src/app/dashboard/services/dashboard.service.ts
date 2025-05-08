import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesWithTags } from '@app/core/services/supabase.service';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';

export interface DashboardParams {
	tagId: number | null;
	searchValue: string | null;
	noteId: number | null;
}

@Injectable({
	providedIn: 'platform',
})
export class DashboardService {
	constructor(private route: ActivatedRoute) {}

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
		{
			id: 9,
			title: 'Project Ideas1',
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
		{
			id: 10,
			title: 'Project Ideas2',
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

	selectedNoteId$ = this.route.queryParamMap.pipe(
		map(param => {
			const noteId = parseInt(param.get('note') ?? '');
			return isNaN(noteId) ? null : noteId;
		})
	);

	private _searchQuerySubject = new BehaviorSubject<string>('');
	searchQuery$ = this._searchQuerySubject.asObservable();

	setSearchQuery(searchInputValue: string) {
		this._searchQuerySubject.next(searchInputValue);
	}

	filteredNotesBySearchQuery$ = combineLatest([
		this.userNotes$,
		this.searchQuery$,
	]).pipe(
		map(([notes, query]) => {
			if (!query) return null;

			const regex = new RegExp(query, 'i');
			return notes.filter(
				n =>
					(n.title && regex.test(n.title)) ||
					(n.content && regex.test(n.content)) ||
					n.tags?.some(tag => regex.test(tag.name))
			);
		})
	);
}
