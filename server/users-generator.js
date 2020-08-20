const faker = require('faker');
const countryStateCity = require('./data/countryStateCity');
const industries = require('./data/industries');

const fs = require("fs");

const randomProperty = function (obj) {
	const keys = Object.keys(obj);

	return keys[keys.length * Math.random() << 0];
};

function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const genders = ['Male', 'Female'];

const generateUsers = (countries, usersCnt) => {
	let writeStream = fs.createWriteStream('users.json');

	writeStream.write('[');

	let countryCnt = countries;

	while (countryCnt > 0) {
		const country = faker.random.arrayElement(countryStateCity);

		const countryCode = country.iso2;
		const countryName = country.name;

		if (countryName.split(' ').length === 1 && country.states) {
			for (let k = 0; k < faker.random.number(usersCnt); k++) {
				const id = faker.random.uuid();

				const genderIdx = faker.random.number(1);
				const gender = genders[genderIdx];

				const firstName = faker.name.firstName(genderIdx);
				const lastName = faker.name.lastName(genderIdx);
				const fullName = faker.name.findName(firstName, lastName, genderIdx);

				const username = faker.internet.userName(firstName, lastName);
				const email = faker.internet.email(firstName, lastName);

				const dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
				const age = faker.random.number({min: 21, max: 77});
				const phone = faker.phone.phoneNumber();

				const jobArea = faker.random.arrayElement(industries);

				for (let z = 0; z < faker.random.number(15); z++) {
					const jobType = faker.name.jobType();
					const jobDescriptor = faker.name.jobDescriptor();
					const jobTitle = jobDescriptor + " " + jobArea + " " + jobType;

					const zipCode = faker.address.zipCode();

					const state = randomProperty(country.states);
					const city = randomElement(country.states[state] || []);

					const companyName = faker.company.companyName();
					const salary = faker.random.number({min: 10000, max: 35000});

					let chunk = JSON.stringify({
						id,
						gender,
						firstName,
						lastName,
						fullName,
						username,
						email,
						dob,
						age,
						phone,
						jobArea,
						jobType,
						jobDescriptor,
						jobTitle,
						zipCode,
						countryCode,
						countryName,
						state,
						city,
						companyName,
						salary
					});
					writeStream.write(chunk);
					writeStream.write(',');
				}
			}

			countryCnt--;
		}
	}
	writeStream.write(']');
	writeStream.end();
};

generateUsers(10, 350);