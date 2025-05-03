import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './bottom-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [BottomNavigationComponent],
	imports: [CommonModule, RouterModule],
	exports: [BottomNavigationComponent],
})
export class BottomNavigationModule {}
