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
    meteor --settings settings.json
    ```

## Docs
### ElasticRest class:

#### Parameters:

    new ElasticRest(index, type, limit, query, fields)
    
* `index`   - String
* `type`    - String
* `limit`   - Integer
* `query`   - Object
* `fields`  - Array

More about queries in [elastic docs](https://www.elastic.co/guide/en/elasticsearch/reference/1.6/query-dsl.html)

#### Properties:

Properties are created from parameters and cab be overridden.

* `index`   - search index
* `type`    - seach type
* `limit`   - result limit
* `query`   - elasticsearch query
* `fields`  - fields to be returned

#### Methods:
* `doSearch()` - returns Elastic Search response within provided arguments (filtering etc.)

## Usage example

```javascript
    var q = new ElasticRest(
                "index_here",   // index - can be empty
                "type_here",  // type  - can be empty
                10,    // size  - 0 by default
                {
                    match_all: {}
                },
                ["message", "createdAt"]  // fields - array of fields to be returned
            );
            
    q.doSearch();
```
    
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
