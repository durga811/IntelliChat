import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);

    throw new Error("cannot connect to MangoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("could not disconnect from MangoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
