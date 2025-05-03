import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '@app/shared/sidebar/sidebar.module';
import { HeaderModule } from '@app/shared/header/header.module';
import { HeaderControlModule } from '@app/shared/header-control/header-control.module';
import { SidebarNotesModule } from '@app/shared/sidebar-notes/sidebar-notes.module';
import { SidebarActionsComponent } from './components/sidebar-actions/sidebar-actions.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { BottomNavigationModule } from '@app/shared/bottom-navigation/bottom-navigation.module';
import { DashboardService } from './services/dashboard.service';
import { TagsListMobileComponent } from './components/tags-list-mobile/tags-list-mobile.component';
import { SectionPageMobileComponent } from './components/section-page-mobile/section-page-mobile.component';
import { NotesSearchInputComponent } from './components/notes-search-input/notes-search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileTagsPageComponent } from './pages/mobile-tags-page/mobile-tags-page.component';
import { MobileTagDetailsPageComponent } from './pages/mobile-tag-details-page/mobile-tag-details-page.component';
import { MobileSearchPageComponent } from './pages/mobile-search-page/mobile-search-page.component';
import { MobileNoteDetailsComponent } from './pages/mobile-note-details/mobile-note-details.component';
import { MobileHomePageComponent } from './pages/mobile-home-page/mobile-home-page.component';

@NgModule({
	declarations: [
		DashboardComponent,
		SidebarActionsComponent,
		TagsListMobileComponent,
		SectionPageMobileComponent,
		NotesSearchInputComponent,
		MobileHomePageComponent,
		MobileTagsPageComponent,
		MobileTagDetailsPageComponent,
		MobileSearchPageComponent,
		MobileNoteDetailsComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		//
		SidebarModule,
		HeaderModule,
		HeaderControlModule,
		SidebarNotesModule,
		DashboardRoutingModule,
		BottomNavigationModule,
		//
	],
	// exports: [DashboardComponent],
	providers: [DashboardService],
})
export class DashboardModule {}
