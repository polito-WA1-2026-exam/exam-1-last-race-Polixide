
const TRAINS = [
  { d: 'M120,120 L360,120 L440,200 L600,200 L680,120 L900,120', duration: '8s' },
  { d: 'M120,360 L360,360 L440,280 L600,280 L680,360 L900,360', duration: '8.5s' },
  { d: 'M120,120 L200,120 L280,200 L440,200 L520,280 L760,280 L760,360', duration: '9s' },
  { d: 'M120,360 L280,360 L360,280 L600,280 L680,200 L760,200 L840,120 L900,120', duration: '9.5s' },
];

// Regular stops (small ringed dots).
const STOPS = [
  [120, 120], [280, 120], [360, 120], [680, 120], [840, 120], [900, 120],
  [280, 200], [680, 200], [760, 200],
  [760, 280],
  [120, 360], [280, 360], [360, 360], [680, 360], [760, 360],
];

// Interchange hubs (bigger rings on the two central rows).
const HUBS = [
  [440, 200, 11], [600, 200, 11], [440, 280, 11], [600, 280, 11],
  [520, 200, 9], [520, 280, 9],
];

function MetroAnimation() {
  return (
    <div className="lr-metro-hero">
      <svg viewBox="0 0 1000 460" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* faint background grid dots for a "transit map" feel */}
        <g className="lr-grid" fill="#9fb3d8">
          {[120, 200, 280, 360].map((y) =>
            [120, 280, 440, 600, 760, 900].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
            ))
          )}
        </g>

        {/* lines: only horizontal / vertical / 45-deg diagonal segments */}
        <polyline className="lr-line d1" stroke="#f43f5e"
          points="120,120 360,120 440,200 600,200 680,120 900,120" />
        <polyline className="lr-line d2" stroke="#3b82f6"
          points="120,360 360,360 440,280 600,280 680,360 900,360" />
        <polyline className="lr-line d3" stroke="#10b981"
          points="120,120 200,120 280,200 440,200 520,280 760,280 760,360" />
        <polyline className="lr-line d4" stroke="#f59e0b"
          points="120,360 280,360 360,280 600,280 680,200 760,200 840,120 900,120" />
        <polyline className="lr-line d2" stroke="#a855f7"
          points="520,200 520,280" />

        {/* regular stops */}
        <g fill="#0b1222" stroke="#f1f5f9" strokeWidth="3.5">
          {STOPS.map(([cx, cy]) => (
            <circle key={`s-${cx}-${cy}`} className="lr-stop" cx={cx} cy={cy} r="6" />
          ))}
        </g>

        {/* interchange hubs */}
        <g fill="#0b1222" stroke="#f8fafc" strokeWidth="5">
          {HUBS.map(([cx, cy, r]) => (
            <circle key={`h-${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>

        {/* trains: white dots running along each line */}
        {TRAINS.map((t, i) => (
          <circle
            key={`t-${i}`}
            className="lr-train"
            r="6"
            fill="#fff"
            style={{ offsetPath: `path('${t.d}')`, animationDuration: t.duration }}
          />
        ))}
      </svg>
    </div>
  );
}

export default MetroAnimation;