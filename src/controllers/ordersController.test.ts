import request from 'supertest';
import { createApp } from '../app';
import { Order } from '../model/Order';


describe('Orders Controller', () => {

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

    it('should receive an order', async () => {
        const order: Order = {
            id: '1',
            customerName: 'Customer1',
            amount: 10
        };

        const res = await request(app)
            .post('/orders/order')
            .send(order);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Orden recibida exitosamente.');
    });

    it('should get the list of orders', async () => {
        const res = await request(app).get('/orders/orders');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.orders)).toBe(true);
    });

    it('should get the list of customers', async () => {
        const res = await request(app).get('/orders/customers');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('customers');
        expect(Array.isArray(res.body.customers)).toBe(true);
    });
});