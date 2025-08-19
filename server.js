// Express server hosting Next.js frontend and API routes (template style)

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const next = require('next');
const apiRouter = require('./routes/Api');

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
  app.use(express.json());

  // Mount API router
  app.use('/api', apiRouter);

  // Serve Next.js pages for everything else
  app.all('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3002;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server ready on http://0.0.0.0:${port}`);
  });
});


