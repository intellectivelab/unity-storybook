module.exports = {
    "users": {
        "name": "User",
        "label": "User",
        "description": "",
        "fields": [
            {
                "name": "id",
                "label": "Id",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": true,
                "filterable": false,
                "sortable": false,
                "required": false
            },
            {
                "name": "fullName",
                "label": "Name",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "gender",
                "label": "Gender",
                "dataType": "choices",
                "options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}],
                "multiValue": false,
                "readOnly": false,
                "defaultValue": "Female",
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": true
            },
            {
                "name": "dob",
                "label": "Date of Birth",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "age",
                "label": "Age",
                "dataType": "int",
                "multiValue": false,
                "readOnly": false,
                "minValue": 14,
                "maxValue": 150,
                "required": true,
                "tooltip": ""
            },
            {
                "name": "email",
                "label": "Email",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "phone",
                "label": "Phone",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "companyName",
                "label": "Company",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": true
            },
            {
                "name": "jobArea",
                "label": "Industry",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "jobType",
                "label": "Job",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "countryName",
                "label": "Country",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "state",
                "label": "State",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "city",
                "label": "City",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "zipCode",
                "label": "Zip",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": false,
                "sortable": true,
                "required": false
            }
        ]
    },
    "casetasks": {
        "name": "CC_Complaint",
        "label": "Complaint",
        "description": "",
        "fields": [
            {
                "name": "case_id",
                "label": "Case Id",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "case_type",
                "label": "Case Type",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "case_start_time",
                "label": "Case Start Time",
                "dataType": "date",
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "multiValue": false,
                "sortable": true,
                "required": false
            },
            {
                "name": "case_end_time",
                "label": "Case End Time",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "case_duration",
                "label": "Case Duration",
                "dataType": "numeric",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "case_status",
                "label": "Case Status",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "region",
                "label": "Region",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "sub_region",
                "label": "Sub Region",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "work_item_start",
                "label": "Work Item Start",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "work_item_end",
                "label": "Work Item End",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "work_item_duration",
                "label": "Work Item Duration",
                "dataType": "numeric",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_id",
                "label": "Task Id",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_name",
                "label": "Task Name",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_start",
                "label": "Task Start",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_end",
                "label": "Task End",
                "dataType": "date",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_duration",
                "label": "Task Duration",
                "dataType": "numeric",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_working_duration",
                "label": "Task Working Duration",
                "dataType": "numeric",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "task_status",
                "label": "Task Status",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "note",
                "label": "Note",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "assigned_to_name",
                "label": "Assigned To",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "sla_warning_date",
                "label": "SLA Warning",
                "dataType": "boolean",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "sla_critical_date",
                "label": "SLA Critical",
                "dataType": "boolean",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "sla_exceed_date",
                "label": "SLA Exceed",
                "dataType": "boolean",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            },
            {
                "name": "sla_status",
                "label": "SLA Status",
                "dataType": "string",
                "multiValue": false,
                "readOnly": false,
                "hidden": false,
                "filterable": true,
                "sortable": true,
                "required": false
            }
        ]
    }
};
