
const request = require('supertest');
const app = require('./server');

describe('GET /vacancies', () => {
    it('responds with 200 and an array of vacancies', async () => {
        const response = await request(app).get('/vacancies');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
})

describe('POST /vacancies', () => {
    it('create a vacancy and responds with 201', async () => {
        const newVacancy = {
            title: 'Ingeniero de software',
            company: 'Tech Company',
            mode: 'remoto',
            salary: '2000'
        };
        const response = await request(app).post('/vacancies').send(newVacancy);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newVacancy);
        expect(response.body.id).toBeDefined();

    });

    it('responds with 400 if title or company is missing', async () => {
        const response = await request(app).post('/vacancies').send({
            mode: 'presencial'
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('titulo y empresa son obligatorios');
    });
});