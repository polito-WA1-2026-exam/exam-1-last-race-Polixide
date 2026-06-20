
//Builds an undirected adjacency list from a flat list of DB segments.

function buildAdjacency(stationIds, segments) {
    const adj = {};
    for (const id of stationIds) adj[id] = [];
    for (const seg of segments) {
        adj[seg.from_station].push(seg.to_station);
        adj[seg.to_station].push(seg.from_station);
    }
    return adj;
}

// BFS from every station; returns all (start, dest) pairs reachable 
// with a minimum number of segments between them.

function findValidPairs(stationIds, adj, minDistance = 3) {
    const pairs = [];
    for (const start of stationIds) {
        const dist = { [start]: 0 };
        const queue = [start];
        while (queue.length > 0) {
            const curr = queue.shift();
            for (const next of adj[curr]) {
                if (dist[next] === undefined) {
                    dist[next] = dist[curr] + 1;
                    queue.push(next);
                }
            }
        }
        for (const dest of stationIds) {
            if (dest !== start && (dist[dest] ?? -1) >= minDistance) {
                pairs.push({ start, dest });
            }
        }
    }
    return pairs;
}

export {buildAdjacency,findValidPairs}