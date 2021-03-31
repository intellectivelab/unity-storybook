const R = require("ramda");

const components = require('../config/components');

const NO_DELAY = true; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 100) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

module.exports = function (app) {
    app.get('/api/applications/:caseId', function (req, res) {
        setTimeout(() => {
            res.send({
                fields: {
                    caseId: 1000,
                    formConfigId: 1000,
                    EP_Status: "Draft"
                },
                _links: {
                    self: {
                        href: "/api/applications/1000"
                    },
                    view: {
                        href: "/api/applications/1000/view"
                    },
                    create: {
                        href: "/api/applications/attach?scope=ce_repository"
                    }
                }
            });
        }, respTime());
    });

    app.put('/api/applications/:caseId', function (req, res) {
        setTimeout(() => {
            res.send({result: "success"});
        }, respTime());
    });

    app.post('/api/applications/:caseId', function (req, res) {
        setTimeout(() => {
            res.send({result: "success"});
        }, respTime());
    });

    app.get('/api/applications/:caseId/view', function (req, res) {
        setTimeout(() => {
            res.send(components['caseView']);
        }, respTime());
    });

    app.post('/api/applications/attach', (req, res) => {
        if (req.params.scope) {
            setTimeout(() => {
                res.send({});
            }, respTime());
        } else {
            res.status(400).send('parameter scope is undefined');
        }
    });

    app.get('/api/config/forms/:formConfigId', function (req, res) {
        setTimeout(() => {
            res.send(components['application_form']);
        }, respTime());
    });

    app.put('/api/config/forms/:formConfigId', function (req, res) {
        setTimeout(() => {
            res.send({result: "success"});
        }, respTime());
    });

    app.get('/api/forms/:formConfigId/:caseId', function (req, res) {
        const caseId = req.params.caseId;
        const formConfigId = req.params.formConfigId;

        if (formConfigId === undefined) {
            res.status(404).send('Sorry cant find form data');
            return;
        }

        const data = {
            caseId,
            formConfigId,
            fields: {"test": "123", "browser": "Chrome", "caseId": caseId},
            _links: {
                self: {
                    "href": "/api/forms/" + formConfigId
                }
            }
        };

        setTimeout(() => {
            res.send(data);
        }, respTime());
    });

    app.post('/api/forms/:formConfigId/:caseId', function (req, res) {
        setTimeout(() => {
            res.send({result: "success"});
        }, respTime());
    });
};