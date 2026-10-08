const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const vacancies =[
    { 
        id: 1,
        title: 'Desarrollador JR',
        company: ' tech andes',
        mode: 'remoto',
        salary: '900'
    },
    {
        id: 2,
        title: 'Analista de datos',
        company: ' tech andes',
        mode: 'presencial',
        salary: '1500'
    }
]
app.get('/vacancies', (req, res) => {
    res.json(vacancies);
});

app.post('/vacancies', (req, res) => {
    const { title, company, mode, salary } = req.body;
    if (!title || !company ) {
        return res.status(400).json({ error: 'titulo y empresa son obligatorios' });
    }   

    const newVacant = {
        id: vacancies.length + 1,
        title,
        company,
        mode,
        salary
    };
    vacancies.push(newVacant);
    res.status(201).json(newVacant);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

