// Import redis from redis package
import redis from "redis";

// Import promisify from util package to convert callback-based functions to promise-based functions
import { promisify } from "util";

// Create a redis client with default settings
const client = redis.createClient();

// Convert some redis client methods to promise-based methods using promisify
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

// Define the cache data function that takes a key and a value as input and stores them in redis database with an expiration time of one hour
const cacheData = async (key: string, value: any) => {
  // Convert the value to JSON string format
  const valueString = JSON.stringify(value);

  // Set the key-value pair in redis database with an expiration time of one hour using setAsync method
  await setAsync(key, valueString, "EX", 3600);
};

// Define the get data function that takes a key as input and returns the value stored in redis database or null if not found
const getData = async (key: string) => {
  // Get the value from redis database using getAsync method
  const valueString = await getAsync(key);

  // If the value is not null, parse it to JSON object format
  if (valueString) {
    const value = JSON.parse(valueString);
    return value;
  }

  // If the value is null, return null
  return null;
};

// Define the invalidate data function that takes a key as input and deletes it from redis database
const invalidateData = async (key: string) => {
  // Delete the key from redis database using delAsync method
  await delAsync(key);
};

// Export the service functions for using in other files
export { cacheData, getData, invalidateData };
