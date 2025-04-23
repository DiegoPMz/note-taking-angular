import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async route => {
	const router = inject(Router);
	const supabase = inject(SupabaseService);
	const session = await supabase.getSession();

	const isAuthRoute =
		route.routeConfig?.path === '/auth/login' ||
		route.routeConfig?.path === '/auth/register';

	if (!session) {
		return isAuthRoute ? true : router.createUrlTree(['auth/login']);
	} else {
		return isAuthRoute ? router.createUrlTree(['']) : true;
	}
};
