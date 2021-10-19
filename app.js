require('dotenv').config();
const chalk = require('chalk')
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
const controllers = require('./controllers');
app.use(Express.json());
app.use('/synth',controllers.synthMaker);
app.use('/user', controllers.userController);
app.use(require('./middleware/validate-jwt'));
app.use('/journal', controllers.journalController);
dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}`),
        console.log(chalk.greenBright('Database Synced'))
    });
})
.catch((err) => {
    console.log(chalk.redBright(`[Server]: Matrix Has Crashed = ${err}`))
});