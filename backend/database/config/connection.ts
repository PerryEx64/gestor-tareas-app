import sequelize from './database';

const MAX_RETRIES = 5;
let retries = 0;

export const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    retries++;
    console.error(`DB connection failed (${retries}/${MAX_RETRIES})`);

    if (retries >= MAX_RETRIES) {
      console.error('Could not connect to DB. Exiting...');
      retries = 0;
      process.exit(1);
    }

    setTimeout(connectWithRetry, 5000);
  }
};
