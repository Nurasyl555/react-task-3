import { HOUSES, STATUSES } from "../data/charactersData";

export function FilterControls({
  filterHouse,
  setFilterHouse,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  isReversed,
  onToggleReverse,
  onResetAllKeys,
  totalCount,
  visibleCount
}) {
  console.log(
    `[FilterControls Render] House: ${filterHouse}, Status: ${filterStatus}, Reversed: ${isReversed}`
  );

  return (
    <div className="filter-controls-panel">
      <div className="search-and-selects">
        <div className="control-item">
          <label htmlFor="search-input" className="control-label">
            Search Name / Title
          </label>
          <input
            id="search-input"
            type="text"
            className="control-input"
            placeholder="Type character name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-item">
          <label htmlFor="house-select" className="control-label">
            Filter by House
          </label>
          <select
            id="house-select"
            className="control-select"
            value={filterHouse}
            onChange={(e) => setFilterHouse(e.target.value)}
          >
            {HOUSES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="control-item">
          <label htmlFor="status-select" className="control-label">
            Filter by Status
          </label>
          <select
            id="status-select"
            className="control-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="action-buttons-group">
        <button
          className={`btn-control ${isReversed ? "btn-active" : ""}`}
          onClick={onToggleReverse}
          title="Reverse the array order to demonstrate state preservation"
        >
          {isReversed ? "Order: Reversed ⇅" : "Order: Standard ⇅"}
        </button>

        <button
          className="btn-control btn-danger"
          onClick={onResetAllKeys}
          title="Force remount of all cards by incrementing key versions"
        >
          Reset All Cards State (Keys Remount)
        </button>

        <div className="results-counter">
          Showing: <strong>{visibleCount}</strong> of <strong>{totalCount}</strong>
        </div>
      </div>
    </div>
  );
}
