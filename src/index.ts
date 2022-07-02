import Express from 'express';

const app = Express();

app.use('/', Express.static(`${__dirname}/static`));

app.listen(4000, () => {
  console.log('server listen on http://localhost:4000');
});
