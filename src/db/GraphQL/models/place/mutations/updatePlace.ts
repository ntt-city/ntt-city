import {
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { PlaceModel } from '../PlaceModel';
import { PlaceSchema } from '../Place.schema';

export const updatePlace = {
    type: PlaceSchema,
    description: 'Update a place',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id of the place',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the place',
        },
        description: {
            type: GraphQLString,
            description: 'Description of the place',
        },
        latitude: {
            type: GraphQLFloat,
            description: 'Latitude of the place',
        },
        longitude: {
            type: GraphQLFloat,
            description: 'Longitude of the place',
        }
    },
    resolve(source, args) {
        return new Promise((resolve, reject) => {

            PlaceModel.getById(args.id, (err, place) => {

                if (err) {
                    reject(err);
                } else {
                    if (args.name) {
                        place.name = args.name;
                    }

                    if (args.description) {
                        place.name = args.name;
                    }

                    if (args.latitude) {
                        place.location.lat = args.latitude;
                    }

                    if (args.longitude) {
                        place.location.lon = args.longitude;
                    }

                    place.save((err) => {

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