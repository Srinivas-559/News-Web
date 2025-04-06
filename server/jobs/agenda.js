// jobs/agenda.js - Setup Agenda with MongoDB
const Agenda = require('agenda');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongoConnectionString = process.env.MONGO_URI; // Update with your DB
if (!mongoConnectionString) {
    console.error('❌ MONGO_URI is not defined in .env file');
    process.exit(1);
}
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });

// Define the email notification job
agenda.define('send email notification', async (job) => {
    const { email, subject, message } = job.attrs.data;
    const sendEmail = require('../utils/email');
    await sendEmail(email, subject, message);
});

(async function() {
    await agenda.start(); // Start Agenda
})();

module.exports = agenda;
