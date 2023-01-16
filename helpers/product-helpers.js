const db = require("../config/connection");
const collections = require("../config/collections");
const { resolve } = require("path");
const objId = require("mongodb").ObjectId;

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection(collections.PRODUCTS_COLLECTION)
      .insertOne(product)
      .then((data) => {
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
  deleteProductById: (prodId) => {
    return new Promise((resolve, rejection) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .deleteOne({ _id: objId(prodId) })
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            resolve("something went wrong");
          }
        });
    });
  },
  getProductById: (prodId) => {
    return new Promise(async (resolve, rejection) => {
      let product = await db
        .get()
        .collection(collections.PRODUCTS_COLLECTION)
        .findOne({ _id: objId(prodId) });
      resolve(product);
    });
  },
  updateProductById: (id, productData) => {
    console.log(productData);
    console.log(id);
    return new Promise((resolve, rejection) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .updateOne({ _id: objId(id) }, { $set: {
          tile:productData.tile,
          category:productData.category,
          Description:productData.Description
        } })
        .then((response) => {
          resolve(response);
        });
    });
  },
};
