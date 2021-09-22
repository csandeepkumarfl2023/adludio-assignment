import express from "express";
import BaseRouter from './routes';
import cors from 'cors';
import bodyParser from 'body-parser'

const port = process.env.NODE_PORT || 4848;

export function run () {
  const app = express();
  app.use(bodyParser());

  app.get("/", function(_, res) {
    res.type('text/plain').send("Food can be served");
  });
  
  app.use(cors())
  app.use('/api/', BaseRouter);

  return app.listen(port, function () {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
}

if(process.env.NODE_ENV !== 'testing') {
  run();
}
