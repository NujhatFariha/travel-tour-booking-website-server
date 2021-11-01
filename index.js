const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hnyer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

async function run (){
  try{
      await client.connect();
      const database = client.db('travel');
      const serviceCollection = database.collection('services');
      
      //Get services Api
      app.get('/services',  async(req, res) =>{
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray();
          res.send(services)
      })

  }

  finally{
      // await client.close();
  }
}


run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('running my one');
});

app.listen(port, () => {
  console.log('runnning server on port', port);
});


