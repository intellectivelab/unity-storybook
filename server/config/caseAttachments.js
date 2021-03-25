module.exports = {
    "usersAttachments2Columns": [ // TemplateSet used in Case's Attachments tab for customized create action;
        {
            "id": "usersAttachments2Columns",
            "title": "Attachments",
            "_links": {
                "self": {
                    "href": "/api/config/components/usersAttachments2Columns",
                    "type": "application/json"
                },
                "criteria": {
                    "href": "/api/config/components/usersSearchCriteria",
                    "type": "application/json"
                },
                "grid": {
                    "href": "/api/config/components/users2ColumnAttachmentsGrid",
                    "type": "application/json"
                },
                "query": {
                    "href": "/api/users/query",
                    "type": "application/json"
                }
            }
        }
    ],
    "users2ColumnAttachmentsGrid": {
        "id": "users2ColumnAttachmentsGrid",
        "title": "New Complaint Users",
        "ui": "infinite",
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
        ],
        "favorite": ["fullName"],
        "default": ["fullName", "gender"],
        "sorting": [
            {
                "column": "fullName",
                "direction": "ASC"
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/users2ColumnAttachmentsGrid",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/usersAsAttachmentsGrid/actions",
                "type": "application/json"
            }
        }
    }
};
