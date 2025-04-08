import { Component } from '@angular/core';
import { SupabaseService } from '@app/core/services/supabase.service';

@Component({
	selector: 'app-sidebar-notes',
	templateUrl: './sidebar-notes.component.html',
})
export class SidebarNotesComponent {
	notes = [1, 2];

	constructor(private readonly supabase: SupabaseService) {}

	signOut() {
		this.supabase.signOut();
	}
}
