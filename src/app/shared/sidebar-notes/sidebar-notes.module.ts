import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNotesComponent } from './sidebar-notes.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [SidebarNotesComponent],
	exports: [SidebarNotesComponent],
	imports: [CommonModule, RouterModule],
})
export class SidebarNotesModule {}
