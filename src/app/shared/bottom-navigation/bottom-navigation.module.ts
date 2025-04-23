import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationParamsService } from '@app/core/services/navigation-params.service';

@NgModule({
	declarations: [BottomNavigationComponent],
	imports: [CommonModule, RouterModule],
	exports: [BottomNavigationComponent],
	providers: [NavigationParamsService],
})
export class BottomNavigationModule {}
