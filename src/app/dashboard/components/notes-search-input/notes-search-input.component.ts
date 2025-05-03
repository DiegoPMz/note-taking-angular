import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import {
	debounceTime,
	distinctUntilChanged,
	Subject,
	takeUntil,
	tap,
} from 'rxjs';

@Component({
	selector: 'app-notes-search-input',
	templateUrl: './notes-search-input.component.html',
})
export class NotesSearchInputComponent implements OnInit, OnDestroy {
	constructor(private _dashboardService: DashboardService) {}

	private _destroy$ = new Subject<void>();

	searchInputControl = new FormControl<string>('', {
		updateOn: 'change',
	});

	private _searchQuerySetter$ = this.searchInputControl.valueChanges.pipe(
		debounceTime(500),
		distinctUntilChanged(),
		tap(value => this._dashboardService.setSearchQuery(value ?? ''))
	);

	ngOnInit() {
		this._dashboardService.searchQuery$
			.pipe(takeUntil(this._destroy$))
			.subscribe(value =>
				this.searchInputControl.setValue(value ?? '', { emitEvent: false })
			);

		this._searchQuerySetter$.pipe(takeUntil(this._destroy$)).subscribe();
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
