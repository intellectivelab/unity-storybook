module.exports = [
	{
		"name": "country",
		"refreshTimeout": "-1",
		"_links": {
			"self": {
				"href": "/api/selectors/country",
				"type": "application/json"
			},
			"query": {
				"href": "/api/selectors/country/items?limit=10&offset=0",
				"type": "application/json"
			}
		}
	},

	{
		"name": "state",
		"queryContext": [
			"country"
		],
		"refreshTimeout": "-1",
		"_links": {
			"self": {
				"href": "/api/selectors/state",
				"type": "application/json"
			},
			"query": {
				"href": "/api/selectors/state/items?limit=10&offset=0",
				"type": "application/json"
			}
		}
	},

	{
		"name": "stateCode",
		"queryContext": [
			"countryCode"
		],
		"refreshTimeout": "-1",
		"_links": {
			"self": {
				"href": "/api/selectors/stateCode",
				"type": "application/json"
			},
			"query": {
				"href": "/api/selectors/state/items?limit=10&offset=0",
				"type": "application/json"
			}
		}
	}



];
