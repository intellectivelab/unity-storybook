module.exports = {
	"CaseSearchTemplate": {
		"id": "CaseSearchTemplate",
		"title": "Case Search",
		"hidden": false,
		"_links": {
			"self": {
				"href": "/api/config/components/CaseSearchTemplate",
				"type": "application/json"
			},
			"criteria": {
				"href": "/api/config/components/caseTasksCriteria",
				"type": "application/json"
			},
			"grid": {
				"href": "/api/config/components/casetasks",
				"type": "application/json"
			},
			"query": {
				"href": "/api/casetasks/query",
				"type": "application/json"
			},
			"list": {
				"href": "/api/casetasks/list",
				"type": "application/json"
			}
		}
	},
	"casetasksEnterpriseSearch": {
        "id": "casetasksEnterpriseSearch",
        "title": "Enterprise Case Tasks Search",
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksEnterpriseSearch",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/caseTasksCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/casetasks",
                "type": "application/json"
            },
            "query": {
                "href": "/api/resources/casetasks/query",
                "type": "application/json"
            },
            "list": {
                "href": "/api/casetasks/list",
                "type": "application/json"
            },
        }
    },
    "casetasks": {
        "id": "casetasks",
        "title": "Case Tasks",
        "columns": [
            {
                "name": "case_id",
                "label": "Case Id",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case Identifier",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case Type",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "case_start_time",
                "label": "Case Start Time",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case Start Time",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "case_end_time",
                "label": "Case End Time",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case End Time",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "case_duration",
                "label": "Case Duration",
                "dataType": "numeric",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case Duration",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "case_status",
                "label": "Case Status",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Case Status",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "region",
                "label": "Region",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Region",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "sub_region",
                "label": "Sub Region",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Sub Region",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "work_item_start",
                "label": "Work Item Start",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Work Item Start",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "work_item_end",
                "label": "Work Item End",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Work Item End",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "work_item_duration",
                "label": "Work Item Duration",
                "dataType": "numeric",
                "width": 100,
                "multiValue": false,
                "tooltip": "Work Item Duration",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_id",
                "label": "Task Id",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Identifier",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_name",
                "label": "Task Name",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Name",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_start",
                "label": "Task Start",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Name",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_end",
                "label": "Task End",
                "dataType": "date",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task End",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_duration",
                "label": "Task Duration",
                "dataType": "numeric",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Duration",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_working_duration",
                "label": "Task Working Duration",
                "dataType": "numeric",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Working Duration",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "task_status",
                "label": "Task Status",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Task Status",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "note",
                "label": "Note",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Note",
                "sortable": true,
                "resizable": false,
                "maxLength": 10,
                "minLength": 2
            },
            {
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Assigned To",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "sla_warning_date",
                "label": "SLA Warning",
                "dataType": "boolean",
                "width": 50,
                "multiValue": false,
                "tooltip": "SLA Warning",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "sla_critical_date",
                "label": "SLA Critical",
                "dataType": "boolean",
                "width": 50,
                "multiValue": false,
                "tooltip": "SLA Critical",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "sla_exceed_date",
                "label": "SLA Exceed",
                "dataType": "boolean",
                "width": 50,
                "multiValue": false,
                "tooltip": "SLA Exceed",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "sla_status",
                "label": "SLA Status",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "SLA Status",
                "sortable": true,
                "resizable": false
            },
            {
                "name": "ucmLockedStatus",
                "label": "Locked Status",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Locked Status",
                "sortable": true,
                "resizable": false
            },
        ],
        "favorite": ['task_name', 'case_type', 'case_status'],
        "default": ["case_type", "case_status", "region", "sub_region", "task_name", "task_status", "ucmLockedStatus", "note", "task_working_duration"],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasks",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/casetasks/actions",
                "type": "application/json"
            }
        }
    },
    "caseTasksCriteria": {
        "id": "caseTasksCriteria",
        "sections": [
            {
                "title": "Case",
                "subtitle": "Details",
                "fields": [
                    {
                        "name": "task_working_duration",
                        "label": "Task Working Duration",
                        "dataType": "float",
                        "format": "hours: +1,000.0",
                        "operator": {
                            "id": "gt",
                            "name": "greater than"
                        }
                    },
                    {
                        name: 'case_type',
                        dataType: 'fieldstats',
                        label: 'Case Type',
                        ui: 'checkbox',
                        "facets": [
                            {
                                id: "caseTypes",
                                type: "TERMS",
                                field: "case_type",
                                label: 'Case Type',
                                dataType: 'string',
                                limit: 10,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/casetasks/facets/select'
                            }
                        }
                    },
                    {
                        name: 'case_status',
                        dataType: 'fieldstats',
                        label: 'Case Status',
                        ui: 'toggle',
                        "facets": [
                            {
                                id: "caseStatus",
                                type: "TERMS",
                                field: "case_status",
                                label: 'Job Status',
                                dataType: 'string',
                                limit: 10,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/casetasks/facets/select'
                            }
                        }
                    },
                ]
            },
            {
                "title": "Task",
                "subtitle": "Details",
                "fields": [
                    {
                        name: 'task_status',
                        dataType: 'fieldstats',
                        label: 'Task Status',
                        ui: 'toggle',
                        "facets": [
                            {
                                id: "taskStatus",
                                type: "TERMS",
                                field: "task_status",
                                label: 'Job Status',
                                dataType: 'string',
                                limit: 10,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/casetasks/facets/select'
                            }
                        }
                    },
                ]
            },
            {
                "title": "Region",
                "subtitle": "Details",
                "fields": [
                    {
                        name: 'region',
                        dataType: 'fieldstats',
                        label: 'Region',
                        ui: 'toggle',
                        "facets": [
                            {
                                id: "region",
                                type: "TERMS",
                                field: "region",
                                label: 'Region',
                                dataType: 'string',
                                limit: 10,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/casetasks/facets/select'
                            }
                        }
                    },
                    {
                        name: 'sub_region',
                        dataType: 'fieldstats',
                        label: 'Sub Region',
                        ui: 'checkbox',
                        "facets": [
                            {
                                id: "subRegion",
                                type: "TERMS",
                                field: "sub_region",
                                label: 'Sub Region',
                                dataType: 'string',
                                limit: 10,
                                minCount: 1
                            }
                        ],
                        "_links": {
                            "facetItems": {
                                "href": '/api/casetasks/facets/select'
                            }
                        }
                    },
                ]
            },
        ]
    },
    "casetasksView0": {
        "id": "CC_Complaint",
        "resourceName": "documents",
        "resourceType": "CC_Complaint",
        "viewType": "Open",
        "tabs": [
            {
                "id": "1",
                "title": "Details",
                "tooltip": "CC_Complaint Details",
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
                "tooltip": "CC_Complaint Documents",
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
                        "href": "/api/config/components/usersAsAttachments/templates",
                        "type": "application/json"
                    }
                }
            },
            {
                "id": "3",
                "title": "Activity",
                "tooltip": "CC_Complaint History",
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
        "id": "CC_Complaint",
        "resourceName": "documents",
        "resourceType": "CC_Complaint",
        "viewType": "Open",
        "tabs": [
            {
                "id": "1",
                "title": "Details",
                "tooltip": "CC_Complaint Details",
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
    "casetasksView2": {
        "id": "CC_Complaint",
        "resourceName": "cases",
        "resourceType": "CC_Complaint",
        "viewType": "Dispatch",
        "tabs": [
            {
                "id": "1",
                "title": "Details",
                "tooltip": "CC_Complaint Details",
                "type": "Details",
                "fieldSetId": "casetasksViewFieldset3",
                "_links": {
                    "root": {
                        "href": "/api/config/components/casetasksView2",
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
                        "href": "/api/config/components/casetasksViewFieldset3",
                        "type": "application/json"
                    }
                }
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksView2",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/casetasksView2/header",
                "type": "application/json"
            }
        }
    },
    "casetasksViewFieldset0": {
        "fields": [
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Type"
            },
            {
                "name": "case_start_time",
                "label": "Case Start Time",
                "dataType": "datetime",
                "width": 100,
                "multiValue": true,
                "tooltip": "Case Start Time"
            },
            {
                "name": "case_id",
                "label": "Case Id",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Identifier"
            },
            {
                "name": "case_end_time",
                "label": "Case End Time",
                "dataType": "date",
                "width": 100,
                "tooltip": "Case End Time"
            },
            {
                "name": "case_status",
                "label": "Case Status",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Status"
            },
            {
                "name": "work_item_start",
                "label": "Work Item Start",
                "dataType": "date",
                "width": 100,
                "tooltip": "Work Item Start"
            },
            {
                "name": "work_item_end",
                "label": "Work Item End",
                "dataType": "date",
                "width": 100,
                "tooltip": "Work Item End"
            },
            {
                "name": "task_id",
                "label": "Task Id",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Identifier"
            },
            {
                "name": "task_name",
                "label": "Task Name",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Name"
            },
            {
                "name": "task_start",
                "label": "Task Start",
                "dataType": "date",
                "width": 100,
                "tooltip": "Task Name"
            },
            {
                "name": "task_end",
                "label": "Task End",
                "dataType": "date",
                "width": 100,
                "tooltip": "Task End"
            },
            {
                "name": "task_status",
                "label": "Task Status",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Status"
            },
            {
                "name": "task_working_duration",
                "label": "Task Working Duration",
                "dataType": "float",
                "width": 100,
                "tooltip": "Task Working Duration",
                "format": "hours: +1,000.0",
                "maxValue": 120
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
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assigned To"
            }
        ],
        "sections": [{
            "title": "SLA",
            "expanded": false,
            "fields": [
                {
                    "name": "sla_warning_date",
                    "label": "SLA Warning",
                    "dataType": "boolean",
                    "width": 50,
                    "tooltip": "SLA Warning"
                },
                {
                    "name": "sla_critical_date",
                    "label": "SLA Critical",
                    "dataType": "boolean",
                    "width": 50,
                    "tooltip": "SLA Critical"
                },
                {
                    "name": "sla_exceed_date",
                    "label": "SLA Exceed",
                    "dataType": "boolean",
                    "width": 50,
                    "tooltip": "SLA Exceed"
                },
                {
                    "name": "sla_status",
                    "label": "SLA Status",
                    "dataType": "string",
                    "width": 100,
                    "tooltip": "SLA Status"
                }
            ]
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksViewFieldset0",
                "type": "application/json"
            }
        }
    },
    "casetasksViewFieldset1": {
        "fields": [
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Type"
            },
            {
                "name": "case_start_time",
                "label": "Case Start Time",
                "dataType": "datetime",
                "required": false,
                "multiValue": true,
                "width": 100,
                "tooltip": "Case Start Time"
            },
            {
                "name": "case_id",
                "label": "Case Id",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Identifier"
            },
            {
                "name": "case_end_time",
                "label": "Case End Time",
                "dataType": "date",
                "required": true,
                "width": 100,
                "tooltip": "Case End Time"
            },
            {
                "name": "case_status",
                "label": "Case Status",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Status"
            },
            {
                "name": "work_item_start",
                "label": "Work Item Start",
                "dataType": "date",
                "width": 100,
                "tooltip": "Work Item Start"
            },
            {
                "name": "work_item_end",
                "label": "Work Item End",
                "dataType": "date",
                "width": 100,
                "tooltip": "Work Item End"
            },
            {
                "name": "task_id",
                "label": "Task Id",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Identifier"
            },
            {
                "name": "task_name",
                "label": "Task Name",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Name"
            },
            {
                "name": "task_start",
                "label": "Task Start",
                "dataType": "date",
                "width": 100,
                "tooltip": "Task Name"
            },
            {
                "name": "task_end",
                "label": "Task End",
                "dataType": "date",
                "width": 100,
                "tooltip": "Task End"
            },
            {
                "name": "task_status",
                "label": "Task Status",
                "dataType": "string",
                "width": 100,
                "tooltip": "Task Status"
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
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assigned To"
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
    "casetasksViewFieldset2": {
        "fields": [
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Type",
                "readOnly": false
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
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assigned To"
            }
        ],
        "sections": [],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksViewFieldset2",
                "type": "application/json"
            }
        }
    },
    "casetasksViewFieldset3": {
        "fields": [
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "width": 100,
                "tooltip": "Case Type",
                "readOnly": false
            },
            {
                "name": "region",
                "label": "Region",
                "dataType": "string",
                "width": 100,
                "multiValue": false,
                "tooltip": "Region",
                "sortable": true,
                "resizable": false
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
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assigned To"
            }
        ],
        "sections": [],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksViewFieldset2",
                "type": "application/json"
            }
        }
    },
    "casetasksReassign0": {
        "id": "CC_Complaint",
        "resourceName": "documents",
        "resourceType": "CC_Complaint",
        "viewType": "Open",
        "tabs": [
            {
                "id": "1",
                "title": "CC_Complaint Properties",
                "tooltip": "CC_Complaint Properties",
                "type": "Details",
                "fieldSetId": "casetasksViewFieldset2",
                "_links": {
                    "root": {
                        "href": "/api/config/components/casetasksReassign2",
                        "type": "application/json"
                    },
                    "self": {
                        "href": "/api/config/components/casetasksReassign2/tabs/1",
                        "type": "application/json"
                    },
                    "actions": {
                        "href": "/api/config/components/casetasksReassign2/tabs/1/actions",
                        "type": "application/json"
                    },
                    "fieldset": {
                        "href": "/api/config/components/casetasksViewFieldset2",
                        "type": "application/json"
                    }
                }
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/casetasksReassign1",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/casetasksView0/header",
                "type": "application/json"
            }
        }
    },
    "commentAddView0": {
        "id": "CC_Complaint",
        "resourceName": "cases",
        "resourceType": "CC_Complaint",
        "viewType": "AddComment",
        "tabs": [{
            "id": "1",
            "title": "CC_Complaint Properties",
            "tooltip": "CC_Complaint Properties",
            "type": "Details",
            "fieldSetId": "commentFieldset0",
            "_links": {
                "root": {
                    "href": "/api/config/components/commentAddView0",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/components/commentAddView0/tabs/1",
                    "type": "application/json"
                },
                "actions": {
                    "href": "/api/config/components/commentAddView0/tabs/1/actions",
                    "type": "application/json"
                },
                "fieldset": {
                    "href": "/api/config/components/commentFieldset0",
                    "type": "application/json"
                }
            }
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/commentAddView0",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/commentAddView0/header",
                "type": "application/json"
            }
        }
    },
    "commentEditView0": {
        "id": "CC_Complaint",
        "resourceName": "cases",
        "resourceType": "CC_Complaint",
        "viewType": "EditComment",
        "tabs": [{
            "id": "1",
            "title": "Details",
            "tooltip": "CC_Complaint Details",
            "type": "Details",
            "fieldSetId": "commentFieldset1",
            "_links": {
                "root": {
                    "href": "/api/config/components/commentEditView0",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/components/commentEditView0/tabs/1",
                    "type": "application/json"
                },
                "actions": {
                    "href": "/api/config/components/commentEditView0/tabs/1/actions",
                    "type": "application/json"
                },
                "fieldset": {
                    "href": "/api/config/components/commentFieldset1",
                    "type": "application/json"
                }
            }
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/commentEditView0",
                "type": "application/json"
            },
            "header": {
                "href": "/api/config/components/commentEditView0/header",
                "type": "application/json"
            }
        }
    },
    "commentFieldset0": {
        "fields": [
            {
                "name": "ucmAnnotationComment",
                "label": "Comment",
                "dataType": "string",
                "required": true,
                "ui": "rtftext"
            }
        ],
        "sections": [],
        "_links": {
            "self": {
                "href": "/api/config/components/commentFieldset0",
                "type": "application/json"
            }
        }
    },
    "commentFieldset1": {
        "fields": [
            {
                "name": "eventTitle",
                "label": "Comment",
                "dataType": "string",
	            "required": true,
                "ui": "rtftext"
            },
            {
                "name": "eventActor",
                "label": "Last Modifier",
                "dataType": "string",
                "required": true,
                "readOnly": true
            }
        ],
        "sections": [],
        "_links": {
            "self": {
                "href": "/api/config/components/commentFieldset0",
                "type": "application/json"
            }
        }
    },
    "historyTemplateSet": [
        {
            "id": "historySearchTemplate",
            "title": "CC_Complaint History",
            "_links": {
                "self": {
                    "href": "/api/config/components/historySearchTemplate",
                    "type": "application/json"
                },
                "criteria": {
                    "href": "/api/config/components/historySearchCriteria",
                    "type": "application/json"
                },
                "grid": {
                    "href": "/api/config/components/history",
                    "type": "application/json"
                },
                "query": {
                    "href": "/api/history/query",
                    "type": "application/json"
                },
            }
        }
    ],
    "historySearchTemplate": {
        "id": "historySearchTemplate",
        "title": "CC_Complaint History",
        "hidden": false,
        "_links": {
            "self": {
                "href": "/api/config/components/historySearchTemplate",
                "type": "application/json"
            },
            "criteria": {
                "href": "/api/config/components/historySearchCriteria",
                "type": "application/json"
            },
            "grid": {
                "href": "/api/config/components/history",
                "type": "application/json"
            },
            "query": {
                "href": "/api/history/query",
                "type": "application/json"
            },
        }
    },
    "historySearchCriteria": {
        "id": "historySearchCriteria",
        "hidden": false,
        "fields": []
    },
    "history": {
        "id": "history",
        "title": "History",
        "columns": [
            {
                "name": "eventDate",
                "label": "Last Modified",
                "dataType": "string",
                "multiValue": false,
                "tooltip": "",
                "sortable": false,
                "resizable": false
            },
            {
                "name": "eventActor",
                "label": "Creator",
                "dataType": "string",
                "tooltip": "",
                "sortable": true,
                "resizable": true
            },
            {
                "name": "eventTitle",
                "label": "Comment",
                "dataType": "string",
                "tooltip": "",
                "sortable": false,
                "resizable": true
            },
            {
                "name": "eventType",
                "label": "Event Type",
                "dataType": "string",
                "tooltip": "",
                "sortable": false,
                "resizable": true
            }
        ],
        "favorite": [],
        "default": ["eventDate", "eventActor", "eventTitle"],
        "sorting": [{
            "column": "eventDate",
            "direction": "DESC"
        }],
        "_links": {
            "self": {
                "href": "/api/config/components/history",
                "type": "application/json"
            },
            "actions": {
                "href": "/api/config/grids/history/actions",
                "type": "application/json"
            }
        }
    },
};