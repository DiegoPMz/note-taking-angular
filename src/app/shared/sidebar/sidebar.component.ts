import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
	@Input() tagCollection$?: Observable<{ name: string; id: number }[]>;
	@Input() selectedTag$?: Observable<string | null>;

	// Subject para manejar la destrucción
	private destroy$ = new Subject<void>();
	selectedTag: string | null = null;

	ngOnInit(): void {
		this.selectedTag$?.pipe(takeUntil(this.destroy$)).subscribe(val => {
			this.selectedTag = val;
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	trackByTagId(index: number, tag: { name: string; id: number }) {
		return tag.id;
	}
}
