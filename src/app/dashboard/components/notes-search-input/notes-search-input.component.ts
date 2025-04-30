import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	Observable,
	Subject,
	takeUntil,
	tap,
} from 'rxjs';

@Component({
	selector: 'app-notes-search-input',
	templateUrl: './notes-search-input.component.html',
})
export class NotesSearchInputComponent implements OnInit, OnDestroy {
	constructor(
		private _router: Router,
		private _dashboardService: DashboardService
	) {}

	searchInputControl = new FormControl<string>('', {
		updateOn: 'change',
	});

	private _searchQuerySetter$ = this.searchInputControl.valueChanges.pipe(
		debounceTime(500),
		distinctUntilChanged(),
		tap(value => {
			const queryParams = {
				pgsearch: true,
				search: value ?? '',
			};

			this._router.navigate([''], {
				queryParams,
			});
		})
	);

	private _destroy$ = new Subject<void>();

	private _searchParam$: Observable<string> =
		this._dashboardService.dashboardParams$.pipe(
			map(param => param.search ?? '')
		);

	ngOnInit() {
		this._searchParam$.pipe(takeUntil(this._destroy$)).subscribe(val => {
			this.searchInputControl.setValue(val);
		});

		this._searchQuerySetter$.pipe(takeUntil(this._destroy$)).subscribe();
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
