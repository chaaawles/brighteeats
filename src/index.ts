import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema';

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

