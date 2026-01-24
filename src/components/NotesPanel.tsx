'use client';

import { useState } from 'react';
import { Note } from '@/types';
import { X, FileText, Send } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';

interface NotesPanelProps {
  notes: Note[];
  onClose: () => void;
  onAddNote: (text: string) => void;
}

export function NotesPanel({ notes, onClose, onAddNote }: NotesPanelProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3E8E41]" />
            <h2 className="text-lg font-semibold text-gray-900">Internal Notes</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4">
          {notes.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No notes yet</p>
              <p className="text-gray-400 text-xs mt-1">
                Add internal notes for your team
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>

        {/* Add Note */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a note for your team..."
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white resize-none placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!newNote.trim()}
              className="p-2.5 bg-[#3E8E41] hover:bg-[#2D6A30] disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Notes are only visible to your team, not the customer.
          </p>
        </div>
      </div>
    </div>
  );
}

interface NoteCardProps {
  note: Note;
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{note.text}</p>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span>{note.author}</span>
        <span>{formatDistanceToNow(note.createdAt)}</span>
      </div>
    </div>
  );
}
