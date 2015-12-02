/**
 * ElasticRest
 *
 * Wrapper around elasticsearch NPM package.
 *
 * @param {object}  config: Configuration object.
 * @param {string}  config.host: Elastic search instance URL. (example: http://elasticsearch.example.com:14002)
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

    // Initialise host
    self._host = config.host;

    // Initialise options
    self._index     = options.index;
    self._type      = options.type;
    self._size      = options.size;
    self._query     = (_isObjectWithKeys(options.query)) ? options.query : { match_all: {} };
    self._fields    = (_isArrayWithData(options.fields) ? options.fields : null);


    // Include NPM elasticsearch package (https://www.npmjs.com/package/elasticsearch)
    var ElasticSearch = Meteor.npmRequire('elasticsearch');

    // Create the client
    var EsClientSource = new ElasticSearch.Client({ host: self._host });

    // Make it fiber aware
    var EsClient = Async.wrap(EsClientSource, ['index', 'search']);


    // Search method
    self.doSearch = function () {

        // Initial search parameters
        var p = {
            index   : self._index,
            type    : self._type,
            body    : {
                query: self._query,
                size: self._size
            }
        };

        // Check if variable is an array and is not empty
        if(self._fields !== null) {

            // If true, appends an array to body object
            p.body.fields = self._fields;
        }

        // Returns found results
        return EsClient.search(p);
    };

    // Helper functions
    function _isObjectWithKeys (obj) {

        return ((typeof obj === 'object') && (Object.keys(obj).length > 0));
    }

    function _isArrayWithData (arr) {

        return ((Array.isArray(arr)) && (arr.length > 0));
    }
};