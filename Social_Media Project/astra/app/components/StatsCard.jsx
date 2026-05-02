function StatsCard({ title, value, subtitle, icon }) {
  return (
<>
    <div className="StatsCard">
    <div className="StatsCard-content">
        {icon && <span className="StatsCard-icon">{icon}</span>}
        <h3>{title}</h3>
        <p className="StatsCard-value">{value ?? "N/A"}</p>
        {subtitle && <p className="StatsCard-subtitle">{subtitle}</p>}
    
    </div>
    </div>
</>
  );
}

export default StatsCard;



