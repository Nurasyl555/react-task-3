export function MetricsOverview({ characters }) {
  console.log("[MetricsOverview Render]");

  const total = characters.length;
  const alive = characters.filter((c) => c.status === "Alive").length;
  const deceased = characters.filter((c) => c.status === "Deceased").length;
  const resurrected = characters.filter((c) => c.status === "Resurrected").length;

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <span className="metric-number">{total}</span>
        <span className="metric-title">Total Lords</span>
      </div>
      <div className="metric-card metric-alive">
        <span className="metric-number">{alive}</span>
        <span className="metric-title">Alive</span>
      </div>
      <div className="metric-card metric-deceased">
        <span className="metric-number">{deceased}</span>
        <span className="metric-title">Deceased</span>
      </div>
      <div className="metric-card metric-resurrected">
        <span className="metric-number">{resurrected}</span>
        <span className="metric-title">Resurrected</span>
      </div>
    </div>
  );
}
