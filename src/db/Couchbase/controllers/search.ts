import Couchbase from 'couchbase';
import { Request, Response } from 'express';
import { bucket } from '../bootstrap';

// https://blog.couchbase.com/developing-a-typeahead-with-couchbase-node-js-and-full-text-search/
export const postContact = (req: Request, res: Response) => {
    const SearchQuery = Couchbase.SearchQuery;
    const query = SearchQuery.new(
        'idx-music',
        SearchQuery.match(req.query.query).fuzziness(1)
    );
    query.fields(['title', 'artists']);
    bucket.query(query, (error, result, meta) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }
        result = result.map(item => {
            return {
                id: item.id,
                score: item.score,
                title: item.fields.title,
                artist: item.fields.artist
            };
        });
        res.send(result);
    });
};
