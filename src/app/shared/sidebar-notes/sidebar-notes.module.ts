import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNotesComponent } from './sidebar-notes.component';
import { RouterModule } from '@angular/router';
import { IconPlusComponent } from '../icons/icon-plus/icon-plus.component';

@NgModule({
	declarations: [SidebarNotesComponent],
	exports: [SidebarNotesComponent],
	imports: [
		CommonModule,
		RouterModule,
		//
		IconPlusComponent,
	],
})
export class SidebarNotesModule {}
