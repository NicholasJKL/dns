import { Client, fql, FaunaError } from "fauna";


const client = new Client({
  secret: process.env.FAUNA_SECRET
});


exports.handler = async (event: any, context: any) => {
  try {
    const query = fql`  
        Items.all()`;

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
