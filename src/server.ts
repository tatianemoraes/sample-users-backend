import cors from 'cors';
import express from 'express';
import connect from './Database/db';

import routes from './routes';

const app = express();
// trata tudo o que vem no body da requisição para JSON
app.use(express.json());
app.use(cors());

app.use(routes);

connect();

// a função listen é para ativar o servidor NodeJS
app.listen(3000, () => console.log('running at http://localhost:3000'));
