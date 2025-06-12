import { graphql } from 'graphql';
import { schema } from '../schema/schema';

interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string[];
}

interface LeadsQueryResult {
  leads: Lead[];
  lead: Lead;
}

describe('GraphQL Schema', () => {
  describe('Lead Type', () => {
    it('should return all leads', async () => {
      const query = `
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
      `;

      const result = await graphql({ schema, source: query });
      const data = result.data as unknown as LeadsQueryResult;
      expect(result.errors).toBeUndefined();
      expect(data.leads).toHaveLength(2);
      expect(data.leads[0]).toHaveProperty('name', 'Alice Smith');
    });

    it('should return a single lead by id', async () => {
      const query = `
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
      `;

      const result = await graphql({ schema, source: query });
      const data = result.data as unknown as LeadsQueryResult;
      expect(result.errors).toBeUndefined();
      expect(data.lead).toHaveProperty('name', 'Alice Smith');
    });
  });
}); 