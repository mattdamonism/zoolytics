// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getAttributeFilter, getCollections} from "../../services/openzoo";
import prisma from "../../services/prisma";

export default async function handler(req, res) {
  //get collections object
  let collections = await getCollections();
  //iterate through collections
  for (const collection of collections) {
    //log collection name
    console.log(collection.collectionName);
    //if there are categories, concatenate them
    if (Array.isArray(collection.categories)) {collection.categories = collection.categories.join(',')};
    //add collection to db
    const upsertCollection = await prisma.collection.upsert({
      where: {
        address: collection.address
      },
      create: {
        ...collection
      },
      update: {
        ...collection
      }
    })
    //get all possible attributes for the collection
    let collectionAttributes = await getAttributeFilter(collection.address);
    //iterate through them
    for (const collAtt of collectionAttributes) {
      //prisma does not support first char underscore, convert _id to id2
      collAtt.id2 = collAtt._id;
      delete collAtt._id;
      //extract the value field and remove from collection attribute
      let value = collAtt.value;
      delete collAtt.value;
      //log the value
      console.log(value);
      if (value) {
        //if value isn't an array then it's numeric, put min and max inside array for db compatibility
        if (!Array.isArray(value)) {
          value = [value];
        }
      } else {
        //if there is no value then create an empty array, this way we only need one prisma call
        collection.value = [];
      }
      //add attribute and its values to the db
      const updateCollection = await prisma.collection.update({
        where: {
          address: collection.address
        },
        data: {
          attributes: {
            create: [
              {
                ...collAtt,
                value: {
                  create: [
                    ...value
                  ]
                }
              }
            ]
          }
        }
      })
    }
  }
  res.status(200).json(collections);
}
