import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { IconHomeComponent } from '../icons/icon-home/icon-home.component';
import { IconArchiveComponent } from '../icons/icon-archive/icon-archive.component';
import { IconTagComponent } from '../icons/icon-tag/icon-tag.component';
import { IconSettingsComponent } from '../icons/icon-settings/icon-settings.component';
import { IconSearchComponent } from '../icons/icon-search/icon-search.component';
import { IconPlusComponent } from '../icons/icon-plus/icon-plus.component';

@NgModule({
	declarations: [BottomNavigationComponent],
	imports: [
		CommonModule,
		RouterModule,
		//
		IconHomeComponent,
		IconArchiveComponent,
		IconTagComponent,
		IconSettingsComponent,
		IconSearchComponent,
		IconPlusComponent,
	],
	exports: [BottomNavigationComponent],
})
export class BottomNavigationModule {}
