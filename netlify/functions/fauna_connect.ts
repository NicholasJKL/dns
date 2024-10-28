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
        Items.create({
        name: "key lime",
        description: "Organic, 1 ct",
        price: 79,
        category: produce,
        stock: 2000
      })`;

    // Run the query
    const response = await client.query(query);
    console.log(response.data);

  } catch (error) {
    if (error instanceof FaunaError) {
      console.log(error);
    }
  } finally {
    // Clean up any remaining resources
    client.close();
  }
}