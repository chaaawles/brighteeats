import express from 'express';
import { schema } from './schema/schema';
import { createHandler } from 'graphql-http/lib/use/express';

const app = express();

app.use('/graphql', createHandler({ schema }));

// Optionally serve GraphiQL
app.get('/', (_req, res) => {
  res.send(`
    <html>
      <body>
        <a href="/graphql">Go to /graphql</a>
      </body>
    </html>
  `);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
