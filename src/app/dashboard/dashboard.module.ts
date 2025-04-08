import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '@app/shared/sidebar/sidebar.module';
import { HeaderModule } from '@app/shared/header/header.module';
import { HeaderControlModule } from '@app/shared/header-control/header-control.module';
import { SidebarNotesModule } from '@app/shared/sidebar-notes/sidebar-notes.module';
import { SidebarActionsComponent } from './components/sidebar-actions/sidebar-actions.component';
import { NoteEditorMobileComponent } from './components/note-editor-mobile/note-editor-mobile.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
	declarations: [
		DashboardComponent,
		SidebarActionsComponent,
		NoteEditorMobileComponent,
	],
	imports: [
		CommonModule,
		SidebarModule,
		HeaderModule,
		HeaderControlModule,
		SidebarNotesModule,
		DashboardRoutingModule,
	],
	// exports: [DashboardComponent],
})
export class DashboardModule {}
