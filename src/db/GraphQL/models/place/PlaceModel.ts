// https://blog.couchbase.com/graphql-server-node-couchbase-ottoman-spatial-view/
import ottoman from 'ottoman';

export const PlaceModel = ottoman.model('Place', {
    name: 'string',
    description: 'string',
    location: {
        lat: 'number',
        lon: 'number'
    },
    created: {
        type: 'Date',
        default: Date.now
    }
});