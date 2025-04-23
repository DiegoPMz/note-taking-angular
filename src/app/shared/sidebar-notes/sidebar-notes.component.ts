import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	NotesWithTags,
	SingleNoteWithTags,
	SupabaseService,
} from '@app/core/services/supabase.service';
import { Tables } from '@app/core/types/supabase';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-sidebar-notes',
	templateUrl: './sidebar-notes.component.html',
})
export class SidebarNotesComponent {
	@Input() notes!: Observable<NotesWithTags | null>;
	@Output() emitSelectedNote = new EventEmitter<SingleNoteWithTags>();
	// @Input() showCreateNoteButton?: boolean = false;

	constructor(private readonly supabase: SupabaseService) {}

	// TEMPORAL
	signOut() {
		this.supabase.signOut();
	}

	trackByNoteId(index: number, note: Tables<'notes'>) {
		return note.id;
	}
}
