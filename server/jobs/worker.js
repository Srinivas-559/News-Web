// jobs/worker.js - Starts Agenda and Processes Jobs
const agenda = require('./agenda');

(async function() {
    await agenda.start(); // Start Agenda
    console.log('📢 Agenda Worker Started...');
})();
