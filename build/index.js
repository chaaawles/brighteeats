"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema/schema");
const express_2 = require("graphql-http/lib/use/express");
const app = (0, express_1.default)();
app.use('/graphql', (0, express_2.createHandler)({ schema: schema_1.schema }));
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
