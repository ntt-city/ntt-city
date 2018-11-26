import { NextFunction } from 'express';

// https://blog.couchbase.com/graphql-server-node-couchbase-ottoman-spatial-view/

export const queryByLocation = (bbox = [0, 0, 0, 0], next: NextFunction) => {
    const query = couchbase.SpatialQuery.from('dev_place_by_location', 'place_by_location').bbox(bbox);

    bucket.query(query, next);
};