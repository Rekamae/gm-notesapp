import TagBadge from "./TagBadge";

function FilterBar({ sortOrder, onSort, allTags, activeTag, onTagToggle }) {
  return (
    <div className="filter-bar" role="search" aria-label="Filter and sort notes">
      <div className="filter-row">
        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            Sort:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortOrder}
            onChange={(e) => onSort(e.target.value)}
            aria-label="Sort notes"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="filter-tags" role="group" aria-label="Filter by tag">
          <span className="filter-tags-label">Filter:</span>
          <div className="filter-tags-list">
            {allTags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                onClick={() => onTagToggle(tag)}
                active={activeTag === tag}
              />
            ))}
          </div>
          {activeTag && (
            <button
              className="btn btn--ghost btn--small"
              onClick={() => onTagToggle(activeTag)}
              aria-label="Clear tag filter"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterBar;
