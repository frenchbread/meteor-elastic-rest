/**
 * Represents Query class
 * @param {string} index: index provided within the query
 * @param {string} type: type of records ro be returned
 * @param {integer} size: limit of records to be returned
 * @param {object} query: query to be used by elasticsearch to return data
 * @param {array} fields: fields to be returned within provided query
 */
ElasticRest = function (config, options) {

    // Get reference to 'this'
    var self = this;

    config = {
        esHost: Meteor.settings.host
    };

    options = {
        index: 'api-umbrella-logs-v1-2015-12',
        type: 'log',
        size: 10,
        query: {
            match_all: {}
        },
        fields: [
            'request_at',
            'request_ip_country',
            'request_ip',
            'response_time',
            'request_path',
            'request_ip_location.lon',
            'request_ip_location.lat'
        ]
    };

    // TODO: change to config.host
    // Initialise host
    self._host = Meteor.settings.host;

    // Initialise options
    self._index     = options.index;
    self._type      = options.type;
    self._size      = options.size;
    self._query     = options.query;
    self._fields    = options.fields;

    // Include NPM elasticsearch package (https://www.npmjs.com/package/elasticsearch)
    var ElasticSearch = Meteor.npmRequire('elasticsearch');

    // Create the client
    var EsClientSource = new ElasticSearch.Client({
        host: Meteor.settings.elasticsearch.host
    });

    // Make it fiber aware
    var EsClient = Async.wrap(EsClientSource, ['index', 'search']);

    /**
     *  Search method
     */
    self.doSearch = function () {

        var results = EsClient.search({
            index   : self._index,
            type    : self._type,
            body    : {
                query: self._query,
                size: self._size
            }
        });

        return results;
    };
};
