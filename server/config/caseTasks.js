module.exports = {
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
                "name": "assigned_to",
                "label": "Assigned To",
                "dataType": "lookup",
                "lookupId": "usersLookup",
                "_links": {
                    "lookup": {
                        "href": '/api/config/components/usersLookup'
                    },
                    "lookupData": {
                        "href": '/api/config/components/usersLookup/data?id={id}'
                    }
                },
                "width": 100,
                "tooltip": "Assigned To"
            },
            {
                "name": "assignee_address",
                "label": "Assignee Address",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assignee Address"
            },
            {
                "name": "website",
                "label": "Website",
                "dataType": "url",
                "ui": "usersUrl",
                "width": 100,
                "tooltip": "Website",
                "defaultValue": "http://www.intellective.com"
            },
            {
                "name": "rating",
                "label": "Rating",
                "dataType": "integer",
                "ui": "rating",
                "defaultValue": 0
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
                "minLength": 2,
                "colSpan": 2
            },
            {
                "name": "assigned_to",
                "label": "Assigned To",
                "dataType": "lookup",
                "lookupId": "usersLookup",
                "linkedFieldId": "assignee_address",
                "_links": {
                    "lookup": {
                        "href": '/api/config/components/usersLookup'
                    },
                    "lookupData": {
                        "href": '/api/config/components/usersLookup/data?id={id}'
                    }
                },
                "width": 100,
                "tooltip": "Assigned To"
            },

            {
                "name": "assignee_address",
                "label": "Assignee Address",
                "dataType": "string",
                "width": 100,
                "tooltip": "Assignee Address"
            },
            {
                "name": "website",
                "label": "Website",
                "dataType": "url",
                "ui": "usersUrl",
                "width": 100,
                "tooltip": "Website",
                "defaultValue": "http://www.intellective.com"
            },
            {
                "name": "rating",
                "label": "Rating",
                "dataType": "integer",
                "ui": "rating",
                "defaultValue": 0
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
};
