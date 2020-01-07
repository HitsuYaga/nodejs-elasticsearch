const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'IP:PORT'
});

module.exports = {
  query: (index, body) => {
    return new Promise((resolve, reject) => {
      client.search({
        index: index,
        body: body
      })
      .then(function (resp) {
        return resolve(hits = resp.hits.hits);
      });
    })
  }
}
