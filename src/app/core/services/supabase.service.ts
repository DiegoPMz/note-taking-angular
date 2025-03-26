import { Injectable } from '@angular/core';
import {
	AuthChangeEvent,
	AuthSession,
	createClient,
	Session,
	SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from '../types/supabase';

@Injectable({
	providedIn: 'root',
})
export class SupabaseService {
	private supabase: SupabaseClient = createClient<Database>(
		environment.supabaseUrl,
		environment.supabaseKey
	);

	_session: AuthSession | null = null;

	get session() {
		this.supabase.auth.getSession().then(({ data }) => {
			this._session = data.session;
		});

		return this._session;
	}

	authChanges(
		callback: (event: AuthChangeEvent, session: Session | null) => void
	) {
		return this.supabase.auth.onAuthStateChange(callback);
	}

	signIn(email: string, password: string) {
		return this.supabase.auth.signInWithPassword({
			email,
			password,
		});
	}

	signInWithGoogle() {
		return this.supabase.auth.signInWithOAuth({
			provider: 'google',
		});
	}

	signUp(email: string, password: string) {
		return this.supabase.auth.signUp({
			email,
			password,
		});
	}

	signOut() {
		return this.supabase.auth.signOut();
	}
}
