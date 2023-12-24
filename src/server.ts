import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// Connect to MongoDB
async function main() {
  await mongoose.connect(config.database_url as string);
}

// Start Express app on specified port
app.listen(5000, () => {
  console.log(`app is listening on port ${config.port}`);
});

main();
