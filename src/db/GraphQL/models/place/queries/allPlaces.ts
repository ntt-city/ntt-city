import { GraphQLList } from 'graphql';
import { PlaceModel } from '../PlaceModel';
import { PlaceSchema } from '../Place.schema';

export const allPlaces = {

    type: new GraphQLList(PlaceSchema),

    description: 'Query for all places',

    resolve(root, args) {
        return new Promise((resolve, reject) => {
            PlaceModel.find(
                {},
                {
                    sort: {
                        created: -1
                    },
                },
                (err, places) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(places);
                });
        });
    }
};
