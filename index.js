const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

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
        console.log('Dropped Collection:', result);

        //insert document into database
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);
            
            //find all documents
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                //update document in database
                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        //find all documents
                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            //remove document in database
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});