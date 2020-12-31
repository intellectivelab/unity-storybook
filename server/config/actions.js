module.exports = {
    "usersWithVerifyAction": [
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
            "name": "copyToFolder",
            "label": "Copy To Folder",
            "tooltip": "File selected document(s) into selected folder (root: /Folder 2)",
            "type": "copy_to_folder",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "browse": {
                    "href": '/api/folders/browse?scope=ce_repository&root=/Folder 2&offset=0&limit=20',
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/copyToFolder",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "moveToFolder",
            "label": "Move To Folder",
            "tooltip": "Unfile selected document(s) from current folder and file into selected folder (root: /)",
            "type": "move_to_folder",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "browse": {
                    "href": '/api/folders/browse?scope=ce_repository&root=/&offset=0&limit=20',
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/moveToFolder",
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
        {
            "name": "delete",
            "label": "Delete",
            "tooltip": "Delete",
            "type": "delete",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/delete",
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
                    "href": "/api/config/components/usersVerifyView",
                    "type": "application/json"
                }
            }
        }
    ]
};