
exports.insertDocument = (db, document, collection) => {
    //expecting collection to be a string
    const coll = db.collection(collection);
    //insert document into collection
    return coll.insertOne(document);
}; 
exports.findDocuments = (db, collection) => {
    //expecting collection to be a string
    const coll = db.collection(collection);
    return coll.find().toArray();
}; 
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};
exports.updateDocument = (db, document, update, collection) => {
    //expecting collection to be a string
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
}; 
