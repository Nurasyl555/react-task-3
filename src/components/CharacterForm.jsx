import { useState } from "react";

const SIGILS = {
  Stark: "🐺",
  Targaryen: "🐉",
  Lannister: "🦁",
  Baratheon: "🦌",
  Greyjoy: "🦑",
  "White Walkers": "❄️",
  Other: "⚔️"
};

export function CharacterForm({ onAddCharacter }) {
  console.log("[CharacterForm Render]");

  const [name, setName] = useState("");
  const [house, setHouse] = useState("Stark");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("The North");
  const [status, setStatus] = useState("Alive");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChar = {
      id: `got-${Date.now()}`,
      name: name.trim(),
      house,
      title: title.trim() || "Westeros Noble",
      region: region.trim() || "Westeros",
      status,
      sigil: SIGILS[house] || "⚔️",
      keyVersion: 0
    };

    onAddCharacter(newChar);

    setName("");
    setTitle("");
    setRegion("The North");
    setHouse("Stark");
    setStatus("Alive");
    setIsOpen(false);
  };

  return (
    <section className="form-container">
      <div className="form-toggle-bar">
        <button
          className="btn-primary"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close Form ✕" : "+ Recruit New Character"}
        </button>
      </div>

      {isOpen && (
        <form className="character-form" onSubmit={handleSubmit}>
          <h3 className="form-heading">Recruit Lord / Warrior</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="char-name">Character Name *</label>
              <input
                id="char-name"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Robb Stark"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="char-house">Great House</label>
              <select
                id="char-house"
                className="form-select"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
              >
                <option value="Stark">Stark</option>
                <option value="Targaryen">Targaryen</option>
                <option value="Lannister">Lannister</option>
                <option value="Baratheon">Baratheon</option>
                <option value="Greyjoy">Greyjoy</option>
                <option value="White Walkers">White Walkers</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="char-title">Title / Role</label>
              <input
                id="char-title"
                type="text"
                className="form-input"
                placeholder="e.g. Young Wolf"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="char-region">Region</label>
              <input
                id="char-region"
                type="text"
                className="form-input"
                placeholder="e.g. Riverlands"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="char-status">Initial Status</label>
              <select
                id="char-status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Alive">Alive</option>
                <option value="Deceased">Deceased</option>
                <option value="Resurrected">Resurrected</option>
              </select>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              Enlist into Westeros
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
