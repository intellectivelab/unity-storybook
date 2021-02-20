module.exports = {
	"casetasksView0": {
		"id": "DomainCase",
		"resourceName": "documents",
		"resourceType": "DomainCase",
		"viewType": "Open",
		"tabs": [
			{
				"id": "1",
				"title": "Details",
				"tooltip": "Case Details",
				"type": "Details",
				"fieldSetId": "casetasksViewFieldset0",
				"_links": {
					"root": {
						"href": "/api/config/components/casetasksView0",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/casetasksView0/tabs/1",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/casetasksView0/tabs/1/actions",
						"type": "application/json"
					},
					"fieldset": {
						"href": "/api/config/components/casetasksViewFieldset0",
						"type": "application/json"
					}
				}
			},
			{
				"id": "2",
				"title": "Documents",
				"tooltip": "Case Documents",
				"type": "Attachments",
				"_links": {
					"root": {
						"href": "/api/config/components/casetasksView0",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/casetasksView0/tabs/2",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/casetasksView0/tabs/2/actions",
						"type": "application/json"
					},
					"templates": {
						"href": "/api/config/components/usersAsAttachmentsWithFolderView/templates",
						"type": "application/json"
					}
				}
			},
			{
				"id": "3",
				"title": "Activity",
				"tooltip": "Case History",
				"type": "History",
				"_links": {
					"root": {
						"href": "/api/config/components/usersView0",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/usersView0/tabs/3",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/usersView0/tabs/3/actions",
						"type": "application/json"
					},
					"templates": {
						"href": "/api/config/components/historyTemplateSet/templates",
						"type": "application/json"
					}
				}
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/casetasksView0",
				"type": "application/json"
			},
			"header": {
				"href": "/api/config/components/casetasksView0/header",
				"type": "application/json"
			}
		}
	},
	"casetasksView1": {
		"id": "DomainCase",
		"resourceName": "documents",
		"resourceType": "DomainCase",
		"viewType": "Open",
		"tabs": [
			{
				"id": "1",
				"title": "Details",
				"tooltip": "Case Details",
				"type": "Details",
				"fieldSetId": "casetasksViewFieldset1",
				"_links": {
					"root": {
						"href": "/api/config/components/casetasksView1",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/casetasksView1/tabs/1",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/casetasksView1/tabs/1/actions",
						"type": "application/json"
					},
					"fieldset": {
						"href": "/api/config/components/casetasksViewFieldset1",
						"type": "application/json"
					}
				}
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/casetasksView1",
				"type": "application/json"
			},
			"header": {
				"href": "/api/config/components/casetasksView1/header",
				"type": "application/json"
			}
		}
	},
	"casetasksViewFieldset0": {
		"columns": 1,
		"fields": [
			{
				"name": "task_id",
				"label": "Task Id",
				"dataType": "string",
				"width": 100,
				"tooltip": "Task Identifier"
			},
			{
				"name": "case_id",
				"label": "Case Id",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Identifier"
			},
			{
				"name": "case_type",
				"label": "Case Type",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Type"
			},
			{
				"name": "case_status",
				"label": "Case Status",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Status"
			},
			{
				"name": "note",
				"label": "Note",
				"dataType": "string",
				"width": 100,
				"tooltip": "Note",
				"maxLength": 10,
				"minLength": 2
			},
			{
				"name": "website",
				"label": "Website",
				"dataType": "url",
				"ui": "usersUrl",
				"width": 100,
				"tooltip": "Website",
				"defaultValue": "http://www.intellective.com"
			},
			{
				"name": "rating",
				"label": "Rating",
				"dataType": "integer",
				"ui": "rating",
				"defaultValue": 0
			},
			{
				"name": "phone",
				"label": "Phone",
				"dataType": "string",
				"ui": "phone",
				"placeholder": "123-456-7890"
			}
		],
		"sections": [],
		"_links": {
			"self": {
				"href": "/api/config/components/casetasksViewFieldset0",
				"type": "application/json"
			}
		}
	},
	"casetasksViewFieldset1": {
		"columns": 1,
		"fields": [
			{
				"name": "task_id",
				"label": "Task Id",
				"dataType": "string",
				"width": 100,
				"tooltip": "Task Identifier"
			},
			{
				"name": "case_id",
				"label": "Case Id",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Identifier"
			},
			{
				"name": "case_type",
				"label": "Case Type",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Type"
			},
			{
				"name": "case_status",
				"label": "Case Status",
				"dataType": "string",
				"width": 100,
				"tooltip": "Case Status"
			},
			{
				"name": "note",
				"label": "Note",
				"dataType": "string",
				"width": 100,
				"tooltip": "Note",
				"maxLength": 10,
				"minLength": 2,
				"colSpan": 2
			},
			{
				"name": "website",
				"label": "Website",
				"dataType": "url",
				"ui": "usersUrl",
				"width": 100,
				"tooltip": "Website",
				"defaultValue": "http://www.intellective.com"
			},
			{
				"name": "rating",
				"label": "Rating",
				"dataType": "integer",
				"ui": "rating",
				"defaultValue": 0
			},
			{
				"name": "phone",
				"label": "Phone",
				"dataType": "string",
				"ui": "phone",
				"placeholder": "123-456-7890"
			}

		],
		"sections": [],
		"_links": {
			"self": {
				"href": "/api/config/components/casetasksViewFieldset1",
				"type": "application/json"
			}
		}
	},
};
