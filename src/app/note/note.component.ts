import { Component } from '@angular/core';
import { Note } from '../shared/models/note';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NoteFormComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  editedNote: Note | null = null;

  addNote(newNote: Note) {
    this.notes.push(newNote);
  }

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  editNote() {
    if (this.selectedNote) {
      this.editedNote = this.selectedNote;
    }
  }

  saveEditedNote(editedNote: Note) {
    if (this.selectedNote) {
      const index = this.notes.findIndex(
        (note) => note.id === this.selectedNote?.id
      );

      if (index !== -1) {
        this.notes[index] = editedNote;
      }
    } else {
      this.notes.push(editedNote);
    }

    this.selectedNote = null;
    this.editedNote = null;
  }

  deleteNote() {
    if (this.selectedNote) {
      const index = this.notes.findIndex(
        (note) => note.id === this.selectedNote?.id
      );

      if (index !== -1) {
        this.notes.splice(index, 1);
        this.selectedNote = null;
      }
    }
  }
}
