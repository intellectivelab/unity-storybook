const users = require("./users");
const usersAnalytics = require("./usersAnalytics");
const caseTasks = require("./caseTasks");
const caseTasksAnalytics = require("./caseTasksAnalytics");
const documents = require("./documents");
const attachments = require("./attachments");

module.exports = {
    ...users,
    ...usersAnalytics,
    ...caseTasks,
    ...caseTasksAnalytics,
    ...documents,
    ...attachments
};