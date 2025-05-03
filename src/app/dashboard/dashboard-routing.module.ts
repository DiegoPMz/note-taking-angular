import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MobileTagsPageComponent } from './pages/mobile-tags-page/mobile-tags-page.component';
import { MobileTagDetailsPageComponent } from './pages/mobile-tag-details-page/mobile-tag-details-page.component';
import { MobileSearchPageComponent } from './pages/mobile-search-page/mobile-search-page.component';
import { MobileNoteDetailsComponent } from './pages/mobile-note-details/mobile-note-details.component';
import { MobileHomePageComponent } from './pages/mobile-home-page/mobile-home-page.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				component: MobileHomePageComponent,
			},
			{
				path: 'note/:noteId',
				component: MobileNoteDetailsComponent,
			},
			{
				path: 'search',
				component: MobileSearchPageComponent,
			},
			{
				path: 'tags',
				component: MobileTagsPageComponent,
			},
			{
				path: 'tags/:tagId',
				component: MobileTagDetailsPageComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
