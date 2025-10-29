import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import chalk from 'chalk';
import initDatabase from './Startup/initDatabase.js'

const app = express();

const PORT = config.get('PORT') || 3001;

const mongodb_URL = config.get('MONGODB_URI');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if(process.env.NODE_ENV === 'production') {
//     console.log('NODE_ENV=production');
// } else {
//     console.log('NODE_ENV=development');
// }
async function start() {
    try {
        mongoose.connect.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(mongodb_URL);
        console.log('MongoDb Connected!');
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}`));
        })
    } catch(e) {
        console.log('1111111111');
        console.log(chalk.red(`Server Error: ${e}`));
        process.exit(1);
    }
}

start()