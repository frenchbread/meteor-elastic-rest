import { ElasticSearch } from 'elasticsearch';
import { Async } from 'async';

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
export const ElasticRest = function (config, options) {

    // Get reference to 'this'
    var self = this;

    if (!options) { options = {}}
    // Initialise host
    self._host = config.host;

    // Initialise options
    self._index  = options.index;
    self._type   = options.type;
    self._size   = options.size;
    self._query  = (_isObjectWithKeys(options.query)) ? options.query : {match_all: {}};
    self._fields = (_isArrayWithData(options.fields) ? options.fields : null);
    self._sort   = options.sort;
    self._from   = 0;


    // Include NPM elasticsearch package (https://www.npmjs.com/package/elasticsearch)

    // Create the client
    var EsClientSource = new ElasticSearch.Client({host: self._host});

    // Make it fiber aware
    var EsClient = Async.wrap(EsClientSource, ['index', 'search']);


    // Search method
    self.doSearch = function (params) {

        // Initial search parameters
        var p = {
            index: params && params.index ? params.index : self._index,
            type: params && params.type ? params.type : self._type,
            body: {
                query: params && params.query ? params.query : self._query,
                size: params && params.size ? params.size : self._size,
                from: params && params.from ? params.from : self._from
            }
        };

        // Check if variable is an array and is not empty
        if ((params && params.fields) || self._fields) {
            // If true, appends an array to body object
            p.body.fields = params && params.fields ? params.fields : self._fields;
        }
        if ((params && params.sort) || self._sort) {
            // If true, appends an array to body object
            p.body.sort = params && params.sort ? params.sort : self._sort;
        }

        // Returns found results
        return EsClient.search(p);
    };

    // Helper functions
    function _isObjectWithKeys(obj) {

        return ((typeof obj === 'object') && (Object.keys(obj).length > 0));
    }

    function _isArrayWithData(arr) {

        return ((Array.isArray(arr)) && (arr.length > 0));
    }
};
