
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

/*
  Validates the ordered list of segment IDs submitted by the player.
  Walks the segments one by one starting from startStation, checking:
  - each segment ID exists in the DB
  - each segment connects to the current station (route is not broken)
  - line changes happen only at interchange stations
  - the last station reached is destStation
*/
function validateRoute(segmentIds, startStation, destStation, segments, interchangeIds) {

    //check that routes must not involve any segment more than once
    const usedIds = new Set();
    for (const id of segmentIds){
        if(usedIds.has(id)){
            return { valid: false, invalidReason: 'Route uses the same segment more than once' };
        }
        usedIds.add(id);
    }

    const segById = Object.fromEntries(segments.map(s => [s.id, s]));


    let current = startStation;
    let currentLine = null;

    for (const id of segmentIds) {
        const seg = segById[id];
        if (!seg)
            return { valid: false, invalidReason: 'Unknown segment' };

        // Determine direction: which end of the segment connects to where we are?
        let next;
        if (seg.from_station === current){
            next = seg.to_station;
        }else if (seg.to_station === current) {
            next = seg.from_station;
        }else return { valid: false, invalidReason: 'Route is not connected' };

        // Line change: only allowed at interchange stations
        if (currentLine !== null && seg.line_id !== currentLine) {
            if (!interchangeIds.has(current))
                return { valid: false, invalidReason: 'Line change at a non-interchange station' };
        }

        currentLine = seg.line_id;
        current = next;
    }

    if (current !== destStation)
        return { valid: false, invalidReason: 'Route does not reach the destination' };

    return { valid: true, invalidReason: null };
}

// Walks the segment list, picks a random event per segment, and returns the steps. Always starts with 20 coins.
function executeRoute(segmentIds, startStation, segments, events, stationNames) {
    
    const segById = Object.fromEntries(segments.map(s => [s.id, s]));

    let coins   = 20;
    let current = startStation;
    const steps = [];

    for (const id of segmentIds) {

        const seg   = segById[id];
        const next  = seg.from_station === current ? seg.to_station : seg.from_station;
        const event = events[Math.floor(Math.random() * events.length)];

        coins += event.coin_change;

        steps.push({
            fromStation:  stationNames[current],
            toStation:    stationNames[next],
            event:        event.description,
            coinChange:   event.coin_change,
            runningTotal: coins,
        });
        current = next;
    }

    return { steps, coins };
}

export {buildAdjacency,findValidPairs,validateRoute,executeRoute}