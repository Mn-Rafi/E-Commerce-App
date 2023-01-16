const db = require("../config/connection");
const collections = require("../config/collections");

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection(collections.PRODUCTS_COLLECTION)
      .insertOne(product)
      .then((data) => {
        console.log(data.insertedId);
        callback(data.insertedId);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, rejection) => {
      let products = await db
        .get()
        .collection(collections.PRODUCTS_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
};
