import request from 'supertest';
import { createApp } from '../app';
import { Beer } from '../model/Beer';

describe('Beers Controller', () => {

    let server: any;
    let app: any;

    beforeAll(() => {
        app = createApp();
        server = app.listen(3001, () => {
            console.log('Server started for testing');
        });
    });

    afterAll((done) => {
        server.close(done);
    })

    it('should get the list of beers', async () => {
        const res = await request(app).get('/beers/list');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('beers');
        expect(Array.isArray(res.body.beers)).toBe(true);

        res.body.beers.forEach((beer: Beer) => {
            expect(beer).toHaveProperty('id');
            expect(beer).toHaveProperty('name');
            expect(beer).toHaveProperty('price');
        });
    });
});