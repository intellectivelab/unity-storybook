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

    "usersView01": [
        {
            "name": "verify",
            "label": "Verify",
            "tooltip": "Verify user details",
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
            }
        },

        {
            "name": "verifyAndClose",
            "label": "Verify and Close",
            "tooltip": "Verify user details and close",
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
            }
        },


        {
            "name": "checkin",
            "label": "Check In",
            "tooltip": "Check In",
            "type": "checkin",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/checkin",
                    "type": "application/json"
                },
                "model": {
                    "href": "/api/documents",
                    "type": "application/json"
                },
                "view": {
                    "href": "/api/config/components/documentsCheckin0",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "checkout",
            "label": "Check Out",
            "tooltip": "Check Out",
            "type": "checkout",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/checkout",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "cancelCheckOut",
            "label": "Cancel Check Out",
            "tooltip": "Cancel Check Out",
            "type": "cancelCheckOut",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/cancelCheckOut",
                    "type": "application/json"
                }
            }
        }
    ]
};
