"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
// Mock data
const leads = [
    {
        id: '1',
        name: 'Alice Smith',
        email: 'alice@example.com',
        mobile: '1234567890',
        postcode: '10001',
        services: ['Plumbing', 'Electrical']
    },
    {
        id: '2',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        mobile: '9876543210',
        postcode: '90210',
        services: ['Cleaning']
    }
];
// Define Lead type
const LeadType = new graphql_1.GraphQLObjectType({
    name: 'Lead',
    fields: {
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        mobile: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        postcode: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        services: { type: (0, graphql_1.GraphQLNonNull)((0, graphql_1.GraphQLList)((0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString))) }
    }
});
// Query type
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        leads: {
            type: (0, graphql_1.GraphQLNonNull)((0, graphql_1.GraphQLList)((0, graphql_1.GraphQLNonNull)(LeadType))),
            resolve: () => leads
        },
        lead: {
            type: LeadType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) }
            },
            resolve: (_parent, args) => leads.find(lead => lead.id === args.id)
        }
    }
});
// Mutation type
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addLead: {
            type: LeadType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                mobile: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                postcode: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                services: { type: (0, graphql_1.GraphQLNonNull)((0, graphql_1.GraphQLList)((0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString))) }
            },
            resolve: (_parent, args) => {
                const newLead = {
                    id: String(leads.length + 1),
                    ...args
                };
                leads.push(newLead);
                return newLead;
            }
        }
    }
});
// Export the schema
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
