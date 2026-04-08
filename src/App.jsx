import { useState, useEffect, useRef } from "react";
import initialNotes from "./data/initialNotes.json";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NewEntryModal from "./components/NewEntryModal";
import NoteList from "./components/NoteList";
import { SearchIcon, CloseIcon, PlusCircleIcon } from "./components/Icons";

const INITIAL_CAMPAIGN = { id: "c1", name: "Raid dungeon" };

// Load all state from localStorage together so campaigns and notes
// are always in sync. If either is missing, start fresh with defaults.
const savedCampaigns = localStorage.getItem("gm_campaigns");
const savedNotes = localStorage.getItem("gm_notes_v2");
const LOADED = (savedCampaigns && savedNotes)
  ? { campaigns: JSON.parse(savedCampaigns), notes: JSON.parse(savedNotes) }
  : { campaigns: [INITIAL_CAMPAIGN], notes: initialNotes };

function App() {
  const [campaigns, setCampaigns] = useState(LOADED.campaigns);
  const [activeCampaignId, setActiveCampaignId] = useState(LOADED.campaigns[0]?.id || null);
  const [notes, setNotes] = useState(LOADED.notes);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeTag, setActiveTag] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarWidthRef = useRef(260);

  function handleResizeStart(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidthRef.current;
    setIsDragging(true);

    function onMouseMove(e) {
      const newWidth = Math.min(500, Math.max(160, startWidth + e.clientX - startX));
      sidebarWidthRef.current = newWidth;
      setSidebarWidth(newWidth);
    }

    function onMouseUp() {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  useEffect(function () {
    localStorage.setItem("gm_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(function () {
    localStorage.setItem("gm_notes_v2", JSON.stringify(notes));
  }, [notes]);

  function addCampaign(name) {
    const newCampaign = { id: crypto.randomUUID(), name: name };
    setCampaigns([...campaigns, newCampaign]);
    setActiveCampaignId(newCampaign.id);
  }

  function renameCampaign(id, newName) {
    setCampaigns(campaigns.map(function (c) {
      return c.id === id ? { ...c, name: newName } : c;
    }));
  }

  function deleteCampaign(id) {
    const remaining = campaigns.filter(function (c) { return c.id !== id; });
    setCampaigns(remaining);
    if (activeCampaignId === id) {
      setActiveCampaignId(remaining[0]?.id || null);
    }
    setNotes(notes.filter(function (n) { return n.campaignId !== id; }));
  }

  function addNote(text, tags) {
    const now = new Date().toISOString();
    const newNote = {
      id: crypto.randomUUID(),
      campaignId: activeCampaignId,
      text: text,
      tags: tags,
      createdAt: now,
      updatedAt: now,
    };
    setNotes([newNote, ...notes]);
    setShowModal(false);
  }

  function updateNote(id, text, tags) {
    setNotes(notes.map(function (note) {
      if (note.id === id) {
        return { ...note, text: text, tags: tags, updatedAt: new Date().toISOString() };
      }
      return note;
    }));
    setEditingId(null);
  }

  function deleteNote(id) {
    setNotes(notes.filter(function (n) { return n.id !== id; }));
    if (editingId === id) setEditingId(null);
  }

  function handleTagToggle(tag) {
    setActiveTag(activeTag === tag ? null : tag);
  }

  // Only show notes for the active campaign
  const campaignNotes = notes.filter(function (n) {
    return n.campaignId === activeCampaignId;
  });

  // Collect unique tags from this campaign's notes
  const allTags = [];
  campaignNotes.forEach(function (note) {
    note.tags.forEach(function (tag) {
      if (!allTags.includes(tag)) allTags.push(tag);
    });
  });
  allTags.sort();

  // Filter by search and active tag
  const filteredNotes = campaignNotes.filter(function (note) {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      note.text.toLowerCase().includes(q) ||
      note.tags.some(function (t) { return t.toLowerCase().includes(q); });
    const matchesTag = !activeTag || note.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  // Sort
  filteredNotes.sort(function (a, b) {
    const dA = new Date(a.createdAt);
    const dB = new Date(b.createdAt);
    return sortOrder === "newest" ? dB - dA : dA - dB;
  });

  const activeCampaign = campaigns.find(function (c) { return c.id === activeCampaignId; });

  return (
    <div className="app">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="body">
        <Sidebar
          isOpen={sidebarOpen}
          width={sidebarWidth}
          isDragging={isDragging}
          onResizeStart={handleResizeStart}
          sortOrder={sortOrder}
          onSort={setSortOrder}
          allTags={allTags}
          activeTag={activeTag}
          onTagToggle={handleTagToggle}
          onClearTag={() => setActiveTag(null)}
          campaigns={campaigns}
          activeCampaignId={activeCampaignId}
          onSelectCampaign={setActiveCampaignId}
          onAddCampaign={addCampaign}
          onRenameCampaign={renameCampaign}
          onDeleteCampaign={deleteCampaign}
        />

        <main className="main-content">
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <span className="search-icon" aria-hidden="true"><SearchIcon /></span>
              <input
                className="search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Notes or tags....."
                aria-label="Search notes"
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {activeCampaign && (
            <h2 className="campaign-title">{activeCampaign.name}</h2>
          )}

          {!activeCampaign && (
            <p className="no-campaign-msg">Select or create a campaign to get started.</p>
          )}

          {activeCampaign && (
            <div className="entry-section">
              <div className="entry-section-header">
                <span className="entry-section-label">
                  Entry ({filteredNotes.length})
                </span>
                <button
                  className="entry-add-btn"
                  onClick={() => setShowModal(true)}
                  aria-label="Add new entry"
                >
                  <PlusCircleIcon />
                </button>
              </div>
              <NoteList
                notes={filteredNotes}
                editingId={editingId}
                onEdit={setEditingId}
                onUpdate={updateNote}
                onDelete={deleteNote}
                onCancelEdit={() => setEditingId(null)}
              />
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <NewEntryModal onAdd={addNote} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
