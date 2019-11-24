import { MongoClient, Collection, Db } from 'mongodb';
import { DatabaseError } from './errors';

const MONGO_URL = process.env.MONGO_URL!;
const MONGO_DATABASE = process.env.MONGO_DATABASE!;
let database: Db;

export default async function getMongoCollection(collectionName: string): Promise<Collection> {
  try {
    if (!database) {
      const client = await MongoClient.connect(MONGO_URL, {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
      });

      database = client.db(MONGO_DATABASE);
    }

    return database.collection(collectionName);
  } catch (err) {
    throw new DatabaseError(err, 'Database connection error');
  }
}
