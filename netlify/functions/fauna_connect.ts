import faunadb from 'faunadb';


const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET || '' });

exports.handler = async (event, context) => {
  try {
    const data  = await client.query(
      q.Create(q.Collection('your_collection'), { data: { name: 'Test Record' } })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Record created successfully!', data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'FaunaDB error' }),
    };
  }
};