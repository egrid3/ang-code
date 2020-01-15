module.exports = {
  // connection to Mongodb Atlas with username and password (need to create another user for this database)

  // local database: mongodb://localhost:27017/meanauth; production below
  database: 'mongodb+srv://<username>:<password>@cluster0-tmehh.mongodb.net/meanauth?retryWrites=true&w=majority',
  secret: 'thesecret'
}
