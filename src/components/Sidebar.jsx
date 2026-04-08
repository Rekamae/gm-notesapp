import { useState, useRef } from "react";
import { EditIcon, DeleteIcon, PlusCircleIcon } from "./Icons";

function Sidebar({
  isOpen,
  width,
  isDragging,
  onResizeStart,
  sortOrder,
  onSort,
  allTags,
  activeTag,
  onTagToggle,
  onClearTag,
  campaigns,
  activeCampaignId,
  onSelectCampaign,
  onAddCampaign,
  onRenameCampaign,
  onDeleteCampaign,
}) {
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [popupTop, setPopupTop] = useState(0);
  const startBtnRef = useRef(null);

  function handleToggleForm() {
    if (!showCampaignForm && startBtnRef.current) {
      const rect = startBtnRef.current.getBoundingClientRect();
      setPopupTop(rect.top);
    }
    setShowCampaignForm(!showCampaignForm);
  }

  function handleCreateCampaign() {
    const name = campaignName.trim();
    if (!name) return;
    onAddCampaign(name);
    setCampaignName("");
    setShowCampaignForm(false);
  }

  function handleCancel() {
    setCampaignName("");
    setShowCampaignForm(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleCreateCampaign();
    if (e.key === "Escape") handleCancel();
  }

  function handleRename(campaign) {
    const newName = window.prompt("Rename campaign:", campaign.name);
    if (newName && newName.trim()) {
      onRenameCampaign(campaign.id, newName.trim());
    }
  }

  return (
    <aside
      className={`sidebar${isOpen ? "" : " sidebar--closed"}`}
      style={
        isOpen
          ? { width: `${width}px`, transition: isDragging ? "none" : undefined }
          : undefined
      }
    >
      <div className="sidebar-inner">
        {/* Sort */}
        <div className="sidebar-section">
          <div className="sort-row">
            <span className="sidebar-label">Sort</span>
            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => onSort(e.target.value)}
              aria-label="Sort notes"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="sidebar-section">
          <div className="sidebar-label">Filter Tags</div>
          <hr className="sidebar-divider" />
          <div className="filter-tags-list">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`filter-tag-btn ${activeTag === tag ? "filter-tag-btn--active" : ""}`}
                onClick={() => onTagToggle(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
            <button
              className={`filter-tag-btn ${!activeTag ? "filter-tag-btn--active" : ""}`}
              onClick={onClearTag}
            >
              All
            </button>
          </div>
        </div>

        {/* Campaigns */}
        <div className="sidebar-section">
          <div className="sidebar-label">Campaigns</div>
          <hr className="sidebar-divider" />

          <button
            ref={startBtnRef}
            className="campaign-start-btn"
            onClick={handleToggleForm}
            aria-label="Start a new campaign"
          >
            <PlusCircleIcon /> Start a campaign
          </button>

          <div className="campaign-list">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`campaign-item ${activeCampaignId === campaign.id ? "campaign-item--active" : ""}`}
                onClick={() => onSelectCampaign(campaign.id)}
              >
                <span className="campaign-item-name">{campaign.name}</span>
                <div className="campaign-item-actions">
                  <button
                    className="campaign-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(campaign);
                    }}
                    aria-label="Rename campaign"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="campaign-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Delete "${campaign.name}"? All its entries will be lost.`,
                        )
                      ) {
                        onDeleteCampaign(campaign.id);
                      }
                    }}
                    aria-label="Delete campaign"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sidebar-resize-handle" onMouseDown={onResizeStart} />
      )}

      {showCampaignForm && (
        <div
          className="campaign-popup"
          style={{ top: popupTop, left: width + 8 }}
        >
          <p className="campaign-popup-label">Campaign Name</p>
          <input
            className="campaign-popup-input"
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="My new campaign..."
          />
          <div className="campaign-popup-actions">
            <button className="btn-create" onClick={handleCreateCampaign}>
              Create
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
