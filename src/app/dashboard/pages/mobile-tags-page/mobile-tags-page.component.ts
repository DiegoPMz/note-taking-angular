import { Component } from '@angular/core';
import { DashboardService } from '@app/dashboard/services/dashboard.service';

@Component({
	selector: 'app-mobile-tags-page',
	templateUrl: './mobile-tags-page.component.html',
})
export class MobileTagsPageComponent {
	constructor(private _dashboardService: DashboardService) {}

	userTags$ = this._dashboardService.userTags$;
}
