import fetch from "node-fetch";
import { MongoClient } from "mongodb";

async function saveSession(sessionData) {
  const uri = "mongodb://x:27017";
  const dbName = "x";
  const collectionName = "x";

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = { context: "/sessions" };
    const update = { $set: sessionData };
    const options = { upsert: true };
    await collection.updateOne(query, update, options);
  } finally {
    await client.close();
  }
}

async function auth() {
  const data = {
    login: "x",
    password: "x",
    "remember-me": true,
  };

  const resp = await fetch("https://api.tastyworks.com/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const respJson = await resp.json();
  await saveSession(respJson);
}

auth();
