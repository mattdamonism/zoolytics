import prisma from "./prisma";

export async function addCollection(collection) {
    //log collection name
    console.log(collection.collectionName);
    //if there are categories, concatenate them
    if (Array.isArray(collection.categories)) {collection.categories = collection.categories.join(',')}
    //add collection to db
    await prisma.collection.upsert({
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
}

export async function addCollections(collections) {
    for (let collection of collections) {
        await addCollection(collection);
    }
}

export async function addCollectionAttribute(contract, collAtt) {
    //prisma does not support first char underscore, convert _id to id2
    collAtt.id2 = collAtt._id;
    delete collAtt._id;
    //extract the value field and remove from collection attribute
    let values = collAtt.value;
    //log the value
    console.log(collAtt);
    delete collAtt.value;
    if (values) {
        //if value isn't an array then it's numeric, put min and max inside array for db compatibility
        if (!Array.isArray(values)) {
            values = [values];
            values.value
        } else {
            for (let value of values) {
                value.value = value.value.toString();
            }
        }
    } else {
        //if there is no value then create an empty array, this way we only need one prisma call
        collection.value = [];
    }
    await prisma.collection.update({
        where: {
            address: contract
        },
        data: {
            attributes: {
                create: [
                    {
                        ...collAtt,
                        value: {
                            create: [
                                ...values
                            ]
                        }
                    }
                ]
            }
        }
    })
}