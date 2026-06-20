

const POSITIONS = {
    1:  { x: 80,  y: 90  },  // Vega        – Mars
    2:  { x: 280, y: 90  },  // Orion       – Mars + Neptune
    3:  { x: 480, y: 90  },  // Helios      – Mars + Earth
    4:  { x: 640, y: 90  },  // Polaris     – Mars
    5:  { x: 800, y: 90  },  // Aurora      – Mars
    6:  { x: 480, y: 240 },  // Solaris     – Earth + Jupiter
    7:  { x: 120, y: 240 },  // Andromeda   – Neptune
    8:  { x: 760, y: 240 },  // Titan       – Neptune
    9:  { x: 880, y: 240 },  // Lyra        – Neptune
    10: { x: 640, y: 240 },  // Nova        – Neptune + Jupiter
    11: { x: 480, y: 350 },  // Eclipse     – Earth
    12: { x: 480, y: 445 },  // Zenith      – Earth
    13: { x: 480, y: 530 },  // Halcyon     – Earth
    14: { x: 640, y: 350 },  // Meridian    – Jupiter
    15: { x: 640, y: 445 },  // Apex        – Jupiter
    16: { x: 640, y: 530 },  // Calypso     – Jupiter
};

function MetroMap({ stations = [], segments = [], showLines = true, height = 400 }) {
    const getLabelY = (pos) => (pos.y === 240 ? pos.y + 26 : pos.y - 20);

    return (
        <div className="lr-metro-map" style={{ height }}>
            <svg
                viewBox="0 0 960 570"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Metro network map"
            >
                {/* Subtle background grid */}
                <g opacity="0.15" fill="#94a3b8">
                    {[90, 240, 350, 445, 530].map(y =>
                        [80, 280, 480, 640, 800].map(x => (
                            <circle key={`bg-${x}-${y}`} cx={x} cy={y} r="2" />
                        ))
                    )}
                </g>

                {/* Metro lines – drawn as individual segment lines */}
                {showLines && segments.map(seg => {
                    const from = POSITIONS[seg.fromStation];
                    const to = POSITIONS[seg.toStation];
                    if (!from || !to) return null;
                    return (
                        <line
                            key={seg.id}
                            x1={from.x} y1={from.y}
                            x2={to.x} y2={to.y}
                            stroke={seg.lineColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            opacity="0.85"
                        />
                    );
                })}

                {/* Stations */}
                {stations.map(st => {
                    const pos = POSITIONS[st.id];
                    if (!pos) return null;
                    const labelY = getLabelY(pos);
                    return (
                        <g key={st.id}>
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={st.isInterchange ? 10 : 6}
                                fill="#0f172a"
                                stroke="#f1f5f9"
                                strokeWidth={2.5}
                            />
                            <text
                                x={pos.x}
                                y={labelY+10}
                                textAnchor="right"
                                fontSize="22"
                                fontWeight="500"
                                fill="#e2e8f0"
                            >
                                {st.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export default MetroMap;
