// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getAttributeFilter, getCollections} from "../../services/openzoo";
import * as database from "../../services/database";

export default async function handler(req, res) {
  //get collections and add to database
  let collections = await getCollections();
  await database.addCollections(collections);
  //iterate through collections
  for (const collection of collections) {
    //get all possible attributes for the collection
    let collectionAttributes = await getAttributeFilter(collection.address);
    //iterate through them
    for (const collAtt of collectionAttributes) {
      //add attribute to the collection in the db
      await database.addCollectionAttribute(collection.address, collAtt)
    }
  }
  res.status(200).json("All Collections and Attributes Imported");
}
