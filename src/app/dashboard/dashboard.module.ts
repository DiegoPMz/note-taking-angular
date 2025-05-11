import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DesktopDashboardViewComponent } from './components/desktop-dashboard-view/desktop-dashboard-view.component';
import { IconSearchComponent } from '@app/shared/icons/icon-search/icon-search.component';
import { IconDeleteComponent } from '../shared/icons/icon-delete/icon-delete.component';
import { IconClockComponent } from '@app/shared/icons/icon-clock/icon-clock.component';
import { IconTagComponent } from '../shared/icons/icon-tag/icon-tag.component';
import { NoteDetailsDisplayComponent } from './components/note-details-display/note-details-display.component';

@NgModule({
	declarations: [
		SidebarActionsComponent,
		TagsListMobileComponent,
		SectionPageMobileComponent,
		NotesSearchInputComponent,
		MobileHomePageComponent,
		MobileTagsPageComponent,
		MobileTagDetailsPageComponent,
		MobileSearchPageComponent,
		MobileNoteDetailsComponent,
		DashboardLayoutComponent,
		DesktopDashboardViewComponent,
  NoteDetailsDisplayComponent,
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
		HeaderControlModule,
		//
		IconSearchComponent,
		IconDeleteComponent,
		IconClockComponent,
		IconTagComponent,
	],
	providers: [DashboardService],
})
export class DashboardModule {}
