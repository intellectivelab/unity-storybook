const R = require("ramda");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

module.exports = function (app) {
    app.post('/api/users/verify', function (req, res) {
        setTimeout(() => {
            const age = R.path(['body', 'formData', 'age'], req);
            console.log('REQ', req);
            if (R.is(Number, age) && age > 140) {
                res.status(400).send('Bad request ');
            } else {
                res.send({result: "success"});
            }
        }, respTime());
    });
};
