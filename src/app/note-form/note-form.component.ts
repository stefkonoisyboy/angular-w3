import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../shared/models/note';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent {
  @Input() note: Note | null = null;
  @Output() noteSaved = new EventEmitter<Note>();

  title: string = '';
  content: string = '';

  titleError: string = '';
  contentError: string = '';

  ngOnChanges() {
    if (this.note) {
      this.title = this.note.title;
      this.content = this.note.content;
    }
  }

  saveNote() {
    this.titleError = '';
    this.contentError = '';

    if (this.title.length < 5) {
      this.titleError = 'Title must be at least 5 characters long';
    }

    if (this.content.length < 7) {
      this.contentError = 'Content must be at least 7 characters long';
    }

    if (!this.titleError && !this.contentError) {
      const editedNote: Note = {
        id: this.note ? this.note.id : Date.now(),
        title: this.title,
        content: this.content,
      };

      this.title = '';
      this.content = '';

      this.noteSaved.emit(editedNote);
    }
  }
}
