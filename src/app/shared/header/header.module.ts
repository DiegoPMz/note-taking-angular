import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { IconLogoComponent } from '../icons/icon-logo/icon-logo.component';
import { IconSettingsComponent } from '../icons/icon-settings/icon-settings.component';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		//
		IconLogoComponent,
		IconSettingsComponent,
	],
	exports: [HeaderComponent],
})
export class HeaderModule {}
