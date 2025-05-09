import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderControlComponent } from './header-control.component';
import { RouterModule } from '@angular/router';
import { IconLeftArrowComponent } from '../icons/icon-left-arrow/icon-left-arrow.component';
import { IconDeleteComponent } from '../icons/icon-delete/icon-delete.component';
import { IconArchiveComponent } from '../icons/icon-archive/icon-archive.component';

@NgModule({
	declarations: [HeaderControlComponent],
	exports: [HeaderControlComponent],
	imports: [
		CommonModule,
		RouterModule,
		//
		IconLeftArrowComponent,
		IconDeleteComponent,
		IconArchiveComponent,
	],
})
export class HeaderControlModule {}
