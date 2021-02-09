module.exports = {
	"usersGrid": {
		"id": "usersGrid",
		"title": "Users",
		"columns": [
			{
				"name": "id",
				"label": "Id",
				"dataType": "string",
				"width": 100,
				"multiValue": false,
				"tooltip": "",
				"sortable": false,
				"resizable": false
			},
			{
				"name": "fullName",
				"label": "Name",
				"dataType": "string",
				"width": 200,
				"tooltip": "",
				"sortable": true,
				"resizable": true,
				"header": "Personal Info"
			},
			{
				"name": "gender",
				"label": "Gender",
				"dataType": "string",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true,
				"header": "Personal Info"
			},
			{
				"name": "dob",
				"label": "Date of Birth",
				"dataType": "date",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "age",
				"label": "Age",
				"dataType": "int",
				"width": 50,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "email",
				"label": "Email",
				"dataType": "string",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true,
				"header": "Personal Info"
			},
			{
				"name": "phone",
				"label": "Phone",
				"dataType": "string",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			}
		],
		"favorite": ["fullName"],
		"default": ["fullName", "gender", "dob", "email"],
		"sorting": [
			{
				"column": "gender",
				"direction": "DESC"
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/usersGrid",
				"type": "application/json"
			},
			"actions": {
				"href": "/api/config/grids/usersGrid/actions",
				"type": "application/json"
			}
		}
	},
	"UserView": {
		"id": "UserView",
		"resourceName": "documents",
		"resourceType": "Employee",
		"viewType": "Open",
		"tabs": [{
			"id": "1",
			"title": "Details",
			"tooltip": "Employee Details",
			"type": "Details",
			"fieldSetId": "usersViewFieldsetVerify",
			"_links": {
				"root": {
					"href": "/api/config/components/UserView",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/components/UserView/tabs/1",
					"type": "application/json"
				},
				"actions": {
					"href": "/api/config/components/UserView/tabs/1/actions",
					"type": "application/json"
				},
				"fieldset": {
					"href": "/api/config/components/UserViewFieldset",
					"type": "application/json"
				}
			}
		}],
		"_links": {
			"self": {
				"href": "/api/config/components/UserView",
				"type": "application/json"
			},
			"header": {
				"href": "/api/config/components/UserView/header",
				"type": "application/json"
			}
		}
	},
	"UserViewFieldset": {
		"header": [
			{
				"name": "fullName",
				"label": "Name",
				"dataType": "string",
			},
			{
				"name": "gender",
				"label": "Gender",
			},
			{
				"name": "dob",
				"label": "Date of Birth",
				"dataType": "date",
			},
			{
				"name": "salary",
				"label": "Salary",
				"dataType": "number",
				"format": "$+1,000.00",
			},
		],
		"fields": [
			{
				"name": "fullName",
				"label": "Name",
				"dataType": "string",
				"fullWidth": true
			},
			{
				"name": "gender",
				"label": "Gender",
				"dataType": "select",
				"options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}],
				"required": true,
				"favorite": true,
				"inline": true,
				"width": 100,
				"tooltip": ""
			},
			{
				"name": "dob",
				"label": "Date of Birth",
				"dataType": "date",
				"required": true,
				"favorite": true,
				"minValue": "1900/01/01",
				"maxValue": "2050/06/01",
				"multiValue": true,
				"width": 100,
				"tooltip": ""
			},
			{
				"name": "retire",
				"ui": "rtflabel",
				"label": '[{"children":[{"type":"link","url":"https://en.wikipedia.org/wiki/Retirement","children":[{"text":"Retired"}]}]}]',
				"dataType": "boolean",
				"tooltip": ""
			},
			{
				"name": "country",
				"label": "Country",
				"dataType": "string",
				"selectorId": 'country',
				"colSpan": 2,
				"_links": {
					"selector": {
						"href": '/api/selectors/country'
					},
				}
			},
		],
		"sections": [
			{
				"title": "Company",
				"expanded": true,
				"fields": [
					{
						"name": "companyName",
						"label": "Company",
						"dataType": "string",
						"width": 200,
						"tooltip": ""
					},
					{
						"name": "jobType",
						"label": "Job",
						"dataType": "string",
						"width": 200,
						"tooltip": ""
					},
					{
						"name": "salary",
						"label": "Salary",
						"dataType": "number",
						"favorite": true,
						"format": "$+1,000.00",
					},
				],
			},
		],
		"_links": {
			"self": {
				"href": "/api/config/components/UserViewFieldset",
				"type": "application/json"
			}
		}
	}
};