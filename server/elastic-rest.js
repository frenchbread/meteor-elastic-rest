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
     * index: index provided within the query
     * type : type of records ro be returned
     * count: limit of records to be returned
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
