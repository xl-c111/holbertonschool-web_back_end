import express from 'express';
import router from './routes/index';

const app = express();
const port = 1245;

app.use('/', router);
app.use('/students', router);
app.use('/students:major', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
