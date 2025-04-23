import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [SidebarComponent],
	imports: [CommonModule, RouterModule],
	exports: [SidebarComponent],
})
export class SidebarModule {}
