import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
];

// { path: 'archived', component: DashboardComponent },
// { path: 'tags', component: DashboardComponent },
// { path: 'settings', component: DashboardComponent },

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
