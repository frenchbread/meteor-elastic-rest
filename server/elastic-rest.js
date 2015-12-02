/**
 * ElasticRest
 * Wrapper around elasticsearch NPM package.
 * @param {object} config: Configuration object.
 * @param {string} config.host: Elastic search instance URL. (example: http://elasticsearch.example.com:14002)
 *
 * @param {object}  options: Options object.
 * @param {string}  options.index: Search index.
 * @param {string}  options.type: Type of records ro be returned.
 * @param {int}     options.size: Amount of records to be returned.
 * @param {object}  options.query: Query options.
 * @param {array}   options.fields: Return specific fields
 */
ElasticRest = function (config, options) {

    // Get reference to 'this'
    var self = this;

    //config = {
    //    host: "hostname"
    //};

    //options = {
    //    index: 'api-umbrella-logs-v1-2015-12',
    //    type: 'log',
    //    size: 10,
    //    query: {
    //        match_all: {}
    //    },
    //    fields: [
    //        'request_at',
    //        'request_ip_country',
    //        'request_ip',
    //        'response_time',
    //        'request_path',
    //        'request_ip_location.lon',
    //        'request_ip_location.lat'
    //    ]
    //};

    // Initialise host
    self._host = config.host;

    // Initialise options
    self._index     = options.index;
    self._type      = options.type;
    self._size      = options.size;
    self._query     = options.query;
    self._fields    = options.fields;


    // Include NPM elasticsearch package (https://www.npmjs.com/package/elasticsearch)
    var ElasticSearch = Meteor.npmRequire('elasticsearch');

    // Create the client
    var EsClientSource = new ElasticSearch.Client({ host: self._host });

    // Make it fiber aware
    var EsClient = Async.wrap(EsClientSource, ['index', 'search']);

    self.doSearch = function () {

        var results = EsClient.search({
            index   : self._index,
            type    : self._type,
            body    : {
                query: self._query,
                size: self._size
                fields: self._fields
            }
        });

        return results;
    };
};
