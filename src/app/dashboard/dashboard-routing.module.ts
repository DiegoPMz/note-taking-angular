import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileTagsPageComponent } from './pages/mobile-tags-page/mobile-tags-page.component';
import { MobileTagDetailsPageComponent } from './pages/mobile-tag-details-page/mobile-tag-details-page.component';
import { MobileSearchPageComponent } from './pages/mobile-search-page/mobile-search-page.component';
import { MobileHomePageComponent } from './pages/mobile-home-page/mobile-home-page.component';

export const DASHBOARD_TITLE_PAGES = {
	HOME: 'homePage',
	SEARCH: 'searchPage',
	TAGS: 'tagsPage',
	TAG_DETAILS: 'tagDetailsPage',
} as const;

export type DashboardPageValues =
	(typeof DASHBOARD_TITLE_PAGES)[keyof typeof DASHBOARD_TITLE_PAGES];

const routes: Routes = [
	{
		path: '',
		component: MobileHomePageComponent,
		data: { currentPage: DASHBOARD_TITLE_PAGES.HOME },
	},
	{
		path: 'search',
		component: MobileSearchPageComponent,
		data: { currentPage: DASHBOARD_TITLE_PAGES.SEARCH },
	},
	{
		path: 'tags',
		component: MobileTagsPageComponent,
		data: { currentPage: DASHBOARD_TITLE_PAGES.TAGS },
	},
	{
		path: 'tags/:tagId',
		component: MobileTagDetailsPageComponent,
		data: { currentPage: DASHBOARD_TITLE_PAGES.TAG_DETAILS },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
