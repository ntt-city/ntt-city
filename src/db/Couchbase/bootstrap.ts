import Couchbase from 'couchbase';

export const cluster = new Couchbase.Cluster('couchbase://localhost');

cluster.authenticate('example', '123456');

export const bucket = cluster.openBucket('example');
