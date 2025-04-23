import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	AppParams,
	NavigationParamsService,
} from '@app/core/services/navigation-params.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-bottom-navigation',
	templateUrl: './bottom-navigation.component.html',
})
export class BottomNavigationComponent implements OnInit, OnDestroy {
	constructor(private _appNavigationParams: NavigationParamsService) {}

	private destroy$ = new Subject<void>();
	appNavigationParams: AppParams | null = null;

	get areEmptyParams() {
		if (!this.appNavigationParams) return true;
		return Object.values(this.appNavigationParams).every(param => !param);
	}

	ngOnInit(): void {
		this._appNavigationParams.getNavigationParams$
			.pipe(takeUntil(this.destroy$))
			.subscribe(val => {
				this.appNavigationParams = val;
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
