const caseTasks = require("./caseTasks");
const caseAttachments = require("./caseAttachments");
const users = require("./users");
const forms = require("./forms");

module.exports = {
    ...caseTasks,
    ...users,
    ...caseAttachments,
    ...forms
};
