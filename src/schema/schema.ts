import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';
  
  // Test data
  const leads = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      mobile: '1234567890',
      postcode: '10001',
      services: ['delivery', 'pick-up']
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      mobile: '9876543210',
      postcode: '90210',
      services: ['payment', 'delivery']
    }
  ];
  
  // Define Lead
  const LeadType = new GraphQLObjectType({
    name: 'Lead',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      mobile: { type: new GraphQLNonNull(GraphQLString) },
      postcode: { type: new GraphQLNonNull(GraphQLString) },
      services: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLString))
        )
      }
    }
  });
  
  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
      leads: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(LeadType))
        ),
        resolve: () => leads
      },
      lead: {
        type: LeadType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (_parent, args) => leads.find(lead => lead.id === args.id)
      }
    }
  });
  
  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  // Mutation
  const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addLead: {
        type: LeadType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          mobile: { type: new GraphQLNonNull(GraphQLString) },
          postcode: { type: new GraphQLNonNull(GraphQLString) },
          services: {
            type: new GraphQLNonNull(
              new GraphQLList(new GraphQLNonNull(GraphQLString))
            )
          }
        },
        resolve: (_parent, args) => {
          // Validate email
          if (!validateEmail(args.email)) {
            throw new Error('Invalid email format');
          }

          // Validate mobile
          if (!validateMobile(args.mobile)) {
            throw new Error('Invalid mobile number format');
          }

          // Validate services
          if (args.services.length === 0) {
            throw new Error('Services array cannot be empty');
          }

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
  
  // Export schema
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
  });
  