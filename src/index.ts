import Express, { Application, Request, Response } from 'express';
import ExpressHandlebars from 'express-handlebars';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import flash from 'express-flash';
//* db
import conn from './db/db';

const FileStore = sessionFileStore(session);

const app: Application = Express();

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => console.log(err));
