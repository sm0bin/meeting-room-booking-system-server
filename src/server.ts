import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    server = app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
