import mongoose, { ConnectOptions } from "mongoose";

mongoose.set('autoIndex', true);

mongoose.set('maxTimeMS', 10000)

let connection: typeof import("mongoose") | undefined;

async function disconnect() {
  await connection?.disconnect()

  connection = undefined
}

async function connect(cb?: () => Promise<void>) {

  if (connection == null) {
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 2000
    }

    let uri = process.env.TEST_DB_URI as string

    if (!uri) {
      throw ("DB_URI is not configured")
    }

    uri += `_${process.env.VITEST_WORKER_ID}`

    process.env.LOG && console.log("connection to", uri)

    connection = await mongoose.connect(uri, options)

    if (cb) await cb()
  }

  return connection;
}

export { connect, disconnect };
