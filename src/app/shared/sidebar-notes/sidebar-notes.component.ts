import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	NotesWithTags,
	SingleNoteWithTags,
	SupabaseService,
} from '@app/core/services/supabase.service';
import { Tables } from '@app/core/types/supabase';
import { map, Observable } from 'rxjs';

@Component({
	selector: 'app-sidebar-notes',
	templateUrl: './sidebar-notes.component.html',
})
export class SidebarNotesComponent implements OnInit {
	@Input({ required: true }) notes$!: Observable<NotesWithTags | null>;
	@Input({ required: true }) errorState$!: Observable<{
		hasError: boolean;
		errMessage: string;
	}>;

	@Output() emitSelectedNote = new EventEmitter<SingleNoteWithTags>();

	constructor(private readonly supabase: SupabaseService) {}

	ngOnInit(): void {
		if (!this.notes$) return;

		this.filterEmptyNotes();
	}

	// TEMPORAL
	signOut() {
		this.supabase.signOut();
	}

	trackByNoteId(index: number, note: Tables<'notes'>) {
		return note.id;
	}

	private filterEmptyNotes(): void {
		this.notes$ = this.notes$.pipe(
			map(notes => {
				if (!notes || notes.length === 0) return null;
				return notes;
			})
		);
	}
}
