/**
 * NotesApp Component
 * 
 * A persistent notes application that demonstrates:
 * - Custom useLocalStorage hook for data persistence
 * - CRUD operations with localStorage sync
 * - Cross-tab synchronization
 * - Rich note management with timestamps
 */

import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

/**
 * Color options for notes
 */
const NOTE_COLORS = [
  { id: 'default', bg: 'bg-bg-secondary', border: 'border-border', label: 'Default' },
  { id: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Yellow' },
  { id: 'green', bg: 'bg-green-50', border: 'border-green-200', label: 'Green' },
  { id: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Blue' },
  { id: 'pink', bg: 'bg-pink-50', border: 'border-pink-200', label: 'Pink' },
  { id: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', label: 'Purple' },
];

/**
 * Main NotesApp Component
 */
const NotesApp = () => {
  // Persist notes to localStorage
  const [notes, setNotes] = useLocalStorage('react-practice-notes', []);
  
  // Local state for the new note form
  const [newNote, setNewNote] = useState({ title: '', content: '', color: 'default' });
  const [isEditing, setIsEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Statistics for the notes
   */
  const stats = useMemo(() => ({
    total: notes.length,
    colors: NOTE_COLORS.reduce((acc, color) => {
      acc[color.id] = notes.filter(n => n.color === color.id).length;
      return acc;
    }, {}),
  }), [notes]);

  /**
   * Filtered notes based on search query
   */
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  /**
   * Adds a new note
   */
  const handleAddNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    const note = {
      id: crypto.randomUUID(),
      title: newNote.title.trim() || 'Untitled',
      content: newNote.content.trim(),
      color: newNote.color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', color: 'default' });
  };

  /**
   * Updates an existing note
   */
  const handleUpdateNote = (id, updates) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setIsEditing(null);
  };

  /**
   * Deletes a note
   */
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  /**
   * Clears all notes
   */
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      setNotes([]);
    }
  };

  /**
   * Handles Enter key in title input
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  /**
   * Get color classes for a note
   */
  const getColorClasses = (colorId) => {
    const color = NOTE_COLORS.find((c) => c.id === colorId) || NOTE_COLORS[0];
    return `${color.bg} ${color.border}`;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Header with stats */}
      <div className="bg-bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-text-primary">My Notes</h3>
            <span className="px-2 py-0.5 bg-primary-light text-primary text-xs font-medium rounded-full">
              Saved to localStorage
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-muted">
              Total: <span className="font-medium text-text-primary">{stats.total}</span>
            </span>
            {stats.total > 0 && (
              <button
                onClick={handleClearAll}
                className="text-danger hover:text-danger-hover transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* New note form */}
      <div className="p-6 border-b border-border">
        <div className="space-y-4">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="Note title..."
            className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Write your note here..."
            rows={3}
            className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
          />
          <div className="flex items-center justify-between">
            {/* Color picker */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Color:</span>
              <div className="flex gap-1">
                {NOTE_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setNewNote({ ...newNote, color: color.id })}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      color.id === 'default' ? 'bg-bg-tertiary' : color.bg
                    } ${
                      newNote.color === color.id
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : 'border-transparent hover:scale-110'
                    }`}
                    title={color.label}
                    aria-label={`Select ${color.label} color`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleAddNote}
              disabled={!newNote.title.trim() && !newNote.content.trim()}
              className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      {notes.length > 0 && (
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-12 pr-4 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-text-muted">
              Found <span className="font-medium text-text-primary">{filteredNotes.length}</span> note
              {filteredNotes.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>
      )}

      {/* Notes grid */}
      <div className="p-6">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isEditing={isEditing === note.id}
                onEdit={() => setIsEditing(note.id)}
                onSave={(updates) => handleUpdateNote(note.id, updates)}
                onCancel={() => setIsEditing(null)}
                onDelete={() => handleDeleteNote(note.id)}
                getColorClasses={getColorClasses}
                formatDate={formatDate}
                colors={NOTE_COLORS}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-text-primary font-medium mb-2">
              {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            </p>
            <p className="text-text-muted text-sm">
              {notes.length === 0
                ? 'Create your first note above. Notes are saved automatically!'
                : 'Try a different search term'}
            </p>
          </div>
        )}
      </div>

      {/* Persistence indicator */}
      <div className="px-6 py-3 bg-bg-secondary border-t border-border">
        <p className="text-xs text-text-muted text-center">
          💾 Notes are automatically saved to your browser's localStorage and persist across page refreshes.
          Open this page in another tab to see cross-tab sync!
        </p>
      </div>
    </div>
  );
};

/**
 * NoteCard Component
 * 
 * Displays individual note with edit and delete functionality.
 */
const NoteCard = ({
  note,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  getColorClasses,
  formatDate,
  colors,
}) => {
  const [editData, setEditData] = useState({ title: note.title, content: note.content, color: note.color });

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className={`rounded-lg border-2 p-4 ${getColorClasses(editData.color)}`}>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full px-3 py-2 mb-2 bg-white/50 border border-border rounded text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Title"
        />
        <textarea
          value={editData.content}
          onChange={(e) => setEditData({ ...editData, content: e.target.value })}
          className="w-full px-3 py-2 mb-3 bg-white/50 border border-border rounded text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={4}
          placeholder="Content"
        />
        <div className="flex items-center gap-1 mb-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setEditData({ ...editData, color: color.id })}
              className={`w-5 h-5 rounded-full border transition-all ${
                color.id === 'default' ? 'bg-bg-tertiary' : color.bg
              } ${editData.color === color.id ? 'border-primary ring-1 ring-primary' : 'border-transparent'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-bg-tertiary text-text-secondary text-sm font-medium rounded hover:bg-bg-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${getColorClasses(
        note.color
      )}`}
    >
      {/* Note header */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-text-primary line-clamp-1">{note.title}</h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 text-text-muted hover:text-primary rounded transition-colors"
            aria-label="Edit note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-text-muted hover:text-danger rounded transition-colors"
            aria-label="Delete note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Note content */}
      <p className="text-text-secondary text-sm mb-3 line-clamp-4 whitespace-pre-wrap">
        {note.content || <span className="italic text-text-muted">No content</span>}
      </p>

      {/* Note footer */}
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{formatDate(note.updatedAt)}</span>
        {note.createdAt !== note.updatedAt && (
          <span className="italic">edited</span>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
