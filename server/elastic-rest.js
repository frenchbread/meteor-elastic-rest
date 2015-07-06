/**
 * Represents Query class
 * @param {string} index: index provided within the query
 * @param {string} type: type of records ro be returned
 * @param {integer} limit: limit of records to be returned
 */
ElasticRest = function (index, type, limit, query) {

    this.index = index;
    this.type = type;
    this.limit = limit;
    this.query = query;

    ElasticSearch = Meteor.npmRequire('elasticsearch');

    // create the client
    EsClientSource = new ElasticSearch.Client({
        host: Meteor.settings.elasticsearch.host
    });

    // make it fiber aware
    EsClient = Async.wrap(EsClientSource, ['index', 'search']);

    /**
     *  Search method
     */
    this.doSearch = function () {

        if(!this.query || this.query=={} || this.query=="") this.query = { match_all: {} };

        var searchData = EsClient.search({
            index: this.index,
            type: this.type,
            body: {
                query: this.query,
                size: this.limit
            }
        });

        return searchData;
    };

};
