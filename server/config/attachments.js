module.exports = {
    "usersAsAttachments": [ // TemplateSet used in Case's Attachments tab;
        {
            "id": "usersSearch0",
            "title": "Users Search 0",
            "_links": {
                "self": {
                    "href": "/api/config/components/usersSearch0",
                    "type": "application/json"
                },
                "criteria": {
                    "href": "/api/config/components/usersSearchCriteria",
                    "type": "application/json"
                },
                "grid": {
                    "href": "/api/config/components/usersAsAttachmentsGrid",
                    "type": "application/json"
                },
                "query": {
                    "href": "/api/users/query",
                    "type": "application/json"
                },
            }
        }
    ],
    "usersAsAttachmentsGrid": {
        "id": "usersAsAttachmentsGrid",
        "title": "Attached Users",
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
            },
            {
                "name": "companyName",
                "label": "Company",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true,
                "header": "Job Info"
            },
            {
                "name": "salary",
                "label": "Salary",
                "dataType": "number",
                "sortable": true,
                "format": "$+1,000.00",
            },
            {
                "name": "jobArea",
                "label": "Industry",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true,
                "header": "Job Info"
            },
            {
                "name": "jobType",
                "label": "Job",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true,
                "header": "Job Info"
            },
            {
                "name": "countryName",
                "label": "Country",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "state",
                "label": "State",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "city",
                "label": "City",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "zipCode",
                "label": "Zip",
                "dataType": "string",
                "width": 100,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "retire",
                "label": "Retired",
                "dataType": "boolean",
                "width": 100,
                "tooltip": "",
                "sortable": true,
                "resizable": true,
                "header": "Job Info"
            },
            {
                "name": "mimeType",
                "label": "Mime Type",
                "dataType": "mimeType",
                "width": 100,
                "tooltip": "Mime Type",
                "sortable": true,
            }
        ],
        "favorite": ["fullName"],
        "default": ["fullName", 'companyName', "jobArea", "jobType", "gender", "age", 'retire', 'mimeType'],
        "sorting": [
            {
                "column": "gender",
                "direction": "DESC"
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersAsAttachmentsGrid",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/usersAsAttachmentsGrid/actions",
                "type": "application/json"
            }
        }
    },
    
}