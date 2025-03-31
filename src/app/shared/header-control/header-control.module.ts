import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderControlComponent } from './header-control.component';

@NgModule({
	declarations: [HeaderControlComponent],
	exports: [HeaderControlComponent],
	imports: [CommonModule],
})
export class HeaderControlModule {}
