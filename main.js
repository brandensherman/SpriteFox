const { db } = require('./server/db');
const app = require('./server');
const PORT = process.env.PORT || 3000;

const init = async () => {
  await db.sync();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
};

init();
