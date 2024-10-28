import faunadb, { Create, Collection } from 'faunadb';


const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET || '' });

exports.handler = async (event, context) => {
  try {
    const data = await client.query(
      Create(Collection('Items'), { data: { name: 'Test Record' } })
    );
    console.log('successful');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Record created successfully!', data }),
    };
  } catch (error) {
    console.log('error');
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'FaunaDB error' }),
    };
  }
};