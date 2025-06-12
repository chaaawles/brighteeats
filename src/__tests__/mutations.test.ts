import { graphql } from 'graphql';
import { schema } from '../schema/schema';

describe('Lead Mutations', () => {
  it('should successfully add a new lead with valid data', async () => {
    const mutation = `
      mutation {
        addLead(
          name: "John Doe"
          email: "john@example.com"
          mobile: "5555555555"
          postcode: "12345"
          services: ["delivery", "payment"]
        ) {
          id
          name
          email
          mobile
          postcode
          services
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    
    expect(result.errors).toBeUndefined();
    expect(result.data?.addLead).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '5555555555',
      postcode: '12345',
      services: ['delivery', 'payment']
    });
  });

  it('should fail when required fields are missing', async () => {
    const mutation = `
      mutation {
        addLead(
          name: "John Doe"
          email: "john@example.com"
          mobile: "5555555555"
          postcode: "12345"
        ) {
          id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.errors).toBeDefined();
  });

  it('should fail when email is invalid', async () => {
    const mutation = `
      mutation {
        addLead(
          name: "John Doe"
          email: "invalid-email"
          mobile: "5555555555"
          postcode: "12345"
          services: ["delivery"]
        ) {
          id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.errors).toBeDefined();
  });

  it('should fail when mobile number is invalid', async () => {
    const mutation = `
      mutation {
        addLead(
          name: "John Doe"
          email: "john@example.com"
          mobile: "123"
          postcode: "12345"
          services: ["delivery"]
        ) {
          id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.errors).toBeDefined();
  });

  it('should fail when services array is empty', async () => {
    const mutation = `
      mutation {
        addLead(
          name: "John Doe"
          email: "john@example.com"
          mobile: "5555555555"
          postcode: "12345"
          services: []
        ) {
          id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.errors).toBeDefined();
  });
}); 