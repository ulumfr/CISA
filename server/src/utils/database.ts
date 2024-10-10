import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";
import { number } from "yup";
dotenv.config();

let connection: Pool;

const connect = async () => {
  try {
    // connection = createPool({
    //   host: process.env.HOST_DB || "",
    //   user: process.env.USER_DB || "",
    //   database: process.env.DATABASE_NAME || "",
    //   password: process.env.PASSWORD_DB || "",
    //   port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 3306,
    //   connectionLimit: 120,
    // });
    connection = createPool({
      host: process.env.HOST_DB || "",
      user: process.env.USER_DB || "",
      database: process.env.DATABASE_NAME || "",
      password: process.env.PASSWORD_DB || "",
      connectionLimit: 120,
    });
    // console.log(process.env.PORT_DB);

    console.log("Connected to the MySQL database.");

    return connection;
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error);
    throw error;
  }
};
export default connect;
