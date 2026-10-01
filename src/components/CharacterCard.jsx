import { useState } from "react";

export function CharacterCard({
  character,
  onStatusChange,
  onDelete,
  onResetKey
}) {
  console.log(
    `[CharacterCard Render] ${character.name} (id: ${character.id}, keyVersion: ${character.keyVersion})`
  );

  const [notes, setNotes] = useState("");
  const [battlePower, setBattlePower] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusToggle = () => {
    const nextStatus =
      character.status === "Alive"
        ? "Deceased"
        : character.status === "Deceased"
        ? "Resurrected"
        : "Alive";
    onStatusChange(character.id, nextStatus);
  };

  const getStatusBadgeClass = () => {
    if (character.status === "Alive") return "badge badge-alive";
    if (character.status === "Deceased") return "badge badge-deceased";
    return "badge badge-resurrected";
  };

  const getHouseClass = () => {
    const normalized = character.house.toLowerCase().replace(/\s+/g, "-");
    return `house-${normalized}`;
  };

  return (
    <article className={`card ${getHouseClass()}`}>
      <div className="card-header">
        <div className="card-sigil">{character.sigil}</div>
        <div className="card-title-group">
          <h3 className="card-name">{character.name}</h3>
          <span className="card-title">{character.title}</span>
        </div>
        <button
          className={getStatusBadgeClass()}
          onClick={handleStatusToggle}
          title="Click to cycle status"
        >
          {character.status}
        </button>
      </div>

      <div className="card-meta">
        <div className="meta-pill">
          <span className="meta-label">House:</span>
          <span className="meta-value">{character.house}</span>
        </div>
        <div className="meta-pill">
          <span className="meta-label">Region:</span>
          <span className="meta-value">{character.region}</span>
        </div>
      </div>

      <div className="card-local-section">
        <div className="local-header">
          <span className="local-tag">Local State</span>
          <div className="power-stepper">
            <span className="power-label">Combat Power:</span>
            <button
              className="btn-stepper"
              onClick={() => setBattlePower((prev) => Math.max(0, prev - 5))}
            >
              -
            </button>
            <span className="power-value">{battlePower}</span>
            <button
              className="btn-stepper"
              onClick={() => setBattlePower((prev) => Math.min(100, prev + 5))}
            >
              +
            </button>
          </div>
        </div>

        <div className="notes-box">
          <label className="notes-label" htmlFor={`note-${character.id}`}>
            Raven Dispatch / Tactical Note:
          </label>
          <input
            id={`note-${character.id}`}
            type="text"
            className="input-note"
            placeholder="Write local note (persists during reorder)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="local-footer">
          <button
            className="btn-text"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Hide Lore Details ▲" : "Show Lore Details ▼"}
          </button>
        </div>

        {isExpanded && (
          <div className="card-expanded-content">
            <p className="lore-item">
              <strong>Key Version:</strong> v{character.keyVersion}
            </p>
            <p className="lore-item">
              <strong>Local Note Status:</strong>{" "}
              {notes.trim().length > 0 ? "Saved in local state" : "Empty"}
            </p>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button
          className="btn-action btn-reset"
          onClick={() => onResetKey(character.id)}
          title="Changes key to remount component and reset its local state"
        >
          Reset State (via Key)
        </button>
        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(character.id)}
          title="Remove from dashboard"
        >
          Banish / Remove
        </button>
      </div>
    </article>
  );
}
