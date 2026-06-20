
//Builds an undirected adjacency list from a flat list of DB segments.

function buildAdjacency(stationIds, segments) {

    const adj = {};

    for (const id of stationIds) adj[id] = []; // example: adj = {'1': [] , '2': []}

    for (const seg of segments) {

        adj[seg.from_station].push(seg.to_station);
        adj[seg.to_station].push(seg.from_station);

    }
    // segments: {id: 1,from_station: 1,to_station: 3 ,...} , adj = {'1' : [3] , '2' : [] , '3': [1]}

    return adj;
}

// BFS from every station; returns all (start, dest) pairs reachable 
// with a minimum number of segments between them.

function findValidPairs(stationIds, adj, minDistance = 3) {

    const pairs = [];

    for (const start of stationIds) {

        //we start with a vector of distances initialized to 0 for eact station
        const dist = { [start]: 0 };
        //we initialize the queue with the first station
        const queue = [start];

        while (queue.length > 0) {
            //extract the first element
            const curr = queue.shift();
            //for each station in the adjacency list of that station we update the distance
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