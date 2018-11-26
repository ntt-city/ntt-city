import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { LocationSchema } from '../location/Location.schema';

export const PlaceSchema = new GraphQLObjectType({
    name: 'Place',
    description: 'Place description',
    fields: {
        id: {
            type: GraphQLString,
            resolve(place) {
                return place._id;
            }
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        location: {
            type: LocationSchema,
        },
        created: {
            type: GraphQLString,
        }
    }
});