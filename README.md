# elastic-rest

Wrapper for Elastic Search REST API based on elasticsearch [npm package](https://www.npmjs.com/package/elasticsearch).

See ES [docs](https://www.elastic.co/guide/index.html).

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
    from: 0,
    query: {
        match_all: {}
    },
    fields: [
        'field_one',
        'field_two',
        'field_three',
        'field_four',
    ],
    sort: [{'field_one':'desc'}]
};

var es = new ElasticRest(config, options);

es.doSearch();
```

or 

```
// initialize without query options
var config = {
    host: "http://elasticsearch.example.com:14002"
};
var es = new ElasticRest(config);

// and pass options as parameter at the time of querying
var options = {
    index: 'search_index',
    type: 'search_type',
    size: 10,
    from: 0,
    query: {
        match_all: {}
    },
    fields: [
        'field_one',
        'field_two',
        'field_three',
        'field_four',
    ],
    sort: [{'field_one':'desc'}]
};

es.doSearch(options);
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

