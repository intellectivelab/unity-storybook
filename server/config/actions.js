module.exports = {
    "usersGrid": [
        {
            "name": "view",
            "label": "View Details",
            "tooltip": "View Details",
            "type": "view",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/view",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "view_content",
            "label": "View",
            "tooltip": "View",
            "type": "view_content",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/view_content",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "download",
            "label": "Download",
            "tooltip": "Download",
            "type": "download",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/download",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "verify",
            "label": "Verify",
            "tooltip": "Verify users",
            "type": "custom.verify",
            "href": "/api/users/verify",
            "resourceName": 'documents',
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/verify",
                    "type": "application/json"
                },
                "view": {
                    "href": "/api/config/components/UserView",
                    "type": "application/json"
                }
            }
        }
    ],
	"casetasks": [
		{
			"name": "view",
			"label": "View Details",
			"tooltip": "View Details",
			"resourceName": "workitems",
			"type": "view",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/view",
					"type": "application/json"
				}
			}
		},
		{
			"name": "createCase",
			"label": "Create",
			"tooltip": "Create new case",
			"type": "create",
			"resourceName": "cases",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/createCase",
					"type": "application/json"
				},
				"model": {
					"href": "/api/casetasks",
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/casetasksView2",
					"type": "application/json"
				}
			}
		}
	],
};