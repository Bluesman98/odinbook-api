client repository --> https://github.com/Bluesman98/odinbook

To run locally on app.js file replace

app.use(
  cors({origin: ['https://bluesman98.github.io']})
);

with

app.use(
  cors({origin: ['http://localhost:3000']})
);

seed.js creates users in database with  faker
