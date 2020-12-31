module.exports = {
    "usersSearchWithVerifyAction": {
        "id": "usersSearchWithVerifyAction",
        "title": "Users Search With Verify Action",
        "resourceName": "documents",
        "resourceType": "User",
        "_links": {
            "self": {
                "href": "/api/config/components/usersSearchWithVerifyAction",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/usersWithVerifyAction",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
            "list": {
                "href": "/api/users/list",
                "type": "application/json"
            },
        }
    },
    "usersWithVerifyAction": {
        "id": "usersWithVerifyAction",
        "title": "Users",
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
        "default": ["fullName", 'companyName', "dob", "jobArea", "jobType", "gender", "age", 'retire', 'mimeType'],
        "sorting": [
            {
                "column": "gender",
                "direction": "DESC"
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersWithVerifyAction",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/usersWithVerifyAction/actions",
                "type": "application/json"
            }
        }
    },
    "usersVerifyView": {
        "id": "usersVerifyView",
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
                    "href": "/api/config/components/usersVerifyView",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/components/usersVerifyView/tabs/1",
                    "type": "application/json"
                },
                "actions": {
                    "href": "/api/config/components/usersVerifyView/tabs/1/actions",
                    "type": "application/json"
                },
                "fieldset": {
                    "href": "/api/config/components/usersVerifyViewFieldset",
                    "type": "application/json"
                }
            }
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/usersVerifyView",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/usersVerifyView/header",
                "type": "application/json"
            }
        }
    },
    "usersVerifyViewFieldset": {
        "header": [
        ],
        "fields": [
            {
                "name": "country",
                "label": "Country",
                "dataType": "string",
                "selectorId": 'country',
                "required": false,
                "defaultValue": {
                    "name": 'United States',
                    "value": 'US'
                },
                "width": 200,
                "tooltip": "",
                "_links": {
                    "selector": {
                        "href": '/api/selectors/country'
                    },
                }
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
                "name": "age",
                "label": "Age",
                "dataType": "int",
                "readOnly": false,
                "minValue": 14,
                "maxValue": 150,
                "tooltip": ""
            },
            {
                "name": "retire",
                "ui": "rtflabel",
                "label": '[{"children":[{"type":"link","url":"https://en.wikipedia.org/wiki/Retirement","children":[{"text":"Retired"}]}]}]',
                "dataType": "boolean",
                "tooltip": ""
            }
        ],
        "sections": [
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersVerifyViewFieldset",
                "type": "application/json"
            }
        }
    },

};