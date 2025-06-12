# Brighte Eats - Lead Generation API

TypeScript + GraphQL API for managing lead generation.

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

## API Examples

### Queries
```graphql
# Get all leads
query {
  leads {
    id
    name
    email
    mobile
    services
  }
}

# Get single lead
query {
  lead(id: "1") {
    name
    email
    services
  }
}
```

### Mutations
```graphql
# Add lead
mutation {
  addLead(
    name: "John Doe"
    email: "john@example.com"
    mobile: "1234567890"
    postcode: "12345"
    services: ["delivery"]
  ) {
    id
    name
  }
}
```

## Validation Rules
- Valid email format
- 10-digit mobile number
- Non-empty services array
- All fields required for new leads

## Features

- GraphQL API for lead management
- TypeScript for type safety
- Input validation for leads
- Test-driven development approach

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm install` - Install project dependencies
- `npm test` - Run test suite
- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm start` - Start production server

## API Documentation

### Queries

1. Get all leads:
```graphql
query {
  leads {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```

2. Get a single lead:
```graphql
query {
  lead(id: "1") {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```

### Mutations

1. Add a new lead:
```graphql
mutation {
  addLead(
    name: "John Doe"
    email: "john@example.com"
    mobile: "1234567890"
    postcode: "12345"
    services: ["delivery"]
  ) {
    id
    name
  }
}
```

2. Update a lead:
```graphql
mutation {
  updateLead(
    id: "1"
    name: "John Updated"
    email: "john.updated@example.com"
  ) {
    id
    name
    email
  }
}
```

3. Delete a lead:
```graphql
mutation {
  deleteLead(id: "1") {
    id
    name
  }
}
```

## Testing

The project uses Jest for testing. Run tests with:
```bash
npm test
```

## Development

To start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000` by default.

## Project Structure

```
src/
├── schema/
│   └── schema.ts      # GraphQL schema definition
├── __tests__/
│   ├── schema.test.ts # Schema tests
│   └── mutations.test.ts # Mutation tests
└── index.ts           # Application entry point
```

## License

[Your License]

## Author

[Your Name] 