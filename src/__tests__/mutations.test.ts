import { graphql } from 'graphql';
import { schema } from '../schema/schema';

describe('Lead Mutations', () => {
  let createdLeadId: string;

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

    // Save ID for later update/delete tests
    createdLeadId = (result.data as { addLead: { id: string } }).addLead.id;
  });

  it('should update the lead with new values', async () => {
    const mutation = `
      mutation {
        updateLead(
          id: "${createdLeadId}"
          name: "John Updated"
          email: "john.updated@example.com"
        ) {
          id
          name
          email
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });

    expect(result.errors).toBeUndefined();
    expect(result.data?.updateLead).toMatchObject({
      id: createdLeadId,
      name: 'John Updated',
      email: 'john.updated@example.com'
    });
  });

  it('should delete the lead', async () => {
    const mutation = `
      mutation {
        deleteLead(id: "${createdLeadId}") {
          id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: mutation });

    expect(result.errors).toBeUndefined();
    expect(result.data?.deleteLead).toHaveProperty('id', createdLeadId);
    expect(result.data?.deleteLead).toHaveProperty('name');
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
