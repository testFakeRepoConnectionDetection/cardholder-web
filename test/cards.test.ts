import { listCards } from '../src/services/cardsClient';

// Runs against the WireMock stubs in test/stubs (docker compose -f test/compose.yml up).
describe('cards client', () => {
  beforeAll(() => {
    process.env.ISSUING_API_URL = 'http://localhost:8089';
  });

  it('lists the cards of a customer', async () => {
    const cards = await listCards('C-1001');
    expect(cards[0].maskedPan).toMatch(/\*{4}/);
  });
});
