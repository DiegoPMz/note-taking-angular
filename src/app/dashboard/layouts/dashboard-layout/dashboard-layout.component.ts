import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardPageValues } from '@app/dashboard/dashboard-routing.module';
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
	constructor(
		private _dashboardService: DashboardService,
		private _route: ActivatedRoute
	) {}

	userTags$ = this._dashboardService.userTags$;

	shouldDisplayNoteDetails$ = combineLatest([
		this._route.data,
		this._dashboardService.selectedNoteId$,
	]).pipe(
		distinctUntilChanged((prev, curr) => prev[1] === curr[1]),
		map(([routeData, selectedNote]) => {
			if (!selectedNote) return false;

			const currentPage = routeData['currentPage'] as DashboardPageValues;
			if (currentPage === 'tagsPage') return false;
			return true;
		})
	);
}
