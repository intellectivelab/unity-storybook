module.exports = {

    "usersLookup": {
        "id": "usersLookup",
        "type": "SearchTemplate",
        "searchTemplateId": "usersSearch0",
        "idField": "id",
        "labelField": "fullName",
        "_links": {
            "self": {
                "href": "/api/config/components/usersLookup",
                "type": "application/json"
            },
            "config": {
                "href": "/api/config/components/usersSearchForLookup",
                "type": "application/json"
            }
        }
    },
    "usersSearchForLookup": {
        "id": "usersSearchForLookup",
        "title": "Users Search for Lookup",
        "_links": {
            "self": {
                "href": "/api/config/components/usersSearchForLookup",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },

    "usersSearch": [
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
                    "href": "/api/config/components/users",
                    "type": "application/json"
                },
                "query": {
                    "href": "/api/users/query",
                    "type": "application/json"
                },
            }
        },
        {
            "id": "usersSearch1",
            "title": "Users Search 1",
            "_links": {
                "self": {
                    "href": "/api/config/components/usersSearch1",
                    "type": "application/json"
                },
                "criteria": {
                    "href": "/api/config/components/usersSearchCriteria",
                    "type": "application/json"
                },
                "grid": {
                    "href": "/api/config/components/users",
                    "type": "application/json"
                },
                "query": {
                    "href": "/api/users/query",
                    "type": "application/json"
                },
            }
        },
    ],
    "usersSearch0": {
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
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },
    "usersSearch1": {
        "id": "usersSearch1",
        "title": "Users Search 1",
        "_links": {
            "self": {
                "href": "/api/config/components/usersSearch1",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },
    "usersSearch_Female": {
        "id": "usersSearch_Female",
        "title": "Female Search",
        "_links": {
            "self": {
                "href": "/api/config/components/usersSearch_Female",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria_Female",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },
    "usersSearch_Male": {
        "id": "usersSearch_Female",
        "title": "Female Search",
        "_links": {
            "self": {
                "href": "/api/config/components/usersSearch_Male",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria_Male",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/users/query",
                "type": "application/json"
            },
        }
    },
    "usersEnterpriseSearch": {
        "id": "usersEnterpriseSearch",
        "title": "Enterprise Users Search",
        "_links": {
            "self": {
                "href": "/api/config/components/usersEnterpriseSearch",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/usersSearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "query": {
                "href": "/api/resources/users/query",
                "type": "application/json"
            },
            "list": {
                "href": "/api/users/list",
                "type": "application/json"
            },
        }
    },
    "users": {
        "id": "users",
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
                "href": "/api/config/components/users",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/users/actions",
                "type": "application/json"
            }
        }
    },
    "usersSearchCriteria": {
        "id": "usersSearchCriteria",
        "title": "Search Criteria",
        "hidden": false,
        "fields": [
            {
                "name": "firstName",
                "dataType": "textfield",
                "label": "First Name",
                "operator": {
                    "id": "eq",
                    "name": "is equal to"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "lastName",
                "dataType": "textfield",
                "label": "Last Name",
                "multiValue": true,
                "operator": {
                    "id": "contains",
                    "name": "contains"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "dob",
                "dataType": "daterange",
                "operator": {
                    "id": "range",
                    "name": "is between"
                },
                "label": "Birth Date",
                "format": 'MM/dd/yyyy'
            },
        ],
        "sections": [
            {
                "title": "Personal",
                "subtitle": "Information",
                "fields": [
                    {
                        "name": "gender",
                        "dataType": "choices",
                        "label": "Gender",
                        "multiValue": false,
                        "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}]
                    },
                    {
                        name: 'age',
                        dataType: 'rangefield',
                        label: 'Age',
                        "facets": [
                            {
                                id: "age",
                                type: "RANGE",
                                field: "age",
                                label: 'Age',
                                dataType: 'int',
                                start: '0',
                                end: '100',
                                gap: '10'
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                ]
            },
            {
                "title": "Industry & Job",
                "subtitle": "Details",
                "fields": [
                    {
                        name: 'jobType',
                        dataType: 'fieldstats',
                        label: 'Job Type',
                        ui: 'checkbox',
                        "multiValue": true,
                        tooltip: "Breakdown by job type field",
                        "facets": [
                            {
                                id: "jobtypes",
                                type: "TERMS",
                                field: "jobType",
                                label: 'Job Type',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'jobArea',
                        dataType: 'fieldstats',
                        label: 'Industry',
                        ui: 'toggle',
                        "multiValue": true,
                        tooltip: "Breakdown by industry",
                        "facets": [
                            {
                                id: "jobArea",
                                type: "TERMS",
                                field: "jobArea",
                                label: 'Job Area',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'salary',
                        dataType: 'number',
                        label: 'Salary',
                        tooltip: "Salary",
                        format: '$+1,000.00',
                        operator: {
                            id: "ge",
                            name: "is greater than or equal"
                        },
                    },
                ]
            },
            {
                "title": "Country & State",
                "subtitle": "Details",
                "fields": [
                    {
                        "name": 'countryCode',
                        "dataType": 'selector',
                        "label": "Country",
                        "selectorId": 'country',
                        "defaultValue": {
                            "name": 'Canada',
                            "value": 'CA'
                        },
                        //"multiValue": true,

                        "_links": {
                            "selector": {
                                "href": '/api/selectors/country'
                            },
                        }
                    },
                    {
                        "name": 'state',
                        "dataType": 'selector',
                        "label": "State",
                        "selectorId": 'stateCode',
                        "linkedField": "countryCode",
                        "multiValue": true,
                        "_links": {
                            "selector": {
                                "href": '/api/selectors/stateCode'
                            },
                        }
                    },
                ]
            },
        ],
    },
    "usersSearchCriteria_Female": {
        "id": "usersSearchCriteria_Female",
        "title": "Search Criteria",
        "hidden": false,
        "fields": [
            {
                "name": "firstName",
                "dataType": "textfield",
                "label": "First Name",
                "operator": {
                    "id": "eq",
                    "name": "is equal to"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "lastName",
                "dataType": "textfield",
                "label": "Last Name",
                "multiValue": true,
                "operator": {
                    "id": "contains",
                    "name": "contains"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "dob",
                "dataType": "daterange",
                "operator": {
                    "id": "range",
                    "name": "is between"
                },
                "label": "Birth Date",
                "format": 'MM/dd/yyyy'
            },
        ],
        "sections": [
            {
                "title": "Personal",
                "subtitle": "Information",
                "fields": [
                    {
                        "name": "gender",
                        "dataType": "choices",
                        "label": "Gender",
                        "multiValue": false,
                        "hidden": true,
                        "defaultValue": "Female",
                        "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}]
                    },
                    {
                        name: 'age',
                        dataType: 'rangefield',
                        label: 'Age',
                        "facets": [
                            {
                                id: "age",
                                type: "RANGE",
                                field: "age",
                                label: 'Age',
                                dataType: 'int',
                                start: '0',
                                end: '100',
                                gap: '10'
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                ]
            },
            {
                "title": "Industry & Job",
                "subtitle": "Details",
                "fields": [
                    {
                        name: 'jobType',
                        dataType: 'fieldstats',
                        label: 'Job Type',
                        ui: 'checkbox',
                        "multiValue": true,
                        tooltip: "Breakdown by job type field",
                        "facets": [
                            {
                                id: "jobtypes",
                                type: "TERMS",
                                field: "jobType",
                                label: 'Job Type',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'jobArea',
                        dataType: 'fieldstats',
                        label: 'Industry',
                        ui: 'toggle',
                        "multiValue": true,
                        tooltip: "Breakdown by industry",
                        "facets": [
                            {
                                id: "jobArea",
                                type: "TERMS",
                                field: "jobArea",
                                label: 'Job Area',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'salary',
                        dataType: 'number',
                        label: 'Salary',
                        tooltip: "Salary",
                        format: '$+1,000.00',
                        operator: {
                            id: "ge",
                            name: "is greater than or equal"
                        },
                    },
                ]
            },
            {
                "title": "Country & State",
                "subtitle": "Details",
                "fields": [
                    {
                        "name": 'countryCode',
                        "dataType": 'selector',
                        "label": "Country",
                        "selectorId": 'country',
                        "defaultValue": {
                            "name": 'Canada',
                            "value": 'CA'
                        },
                        //"multiValue": true,

                        "_links": {
                            "selector": {
                                "href": '/api/selectors/country'
                            },
                        }
                    },
                    {
                        "name": 'state',
                        "dataType": 'selector',
                        "label": "State",
                        "selectorId": 'stateCode',
                        "linkedField": "countryCode",
                        "multiValue": true,
                        "_links": {
                            "selector": {
                                "href": '/api/selectors/stateCode'
                            },
                        }
                    },
                ]
            },
        ],
    },
    "usersSearchCriteria_Male": {
        "id": "usersSearchCriteria_Male",
        "title": "Search Criteria",
        "hidden": false,
        "fields": [
            {
                "name": "firstName",
                "dataType": "textfield",
                "label": "First Name",
                "operator": {
                    "id": "eq",
                    "name": "is equal to"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "lastName",
                "dataType": "textfield",
                "label": "Last Name",
                "multiValue": true,
                "operator": {
                    "id": "contains",
                    "name": "contains"
                },
                "required": true,
                "minLength": 2
            },
            {
                "name": "dob",
                "dataType": "daterange",
                "operator": {
                    "id": "range",
                    "name": "is between"
                },
                "label": "Birth Date",
                "format": 'MM/dd/yyyy'
            },
        ],
        "sections": [
            {
                "title": "Personal",
                "subtitle": "Information",
                "fields": [
                    {
                        "name": "gender",
                        "dataType": "choices",
                        "label": "Gender",
                        "multiValue": false,
                        "hidden": true,
                        "defaultValue": "Male",
                        "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}]
                    },
                    {
                        name: 'age',
                        dataType: 'rangefield',
                        label: 'Age',
                        "facets": [
                            {
                                id: "age",
                                type: "RANGE",
                                field: "age",
                                label: 'Age',
                                dataType: 'int',
                                start: '0',
                                end: '100',
                                gap: '10'
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                ]
            },
            {
                "title": "Industry & Job",
                "subtitle": "Details",
                "fields": [
                    {
                        name: 'jobType',
                        dataType: 'fieldstats',
                        label: 'Job Type',
                        ui: 'checkbox',
                        "multiValue": true,
                        tooltip: "Breakdown by job type field",
                        "facets": [
                            {
                                id: "jobtypes",
                                type: "TERMS",
                                field: "jobType",
                                label: 'Job Type',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'jobArea',
                        dataType: 'fieldstats',
                        label: 'Industry',
                        ui: 'toggle',
                        "multiValue": true,
                        tooltip: "Breakdown by industry",
                        "facets": [
                            {
                                id: "jobArea",
                                type: "TERMS",
                                field: "jobArea",
                                label: 'Job Area',
                                dataType: 'string',
                                limit: 7,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/users/facets/select'
                            }
                        }
                    },
                    {
                        name: 'salary',
                        dataType: 'number',
                        label: 'Salary',
                        tooltip: "Salary",
                        format: '$+1,000.00',
                        operator: {
                            id: "ge",
                            name: "is greater than or equal"
                        },
                    },
                ]
            },
            {
                "title": "Country & State",
                "subtitle": "Details",
                "fields": [
                    {
                        "name": 'countryCode',
                        "dataType": 'selector',
                        "label": "Country",
                        "selectorId": 'country',
                        "defaultValue": {
                            "name": 'Canada',
                            "value": 'CA'
                        },
                        //"multiValue": true,

                        "_links": {
                            "selector": {
                                "href": '/api/selectors/country'
                            },
                        }
                    },
                    {
                        "name": 'state',
                        "dataType": 'selector',
                        "label": "State",
                        "selectorId": 'stateCode',
                        "linkedField": "countryCode",
                        "multiValue": true,
                        "_links": {
                            "selector": {
                                "href": '/api/selectors/stateCode'
                            },
                        }
                    },
                ]
            },
        ],
    },
    "usersView0": {
        "id": "usersView0",
        "resourceName": "documents",
        "resourceType": "Employee",
        "viewType": "Open",
        "tabs": [
            {
                "id": "1",
                "title": "Details",
                "tooltip": "Employee Details",
                "type": "Details",
                "fieldSetId": "usersViewFieldset0",
                "_links": {
                    "root": {
                        "href": "/api/config/components/usersView0",
                        "type": "application/json"
                    },
                    "self": {
                        "href": "/api/config/components/usersView0/tabs/1",
                        "type": "application/json"
                    },
                    "actions": {
                        "href": "/api/config/components/usersView0/tabs/1/actions",
                        "type": "application/json"
                    },
                    "fieldset": {
                        "href": "/api/config/components/usersViewFieldset0",
                        "type": "application/json"
                    }
                }
            },
            {
                "id": "2",
                "title": "Documents",
                "tooltip": "Employee Documents",
                "type": "Attachments",
                "_links": {
                    "root": {
                        "href": "/api/config/components/usersView0",
                        "type": "application/json"
                    },
                    "self": {
                        "href": "/api/config/components/usersView0/tabs/2",
                        "type": "application/json"
                    },
                    "actions": {
                        "href": "/api/config/components/usersView0/tabs/2/actions",
                        "type": "application/json"
                    },
                    "templates": {
                        "href": "/api/config/components/usersSearch/templates",
                        "type": "application/json"
                    }
                }
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersView0",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/usersView0/header",
                "type": "application/json"
            }
        }
    },
    "usersView1": {
        "id": "usersView1",
        "resourceName": "documents",
        "resourceType": "Employee",
        "viewType": "Open",
        "tabs": [{
            "id": "1",
            "title": "Details with files",
            "tooltip": "Employee Details",
            "type": "Details",
            "fieldSetId": "usersViewFieldset1",
            "_links": {
                "root": {
                    "href": "/api/config/components/usersView1",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/components/usersView1/tabs/1",
                    "type": "application/json"
                },
                "actions": {
                    "href": "/api/config/components/usersView1/tabs/1/actions",
                    "type": "application/json"
                },
                "fieldset": {
                    "href": "/api/config/components/usersViewFieldset1",
                    "type": "application/json"
                }
            }
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/usersView1",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/usersView1/header",
                "type": "application/json"
            }
        }
    },
    "usersViewFieldset0": {
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
                "name": "FolderPath",
                "label": "Folder",
                "dataType": "folderselect",
                "tooltip": "Select a folder to upload the document(s)",
                "multiValue": false,
                "folderPath": "/",
                "_links": {
                    "browse": {
                        "href": '/api/folders/browse?scope=ce_repository&root=/&offset=0&limit=20'
                    }
                }
            },

		    {
			    "name": "fullName",
			    "label": "Name",
			    "dataType": "string",
			    "width": 200,
			    "required": true,
			    "favorite": true,
			    "tooltip": ""
		    },
		    {
			    "name": "gender",
			    "label": "Gender",
			    "dataType": "choices",
			    "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}],
			    "required": true,
			    "favorite": true,
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
                "name": "age",
                "label": "Age",
                "dataType": "int",
                "readOnly": false,
                "minValue": 14,
                "maxValue": 150,
                "requiredCondition": "retire=true=",
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
            {
		        "title": "Company",
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

			        {
				        "name": "jobArea",
				        "label": "Industry",
				        "dataType": "string",
                        "ui": "rtftext",
                        "fullWidth": true,
				        "tooltip": ""
			        },

                    {
                        "name": "jobTitle",
                        "label": '[{"children":[{"text":"Describe the proposed regulated work and activities in a detailed narrative, including the number and dimensions of structures and the volume and area of fill or excavations. See "},{"type":"link","url":"https://portal.ct.gov/-/media/DEEP/Permits_and_Licenses/Land_Use_Permits/LWRD/LWRDinstpdf#Page=4.pdf?la=en","children":[{"text":"LWRD Application Instructions"}]},{"text":" for required information."}],"type":"align-justify"}]',
                        "dataType": "string",
                        "ui": "rtfinput",
                        "fullWidth": true,
                        "required": true,
                        "tooltip": "Enter Job Title"
                    },
		        ],
	        },
	        {
                "title": "Address",
                "fields": [
                    {
                        "name": "country",
                        "label": "Country",
                        "dataType": "string",
                        "selectorId": 'country',
                        "required": true,
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
                        "name": "state",
                        "label": "State",
                        "dataType": "selector",
                        "width": 200,
                        "tooltip": "",
                        "selectorId": 'state',
                        "linkedField": "countryCode",
                        "required": true,
                        "readOnlyCondition": "country=isnull=",
                        "multiValue": true,
                        "_links": {
                            "selector": {
                                "href": '/api/selectors/state'
                            },
                        }
                    },
                    {
                        "name": "city",
                        "label": "City",
                        "dataType": "string",
                        "width": 200,
                        "tooltip": "",
                        "readOnlyCondition": "country=isnull=",
                    },
                    {
                        "name": "zipCode",
                        "label": "Zip",
                        "dataType": "string",
                        "length": 10,
                        "tooltip": "",
                        "readOnlyCondition": "country=isnull=",
                        "requiredCondition": "state=has=Quebec",
                    }
                ]
            },
            {
                "title": "Contacts",
                "fields": [
                    {
                        "name": "email",
                        "label": "Email",
                        "dataType": "email",
                        "favorite": true,
                        "minLength": 5,
                        "maxLength": 30,
                        "width": 100,
                        "tooltip": ""
                    },
                    {
                        "name": "phone",
                        "label": "Phone",
                        "dataType": "string",
                        "required": true,
                        "favorite": true,
                        "minLength": 7,
                        "maxLength": 20,
                        "multiValue": true,
                        "width": 100,
                        "tooltip": ""
                    }
                ]
            },

            {
                "title": "Other",
                "fields": [
                    {
                        "name": "ten",
                        "label": '[{"children":[{"text":"10. The removal of derelict structures or vessels."}]}]',
                        "dataType": "checkbox",
                        "ui": "rtflabel",
                        "tooltip": "Ten"
                    },
                    {
                        "name": "eleven",
                        "label": '11. Placement of temporary structures for water-dependent uses as defined in CGS section 22a-93',
                        "dataType": "checkbox",
                        "tooltip": "Eleven"
                    },
                    {
                        "name": "twelve",
                        "label": '[{"children":[{"text":"12. Open water marsh management, tidal wetland restoration, resource restoration or enhancement activity, as defined in subsection (a) of section 22a-361, including beach nourishment, and conservation activities undertaken by or under the supervision of the "},{"type":"link","url":"https://portal.ct.gov/deep","children":[{"text":"Department of Energy & Environmental Protection"}]},{"text":"."}]}]',
                        "dataType": "toggle",
                        "ui": "rtflabel",
                        "fullWidth": true,
                        "tooltip": "Twelve"
                    },

                    {
                        "name": "regLimit",
                        "label": '[{"children":[{"text":"Regulatory Limit ","bold":true},{"text":"– See "},{"type":"link","url":"https://portal.ct.gov/-/media/DEEP/Permits_and_Licenses/Land_Use_Permits/LWRD/referenceregulatoryjurisdictionpdf.pdf?la=en","children":[{"text":"Reference Guide for Regulatory Jurisdiction"}]},{"text":" for further explanation if necessary. Indicate the landward extent of the State’s regulatory jurisdiction by checking one box:"}]}]',
                        "dataType": "choices",
                        "fullWidth": true,
                        "multiValue": true,
                        "ui": "rtflabel",
                        "options": [
                            {
                                "name": '[{"children":[{"text":"Coastal Jurisdiction Line","bold":true},{"text":" (CJL) - for CJL information, refer to the "},{"type":"link","url":"https://portal.ct.gov/DEEP/Coastal-Resources/Coastal-Permitting/Coastal-Jurisdiction-Line-Fact-Sheet","children":[{"text":"Coastal Jurisdiction Fact Sheet and Chart"}]},{"text":"."}]}]',
                                "value": "1"
                            },
                            {
                                "name": '[{"children":[{"text":"Mean High Water","bold":true},{"text":" (MHW) - for projects located upstream of a tide gate, dam or weir (structure must be shown on project plans)."}]}]',
                                "value": "2"
                            },
                            {
                                "name": '[{"children":[{"text":"Tidal Wetland Boundary","bold":true},{"text":" – To be used if tidal wetlands are located landward of CJL or MHW. Include one foot above local extreme high water, if applicable."}]}]',
                                "value": "3"
                            }

                            ]
                    },
                ]
            },

            {
                "title": "Engineering Support Documentation andCertification",
                "expanded": true,
                "fields": [
                    {
                        "name": "part5Title",
                        "defaultValue": '[{"children":[{"text":"Certain types of projects require documentation of engineering design. If you answer yes to questions 1 or 2 below, you must submit a completed "},{"type":"link","url":"https://portal.ct.gov/-/media/DEEP/Permits_and_Licenses/Land_Use_Permits/LWRD/engineerreportcoverpdf.pdf?la=en","children":[{"text":"Engineering Report Cover Sheet","bold":true}]},{"text":" (DEEP-LWRD-APP-001R) as Attachment 18 along with the relevant engineering report(s)."}]}]',
                        "dataType": "string",
                        "ui": "rtflabel",
                        "fullWidth": true
                    },
                    {
                        "name": "part5Title.1",
                        "label": '1. Does the proposed activity include engineered structures such as bridges, culverts, stormwater management systems, detention basins, and/or flood & erosion control structures?',
                        "dataType": "choices",
/*
                        "inline": true,
*/
                        "fullWidth": true,
                        "ui": "rtflabel",
                        "options": [
                            {
                                "name": "yes",
                                "value": "yes"
                            },
                            {
                                "name": "no",
                                "value": "no",
                                "reason": {
                                    "ui": "rtfinput",
                                    "label": "If no, explain:"
                                }
                            },
                        ]
                    },
                    {
                        "name": "part5Title.2",
                        "label": '2. Is the proposed activity located in a FEMA flood zone?',
                        "dataType": "choices",
                        "inline": true,
                        "fullWidth": true,
                        "ui": "rtflabel",
                        "options": [
                            {
                                "name": "yes",
                                "value": "yes"
                            },
                            {
                                "name": "no",
                                "value": "no"
                            },
                        ]
                    },
                    {
                        "name": "part5Title.2a",
                        "label": '  a. If yes, indicate the type of zone',
                        "dataType": "choices",
                        "inline": true,
                        "multiValue": true,
                        "fullWidth": true,
                        "readOnlyCondition": "part5Title.2!==yes",
                        "ui": "rtflabel",
                        "options": [
                            {
                                "name": "Floodway",
                                "value": "1"
                            },
                            {
                                "name": "Riverine Floodplain",
                                "value": "2"
                            },
                            {
                                "name": "New Engineered Structure in Coastal Floodplain",
                                "value": "3"
                            },

                        ]
                    },
                    {
                        "name": "part5Title.3",
                        "label": '3. If a new or expanded flood and erosion control structure (e.g. seawall) is proposed, it would provide for the protection of:',
                        "dataType": "choices",
                        "inline": true,
                        "multiValue": true,
                        "fullWidth": true,
                        "ui": "rtflabel",
                        "options": [
                            {
                                "name": "an infrastructural facility",
                                "value": "1"
                            },
                            {
                                "name": "a water-dependent use",
                                "value": "2"
                            },
                            {
                                "name": "cemetery or burial grounds",
                                "value": "3"
                            },
                            {
                                "name": "a pre-1995 commercial or residential structure",
                                "value": "4"
                            },
                            {
                                "name": "Other – explain:",
                                "value": "5",
                                "reason": {
                                    "ui": "rtftext",
                                    "defaultExpanded": false
                                }
                            },

                        ],
                        "helperText": '[{"children":[{"text":"Please make sure Item 3., above ,documents that there are no feasible, less environmentally damaging alternatives and include Attachment 18, Engineering Report Cover Sheet. Also, the municipality must forward the related Coastal Site Plan Review to LWRD. See "},{"type":"link","url":"https://portal.ct.gov/-/media/DEEP/Permits_and_Licenses/Land_Use_Permits/LWRD/LWRDinstpdf#Page=5.pdf?la=en","children":[{"text":"LWRD Application Instructions","bold":true,"color":"#004dcf"}]},{"text":" for further guidance."}]}]'
                    },



                ]
            },

            {
                "title": "System",
                "fields": [
                    {
                        "name": "id",
                        "label": "Id",
                        "dataType": "string",
                        "width": 100,
	                    "hidden": true,
                        "tooltip": ""
                    },
                ]
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersViewFieldset0",
                "type": "application/json"
            }
        }
    },
    "usersViewFieldset1": {
	    "header": [
		    {
			    "name": "fullName",
			    "label": "Name",
			    "dataType": "string",
		    },
		    {
			    "name": "gender",
			    "label": "Gender",
			    "dataType": "string",
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
                "favorite": true,
                "width": 200,
                "required": true,
                "tooltip": ""
            },
            {
                "name": "retire",
                "label": "Retired",
                "dataType": "boolean",
                "required": true,
                "favorite": true,
                "tooltip": ""
            },

            {
                "name": "file1",
                "label": "Photo",
                "dataType": "file",
                "favorite": false,
                "required": true,
                "allowedExtensions": ["png", "jpg", "bmp"],
                "maximumSize": 10000000, // 10 Mb
                "tooltip": "Please attach your photo"
            },

            {
                "name": "filePages",
                "label": "Pages",
                "dataType": "file",
                "favorite": false,
                "required": true,
                "multiValue": true,
                "limit": 3,
                "allowedExtensions": ["png", "jpg", "bmp"],
                "maximumSize": 10000000, // 10 Mb
                "tooltip": "Please attach your application form (if available)"
            },

            {
                "name": "fileApplication",
                "label": "Application page",
                "dataType": "file",
                "favorite": false,
                "required": false,
                "allowedExtensions": null,
		"multiValue": false,
		"fullWidth": true,
                "tooltip": "Please attach your application form (if available)"
            },

            {
                "name": "fileUnlim",
                "label": "Files unlimited",
                "dataType": "file",
                "favorite": false,
                "required": false,
                "multiValue": true,
		"fullWidth": true,
                "tooltip": "Please attach your application form (if available)"
            },

	        {
		        "name": "gender",
		        "label": "Gender",
		        "dataType": "select",
		        "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}],
		        "required": true,
		        "favorite": true,
		        "width": 100,
		        "tooltip": ""
	        },
            {
                "name": "dob",
                "label": "Date of Birth",
                "dataType": "date",
                "favorite": true,
                "format": "m/d/Y",
                "width": 100,
                "tooltip": ""
            },
            {
                "name": "age",
                "label": "Age",
                "dataType": "int",
                "minValue": 14,
                "required": true,
                "tooltip": ""
            },
            {
                "name": "email",
                "label": "Email",
                "dataType": "email",
                "favorite": true,
                "width": 100,
                "tooltip": ""
            },
            {
                "name": "phone",
                "label": "Phone",
                "dataType": "string",
                "favorite": true,
                "multiValue": true,
                "width": 100,
                "tooltip": ""
            },
            {
                "name": "companyName",
                "label": "Company",
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
            {
                "name": "jobArea",
                "label": "Industry",
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
                "name": "country",
                "label": "Country",
                "dataType": "string",
                "selectorId": 'country',
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
                "name": "state",
                "label": "State",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "selectorId": 'state',
                "linkedField": "countryCode",
                "multiValue": true,
                "_links": {
                    "selector": {
                        "href": '/api/selectors/state'
                    },
                }
            },
            {
                "name": "city",
                "label": "City",
                "dataType": "string",
                "width": 200,
                "tooltip": ""
            },
            {
                "name": "zipCode",
                "label": "Zip",
                "dataType": "string",
                "length": 10,
                "tooltip": ""
            },

            {
                "name": "fileDA",
                "label": "Files DA",
                "dataType": "file",
		"variant": "droparea",
                "favorite": false,
                "required": false,
		"multiValue": false,
                "allowedExtensions": ["png", "jpg", "bmp"],
                "maximumSize": 10000000, // 10 Mb
                "tooltip": "Please attach your application form (if available)"
            },
            {
                "name": "fileMultiDA",
                "label": "Files Mutli DA",
                "dataType": "file",
		"variant": "droparea",
                "favorite": false,
                "required": false,
		"multiValue": true,
                "limit": 3,
                "allowedExtensions": ["png", "jpg", "bmp"],
                "maximumSize": 10000000, // 10 Mb
		"fullWidth": true,
                "tooltip": "Please attach your application form (if available)"
            },

            {
                "name": "id",
                "label": "Id",
                "dataType": "string",
                "width": 100,
                "readOnly": true,
                "hidden": true,
                "tooltip": ""
            },
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersViewFieldset1",
                "type": "application/json"
            }
        }
    },
    "documentsCheckin0": {
        "id": "documentsCheckin0",
        "resourceName": "documents",
        "resourceType": "Employee",
        "viewType": "CheckIn",
        "tabs": [{
            "id": "1",
            "title": "Details",
            "tooltip": "Employee Properties",
            "type": "Details",
            "fieldSetId": "documentsCheckinFieldset0",
            "_links": {
                "root": {
                    "href": "/api/config/components/documentsCheckin0",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/components/documentsCheckin0/tabs/1",
                    "type": "application/json"
                },
                "actions": {
                    "href": "/api/config/components/documentsCheckin0/tabs/1/actions",
                    "type": "application/json"
                },
                "fieldset": {
                    "href": "/api/config/components/documentsCheckinFieldset0",
                    "type": "application/json"
                }
            }
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/documentsCheckin0",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/documentsCheckin0/header",
                "type": "application/json"
            }
        }
    },
    "documentsCheckinFieldset0": {
        "fields": [
            {
                "name": "country",
                "label": "Country",
                "dataType": "string",
                "selectorId": 'country',
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
                "name": "state",
                "label": "State",
                "dataType": "string",
                "width": 200,
                "tooltip": "",
                "selectorId": 'state',
                "linkedField": "countryCode",
                "multiValue": true,
                "_links": {
                    "selector": {
                        "href": '/api/selectors/state'
                    },
                }
            },
            {
                "name": "id",
                "label": "Id",
                "dataType": "string",
                "width": 100,
                "readOnly": true,
                "tooltip": ""
            }
        ],
        "sections": [{
            "title": "Contacts",
            "expanded": false,
            "fields": [
                {
                    "name": "email",
                    "label": "Email",
                    "dataType": "email",
                    "width": 100,
                    "tooltip": ""
                },
                {
                    "name": "phone",
                    "label": "Phone",
                    "dataType": "string",
                    "multiValue": true,
                    "width": 100,
                    "tooltip": ""
                }
            ]
        }, {
            "title": "Personal",
            "expanded": false,
            "fields": [
                {
                    "name": "fullName",
                    "label": "Name",
                    "dataType": "string",
                    "width": 200,
                    "required": true,
                    "tooltip": ""
                },
                {
                    "name": "gender",
                    "label": "Gender",
                    "dataType": "string",
                    "width": 100,
                    "tooltip": ""
                },
                {
                    "name": "dob",
                    "label": "Date of Birth",
                    "dataType": "datetime",
                    "width": 100,
                    "tooltip": ""
                },
                {
                    "name": "age",
                    "label": "Age",
                    "dataType": "int",
                    "minValue": 14,
                    "required": true,
                    "tooltip": ""
                }
            ]
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/usersViewFieldset0",
                "type": "application/json"
            }
        }
    },
};
