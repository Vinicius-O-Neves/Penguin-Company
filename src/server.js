const oracledb = require('oracledb');


async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "system", password: "1234", connectionString: "localhost:1521/xepdb1" });

    console.log("Successfully connected to Oracle Database");

    connection.commit();
    
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();