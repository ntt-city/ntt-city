import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { PlaceModel } from '../PlaceModel';
import { PlaceSchema } from '../Place.schema';

export const deletePlace = {
    type: PlaceSchema,
    description: 'Delete a place',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id of the place',
        },
    },
    resolve(source, args) {
        return new Promise((resolve, reject) => {
            PlaceModel.getById(args.id, (err, place) => {
                if (err) {
                    reject(err);
                } else {
                    place.remove((err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(place);
                    });
                }
            });
        });
    }
};
