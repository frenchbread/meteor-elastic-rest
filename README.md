# ElasticRest

A package for meteor that makes it easy to fetch data from elasticsearch server.
See elastic [docs](https://www.elastic.co/guide/index.html).

## Installation

1. In you project directory, simply run:
    
    ```
    meteor add frenchbread:elastic-rest
    ```

2. Setup ```settings.json``` file in project root directory
    ```
        {
            "elasticsearch": {
                "host": "full_hostname_with_port_number_here"
            }
        }
    ```

3. Run meteor

    ```
    meteor --settings setting.json
    ```

## Docs
### ElasticRest class:

####Parameters:

    new ElasticSearch(index, type, limit, query)
    
* `index` - String
* `type`  - String
* `limit` - Integer
* `query` - Object

More about queries in [elastic docs](https://www.elastic.co/guide/en/elasticsearch/reference/1.6/query-dsl.html)

####Properties:

Properties are created from parameters and cab be overridden.

* `index` - search index
* `type`  - seach type
* `limit` - result limit
* `query` - elasticsearch query

####Methods:
* `doSearch()`

## Usage example


    var newQuery = new ElasticRest("index_here","type_here", 10, { match_all: {} });
    newQuery.doSearch();
    
Example output:
```
{
    took: 159,
    timed_out: false,
    _shards: {
        total: 3,
        successful: 3,
        failed: 0
    },
    hits:
    {
        total: 16927,
        max_score: 1,
        hits:
        [
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object]
        ]
    }
}
```
