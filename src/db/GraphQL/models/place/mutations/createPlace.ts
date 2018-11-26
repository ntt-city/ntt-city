import {
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { PlaceModel } from '../PlaceModel';
import { PlaceSchema } from '../Place.schema';

export const createPlace = {
    type: PlaceSchema,
    description: 'Create a place',
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of the place',
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Description of the place',
        },
        latitude: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Latitude of the place',
        },
        longitude: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Longitude of the place',
        }
    },
    resolve(source, args) {
        return new Promise((resolve, reject) => {
            const place = new PlaceModel({
                name: args.name,
                description: args.description,
                location: {
                    lat: args.latitude,
                    lon: args.longitude,
                },
            });

            place.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve(place);
            });
        });
    }
};