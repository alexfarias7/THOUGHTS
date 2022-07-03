import Express, { Application, NextFunction, Request, Response } from 'express';
import ExpressHandlebars from 'express-handlebars';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import os from 'os';

import flash from 'express-flash';
//* db
import conn from './db/conn';
declare module 'express-session' {
  export interface SessionData {
    userid: { [key: string]: any };
  }
}

const FileStore = sessionFileStore(session);

const app: Application = Express();
const port = 3000;

app.use(Express.json());
app.engine('handlebars', ExpressHandlebars.engine());

app.use(
  Express.urlencoded({
    extended: true,
  }),
);

app.use(
  session({
    name: 'session',
    secret: 'mysecret',
    resave: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  }),
);

//* flash messages
app.use(flash());
//* public path
app.use(Express.static('public'));
//* set session to res
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err: any) => console.log(err));
