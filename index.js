const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';


MongoClient.connect(url, { useUnifiedTopology: true } , (err, client) => {

    /*  we are checking if he first parameter (err) strictly equals the second parameter (null)
        if they do match we will continue
        if they do not match err != null then the assert will fail
        when an assert fails it will throw an error and terminate the entire application
        and will log the error that occurred 
    */
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    //this method will connect us to the database on mongodb server
    const db = client.db(dbname);

    //delete (drop) everything that is in the database
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped collection', result);

        // make a collection
        const collection = db.collection('campsites');

        //insert document into collection in database
        collection.insertOne({ name: "breadcrumb Trail Campground", description: "Test" },
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document: ', result.ops);

            //list documents added into collection
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Document: ', docs);

                //close client connection to mongodb server
                client.close();
            });
        });
    });  
});
