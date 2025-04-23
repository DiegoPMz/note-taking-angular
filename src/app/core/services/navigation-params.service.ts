import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

export interface AppParams {
	note: string | null;
	search: string | null;
	tag: string | null;
	pgsearch: string | null;
	pgtag: string | null;
}

type NavigationParamsNames = Record<Uppercase<keyof AppParams>, string>;

@Injectable({
	providedIn: 'root',
})
export class NavigationParamsService {
	constructor(private route: ActivatedRoute) {}

	readonly NAVIGATION_PARAMS_NAMES: NavigationParamsNames = {
		NOTE: 'note',
		SEARCH: 'search',
		TAG: 'tag',
		PGSEARCH: 'pgsearch',
		PGTAG: 'pgtag',
	};

	private _navigationParams: Observable<AppParams> =
		this.route.queryParamMap.pipe(
			map(param => ({
				note: param.get('note'),
				search: param.get('search'),
				pgsearch: param.get('pgsearch'),
				tag: param.get('tag'),
				pgtag: param.get('pgtag'),
			}))
		);

	get getNavigationParams$(): Observable<AppParams> {
		return this._navigationParams;
	}
}
