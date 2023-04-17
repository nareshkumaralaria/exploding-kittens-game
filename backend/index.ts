
import app from './server';

const port: number = parseInt(process.env.PORT ?? '9002', 10);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
