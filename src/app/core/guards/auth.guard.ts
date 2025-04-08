import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async route => {
	const router = inject(Router);
	const supabase = inject(SupabaseService);
	const session = await supabase.getSession();

	console.log(
		route.routeConfig?.path === '/auth/login' ||
			route.routeConfig?.path === '/auth/register'
	);

	const isAuthRoute =
		route.routeConfig?.path === '/auth/login' ||
		route.routeConfig?.path === '/auth/register';

	if (!session) {
		// Si no hay sesión
		return isAuthRoute ? true : router.createUrlTree(['auth/login']);
	} else {
		// Si hay sesión
		return isAuthRoute ? router.createUrlTree(['']) : true;
	}
};
