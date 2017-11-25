const bodybuilder = require('bodybuilder');
// const bodybuilder = require('elastic-builder');
const elasticsearch = require('./services/elasticsearch')
const email = require('./services/email');

let index = "swift-storage-042017.11.23"

let body = bodybuilder()
          .sort('@timestamp', 'asc')
          .size(100)
          .build()

// const body = bodybuilder.requestBodySearch()
//                 .sort(bodybuilder.sort('@timestamp', 'asc'))
//                 .size(100)

const results = elasticsearch.query(index, body).then((results) => {
  let fullLogs = []
  results.forEach((result) => {
    let message = result["_source"]["message"]
    if (message.includes("CRON")) {
      fullLogs.push(message)
    }
  })
  email.sending(fullLogs)
})

