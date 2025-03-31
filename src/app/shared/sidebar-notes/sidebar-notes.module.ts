import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNotesComponent } from './sidebar-notes.component';

@NgModule({
	declarations: [SidebarNotesComponent],
	exports: [SidebarNotesComponent],
	imports: [CommonModule],
})
export class SidebarNotesModule {}
