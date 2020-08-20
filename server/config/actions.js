module.exports = {
	"users": [
		{
			"name": "createUser",
			"label": "Create",
			"tooltip": "Create a user",
			"type": "create",
			"resourceName": 'documents',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/view",
					"type": "application/json"
				},
				"model": {
					"href": "/api/users",
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/usersView0",
					"type": "application/json"
				}
			}
		},
		{
			"name": "createUser2",
			"label": "Enroll",
			"tooltip": "Enroll a user",
			"type": "create",
			"resourceName": 'documents',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/view",
					"type": "application/json"
				},
				"model": {
					"href": "/api/users",
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/usersView0",
					"type": "application/json"
				}
			}
		},
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
                    "href": "/api/config/components/documentsCheckin0", // TODO this link is not used; CheckIn action takes "view" link instead;
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
	],
	"casetasks": [
		{
			"name": "createCase",
			"label": "Create",
			"tooltip": "Create new case",
			"type": "create",
			"resourceName": 'cases',
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
					"href": "/api/config/components/casetasksView1",
					"type": "application/json"
				}
			}
		},
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
			"name": "copy_link",
			"label": "Copy Link",
			"tooltip": "Copy Link",
			"resourceName": "workitems",
			"type": "copy_link",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/copy_link",
					"type": "application/json"
				}
			}
		},
		{
			"name": "copy",
			"label": "Copy Case",
			"tooltip": "Copy Case",
			"resourceName": "cases",
			"type": "copy",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"model": {
					"href": "/api/casetasks",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/copy",
					"type": "application/json"
				}
			}
		},
		{
			"name": "reassign-with-form",
			"label": "Reassign",
			"tooltip": "Reassign items to another user",
			"type": "reassign",
			"resourceName": "workitems",
			"_links":{
				"root":{
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self":{
					"href": "/api/config/actions/reassign-with-form",
					"type": "application/json"
				},
				"model":{
					"href": "/api/casetasks",
					"type": "application/json"
				},
				"view":{
					"href": "/api/config/components/casetasksReassign0",
					"type": "application/json"
				}
			}
		},
		{
			"name": "lock",
			"label": "Lock",
			"tooltip": "Lock items",
			"type": "lock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/lock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "unlock",
			"label": "Unlock",
			"tooltip": "Unlock items",
			"type": "unlock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/unlock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Approve",
			"label": "Approve",
			"tooltip": "Approve",
			"type": "dispatch",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Approve",
					"type": "application/json"
				},
                "view":{
                    "href": "/api/config/components/casetasksView2",
                    "type": "application/json"
                }
			}
		},
		{
			"name": "dispatch.Reject",
			"label": "Reject",
			"tooltip": "Reject",
			"type": "dispatch",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Close",
			"label": "Close",
			"tooltip": "Close",
			"type": "dispatch",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Close",
					"type": "application/json"
				}
			}
		},

		// bulk actions
		{
			"name": "reassign-with-form",
			"label": "Reassign",
			"tooltip": "Reassign items to another user",
			"type": "reassign",
			"href": "/api/data/casetasks/reassign",
			"resourceName": "workitems",
			"_links":{
				"root":{
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self":{
					"href": "/api/config/actions/reassign-with-form",
					"type": "application/json"
				},
				"model":{
					"href": "/api/casetasks",
					"type": "application/json"
				},
				"view":{
					"href": "/api/config/components/casetasksReassign0",
					"type": "application/json"
				}
			}
		},
		{
			"name": "lock",
			"label": "Lock",
			"tooltip": "Lock items",
			"type": "lock",
			"href": "/api/data/casetasks/lock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/lock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "unlock",
			"label": "Unlock",
			"tooltip": "Unlock items",
			"type": "unlock",
			"href": "/api/data/casetasks/unlock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/unlock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Approve",
			"label": "Approve",
			"tooltip": "Approve",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/approve",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Approve",
					"type": "application/json"
				},
				"view":{
					"href": "/api/config/components/casetasksView2",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Reject",
			"label": "Reject",
			"tooltip": "Reject",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/reject",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Close",
			"label": "Close",
			"tooltip": "Close",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/close",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Close",
					"type": "application/json"
				}
			}
		},
	],
	"usersView01": [
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
	],
	"usersView11": [
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
	],
	"casetasksView01": [
		{
			"name": "lock",
			"label": "Lock",
			"tooltip": "Lock items",
			"type": "lock",
			"href": "/api/data/casetasks/lock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/lock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "unlock",
			"label": "Unlock",
			"tooltip": "Unlock items",
			"type": "unlock",
			"href": "/api/data/casetasks/unlock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/unlock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Approve",
			"label": "Approve",
			"tooltip": "Approve",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/approve",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Approve",
					"type": "application/json"
				},
				"view":{
					"href": "/api/config/components/casetasksView2",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Reject",
			"label": "Reject",
			"tooltip": "Reject",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/reject",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Close",
			"label": "Close",
			"tooltip": "Close",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/close",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		}
	],
	"casetasksView11": [
		{
			"name": "lock",
			"label": "Lock",
			"tooltip": "Lock items",
			"type": "lock",
			"href": "/api/data/casetasks/lock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/lock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "unlock",
			"label": "Unlock",
			"tooltip": "Unlock items",
			"type": "unlock",
			"href": "/api/data/casetasks/unlock",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/unlock",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Approve",
			"label": "Approve",
			"tooltip": "Approve",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/approve",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Approve",
					"type": "application/json"
				},
				"view":{
					"href": "/api/config/components/casetasksView2",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Reject",
			"label": "Reject",
			"tooltip": "Reject",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/reject",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		},
		{
			"name": "dispatch.Close",
			"label": "Close",
			"tooltip": "Close",
			"type": "dispatch",
			"href": "/api/data/casetasks/dispatch/close",
			"resourceName": "workitems",
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/dispatch.Reject",
					"type": "application/json"
				}
			}
		}
	],
	"history": [
		{
			"name": "ucmAddComment",
			"label": "Add Comment",
			"tooltip": "Add Comment",
			"type": "comment",
			"resourceName": 'cases',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/ucmAddComment",
					"type": "application/json"
				},
				"model": {
					"href": "/api/cases",
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/commentAddView0",
					"type": "application/json"
				}
			}
		},
		{
			"name": "ucmEditComment",
			"label": "Edit",
			"tooltip": "Edit",
			"type": "edit",
			"resourceName": 'cases',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/ucmEditComment",
					"type": "application/json"
				}
			}
		},
		{
			"name": "ucmDeleteComment",
			"label": "Delete",
			"tooltip": "Delete",
			"type": "edit",
			"resourceName": 'cases',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/ucmDeleteComment",
					"type": "application/json"
				}
			}
		}
	],
	"usersAsAttachmentsGrid": [
		{
			"name": "attachExisting",
			"label": "Attach existing",
			"tooltip": "Attach Existing Document",
			"type": "attach",
			"viewType": "Attach",
			"resourceName": 'documents',
			"resourceType": 'User',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/attachExisting",
					"type": "application/json"
				},
				"model": {
					"href": "/api/casetasks", 
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/usersView0", // not relevant for this action;
					"type": "application/json"
				}
			}
		},
		{
			"name": "attachNew",
			"label": "Attach New",
			"tooltip": "Attach New Document",
			"type": "attach",
			"viewType": "Create",
			"resourceName": 'documents',
			"resourceType": 'User',
			"_links": {
				"root": {
					"href": "/api/config/actions",
					"type": "application/json"
				},
				"self": {
					"href": "/api/config/actions/attachNew",
					"type": "application/json"
				},
				"model": {
					"href": "/api/casetasks", 
					"type": "application/json"
				},
				"view": {
					"href": "/api/config/components/usersView0", 
					"type": "application/json"
				}
			}
		},
	]
};