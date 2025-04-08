import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [authGuard],
		loadChildren: () =>
			import('@app/dashboard/dashboard.module').then(m => m.DashboardModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
