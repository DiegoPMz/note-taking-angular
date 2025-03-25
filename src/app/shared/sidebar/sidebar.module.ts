import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [SidebarComponent],
	imports: [CommonModule, HeaderModule],
	exports: [SidebarComponent],
})
export class SidebarModule {}
