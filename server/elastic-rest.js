/**
 * Represents Query class
 * @param {string} index: index provided within the query
 * @param {string} type: type of records ro be returned
 * @param {integer} size: limit of records to be returned
 * @param {object} query: query to be used by elasticsearch to return data
 * @param {array} fields: fields to be returned within provided query
 */
ElasticRest = function (index, type, size, query, fields) {

    // initial values
    this.index  = "";
    this.type   = "";
    this.size   = 0;
    this.query  = {
        match_all: {}
    };
    this.fields = [];

    // assigning provided values to local variables
    this.index  = index;
    this.type   = type;
    this.size   = size;
    this.query  = query;
    this.fields = fields;

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

        if(!this.query  || this.query   ==  {}  || this.query   ==  "") this.query  = { match_all: {} };

        var body = {
            query: this.query,
            size: this.size
        };

        if(!this.fields || this.fields  ==  []  || this.fields  ==  "") { } else { body.fields = this.fields; }

        var searchData = EsClient.search({
            index   : this.index,
            type    : this.type,
            body    : body
        });


        return searchData;
    };

};
