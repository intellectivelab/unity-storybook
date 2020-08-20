module.exports = {
    "DocumentSearchTemplate": {
        "id": "DocumentSearchTemplate",
        "title": "Documents Search",
        "hidden": false,
        "_links": {
            "self": {
                "href": "/api/config/components/DocumentSearchTemplate",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/documents",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },

    "documents": {
        "id": "documents",
        "title": "Documents",
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
                "resizable": true
            },
            {
                "name": "path",
                "label": "Folder",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "gender",
                "label": "Gender",
                "dataType": "string",
                "width": 100,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "dob",
                "label": "Date",
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
                "resizable": true
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
                "resizable": true
            },
            {
                "name": "jobArea",
                "label": "Industry",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "jobType",
                "label": "Job",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "sortable": true,
                "resizable": true
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
                "label": "Retire",
                "dataType": "boolean",
                "width": 100,
                "tooltip": "",
                "sortable": true,
                "resizable": true
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
        "default": ["fullName", 'path', 'mimeType', 'dob', 'companyName'],
        "sorting": [
            {
                "column": "path",
                "direction": "ASC"
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/documents",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/users/actions",
                "type": "application/json"
            }
        }
    },
};