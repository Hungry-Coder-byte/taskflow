import { config } from 'mongodb';

interface DbConfig {
  uri: string;
  dbName: string;
  options?: MongoDB.CollectionOptions;
}

const dbConfig: DbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.MONGODB_DB || 'taskflow_db',
  options: {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  },
};

async function connectToDatabase() {
  try {
    await config.connect(dbConfig.uri, dbConfig.options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

export default dbConfig;