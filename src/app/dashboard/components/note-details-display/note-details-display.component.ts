import { Component, Input } from '@angular/core';
import { SingleNoteWithTags } from '@app/core/services/supabase.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-note-details-display',
	templateUrl: './note-details-display.component.html',
})
export class NoteDetailsDisplayComponent {
	@Input({ required: true })
	selectedNote$!: Observable<SingleNoteWithTags | null>;
}
