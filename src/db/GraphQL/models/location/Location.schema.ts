import {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLNonNull,
} from 'graphql';

export const LocationSchema = new GraphQLObjectType({
    name: 'Location',
    description: 'Geographical location',
    fields: {
        lat: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Latitude',
        },
        lon: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Longitude',
        },
    }
});