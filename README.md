# ElasticRest

A package for meteor that makes it easy to fetch data from elasticsearch server.
See elastic [docs](https://www.elastic.co/guide/index.html).

## Installation

```
$ meteor add frenchbread:elastic-rest
```

## Usage

#### Setup:
```javascript
var config = {
    host: "http://elasticsearch.example.com:14002"
};

var options = {
    index: 'search_index',
    type: 'search_type',
    size: 10,
    query: {
        match_all: {}
    },
    fields: [
        'field_one',
        'field_two',
        'field_three',
        'field_four',
    ]
};

var es = new ElasticRest(config, options);

es.doSearch();
```

#### Sample output:
```javascript
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

## License

[MIT](https://github.com/frenchbread/meteor-elastic-rest/blob/master/LICENSE)

