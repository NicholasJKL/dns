import { Client, fql, FaunaError } from "fauna";
// Use `require` for CommonJS:
// const { Client, fql, FaunaError } = require('fauna');

// Initialize the client to connect to Fauna
const client = new Client({
  secret: process.env.FAUNA_SECRET
});


exports.handler = async (event, context) => {
  try {
    // Compose a query
    const query = fql`  
        Items.all()`;

    // Run the query
    const response = await client.query(query);
    console.log(response.data)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };

  } catch (error) {
    if (error instanceof FaunaError) {
      console.log(error);
    }
  }
}