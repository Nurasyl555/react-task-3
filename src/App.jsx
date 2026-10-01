import { useState } from "react";
import { INITIAL_CHARACTERS } from "./data/charactersData";
import { CharacterCard } from "./components/CharacterCard";
import { CharacterForm } from "./components/CharacterForm";
import { FilterControls } from "./components/FilterControls";
import { MetricsOverview } from "./components/MetricsOverview";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [filterHouse, setFilterHouse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  console.log(
    `[App Render] Total: ${characters.length}, HouseFilter: ${filterHouse}, StatusFilter: ${filterStatus}, Reversed: ${isReversed}`
  );

  const handleAddCharacter = (newCharacter) => {
    setCharacters((prev) => [newCharacter, ...prev]);
  };

  const handleDeleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id, nextStatus) => {
    setCharacters((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
  };

  const handleResetSingleKey = (id) => {
    setCharacters((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, keyVersion: item.keyVersion + 1 }
          : item
      )
    );
  };

  const handleResetAllKeys = () => {
    setCharacters((prev) =>
      prev.map((item) => ({ ...item, keyVersion: item.keyVersion + 1 }))
    );
  };

  const handleToggleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const filteredCharacters = characters.filter((char) => {
    const matchesHouse =
      filterHouse === "All" || char.house === filterHouse;
    const matchesStatus =
      filterStatus === "All" || char.status === filterStatus;
    const matchesSearch =
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHouse && matchesStatus && matchesSearch;
  });

  const displayedCharacters = isReversed
    ? [...filteredCharacters].reverse()
    : filteredCharacters;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-crown">⚔️ 👑 ⚔️</div>
        <h1 className="header-title">Westeros War Room Dashboard</h1>
        <p className="header-subtitle">
          Command Great Houses, dispatch ravens, inspect re-renders and key reconciliations
        </p>
      </header>

      <main className="dashboard-content">
        <MetricsOverview characters={characters} />

        <CharacterForm onAddCharacter={handleAddCharacter} />

        <FilterControls
          filterHouse={filterHouse}
          setFilterHouse={setFilterHouse}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isReversed={isReversed}
          onToggleReverse={handleToggleReverse}
          onResetAllKeys={handleResetAllKeys}
          totalCount={characters.length}
          visibleCount={displayedCharacters.length}
        />

        <section className="cards-section">
          {displayedCharacters.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🛡️</span>
              <h3>No lords found</h3>
              <p>Try modifying your filters or recruit a new character above.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {displayedCharacters.map((char) => (
                <CharacterCard
                  key={`${char.id}-v${char.keyVersion}`}
                  character={char}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteCharacter}
                  onResetKey={handleResetSingleKey}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
