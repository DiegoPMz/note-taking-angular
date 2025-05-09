import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconArchiveComponent } from '../icons/icon-archive/icon-archive.component';
import { IconLogoComponent } from '../icons/icon-logo/icon-logo.component';
import { IconTagComponent } from '../icons/icon-tag/icon-tag.component';
import { IconHomeComponent } from '../icons/icon-home/icon-home.component';

@NgModule({
	declarations: [SidebarComponent],
	imports: [
		CommonModule,
		RouterModule,
		//
		IconLogoComponent,
		IconHomeComponent,
		IconArchiveComponent,
		IconLogoComponent,
		IconTagComponent,
	],
	exports: [SidebarComponent],
})
export class SidebarModule {}
