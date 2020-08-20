module.exports = {
    "TasksByRegion": {
        "id": "TasksByRegion",
        "type": "hComposite",
        "label": "Open Tasks By Region",
        "facets": [
            {
                id: "region",
                type: "TERMS",
                field: "region",
                label: 'Region',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "subRegion",
                        type: "TERMS",
                        field: "sub_region",
                        label: 'Sub Region',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1
                    },
                    {
                        id: "avgTaskDuration",
                        type: "METRICS",
                        field: "task_duration",
                        label: 'Task Duration',
                        dataType: 'float',
                        function: "AVG",
                    },
                ]
            }
        ],
        "filter": "task_status==Open",
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'subRegion', label: 'Sub Region', stack: true, cluster: 'subRegion'},
                {type: 'lineMark', facet: 'avgTaskDuration', label: 'Avg Task Duration',},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/OpenTasksByRegion",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "AvgCaseTypeDuration": {
        "id": "AvgCaseTypeDuration",
        "type": "hComposite",
        "label": "Avg Case Type Duration",
        "facets": [
            {
                id: "caseType",
                type: "TERMS",
                field: "case_type",
                label: 'Case Type',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "avgTaskDuration",
                        type: "METRICS",
                        field: "task_duration",
                        label: 'Task Duration',
                        dataType: 'float',
                        function: "AVG",
                    },
                    {
                        id: "avgCaseDuration",
                        type: "METRICS",
                        field: "case_duration",
                        label: 'Case Duration',
                        dataType: 'float',
                        function: "AVG",
                    },
                ]
            }
        ],
        "plot": {
            "height": 240,
            "series": [
                {type: 'bar', facet: 'avgTaskDuration', label: 'Avg Task Duration'},
                {type: 'bar', facet: 'avgCaseDuration', label: 'Avg Case Duration'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/AvgCaseTypeDuration",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "CaseTypes": {
        "id": "CaseTypes",
        "type": "pie",
        "label": "Case Types",
        "facets": [
            {
                id: "caseTypes",
                type: "TERMS",
                field: "case_type",
                label: 'Case Type',
                dataType: 'string',
                limit: 10,
                minCount: 1,
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/CaseTypes",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "CaseAvgDuration": {
        "id": "CaseAvgDuration",
        "type": "text",
        "label": "Case Avg Duration",
        "facets": [
            {
                id: "CaseAvgDuration",
                type: "METRICS",
                field: "case_duration",
                label: 'Case duration',
                dataType: 'float',
                function: "AVG"
            },
        ],
        "filter": "case_status==Close",
        "_links": {
            "self": {
                "href": "/api/config/components/CaseAvgDuration",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "ActiveCases": {
        "id": "ActiveCases",
        "type": "text",
        "label": "Active Cases",
        "facets": [
            {
                id: "ActiveCases",
                type: "METRICS",
                field: "case_id",
                label: 'Case Id',
                dataType: 'int',
                function: "UNIQUE"
            },
        ],
        "filter": "case_status==Open",
        "_links": {
            "self": {
                "href": "/api/config/components/ActiveCases",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "SLA_Warnings": {
        "id": "SLA_Warnings",
        "type": "text",
        "label": "SLA Warnings",
        "facets": [
            {
                id: "SLA_Warnings",
                type: "METRICS",
                field: "sla_warning_date",
                label: 'SLA Warning date',
                dataType: 'int',
                function: "COUNT"
            },
        ],
        "filter": "sla_warning_date==TRUE",
        "_links": {
            "self": {
                "href": "/api/config/components/SLA_Warnings",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "TasksByStartDate": {
        "id": "TasksByStartDate",
        "type": "vComposite",
        "label": "Tasks By Start Date",
        "facets": [
            {
                id: "work_item_start",
                type: "RANGE",
                field: "work_item_start",
                label: 'Work Item Start Date',
                dataType: 'date',
                start: '2019-01-01',
                end: '2019-04-30',
                gap: '7d'
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'work_item_start', label: 'Start Date'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/TasksByStartDate",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "SLAByWeek": {
        "id": "SLAByWeek",
        "type": "vComposite",
        "label": "SLA By Week",
        "facets": [
            {
                id: "case_start_time",
                type: "RANGE",
                field: "case_start_time",
                label: 'Case Start Date',
                dataType: 'date',
                start: '2019-01-01',
                end: '2019-04-30',
                gap: '7d',
                nested: [
                    {
                        id: "sla_status",
                        type: "TERMS",
                        field: "sla_status",
                        label: 'SLA Status',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1
                    }
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'sla_status', label: 'SLA Status', stack: true, cluster: 'sla_status'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/SLAByWeek",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "TaskNamesByStartDate": {
        "id": "TaskNamesByStartDate",
        "type": "vComposite",
        "label": "Task Names By Start Date",
        "facets": [
            {
                id: "case_start_time",
                type: "RANGE",
                field: "case_start_time",
                label: 'Case Start Date',
                dataType: 'date',
                start: '2019-01-01',
                end: '2019-04-30',
                gap: '7d',
                nested: [
                    {
                        id: "task_name",
                        type: "TERMS",
                        field: "task_name",
                        label: 'Task Name',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1
                    }
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'line', facet: 'task_name', label: 'Task Name', stack: true, cluster: 'task_name'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/TaskNamesByStartDate",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "ReasonsForDelay": {
        "id": "ReasonsForDelay",
        "type": "hComposite",
        "label": "Reasons for Delay",
        "facets": [
            {
                id: "note",
                type: "TERMS",
                field: "note",
                label: 'Note',
                dataType: 'string',
                limit: 10,
                minCount: 7,
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'note', label: 'Reasons'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/ReasonsForDelay",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "RegionCaseType": {
        "id": "RegionCaseType",
        "type": "vComposite",
        "label": "Region Case Type",
        "facets": [
            {
                id: "region",
                type: "TERMS",
                field: "region",
                label: 'Region',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "caseType",
                        type: "TERMS",
                        field: "case_type",
                        label: 'Case Type',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1,
                    }
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'caseType', label: 'Case Type'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/ReasonsForDelay",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "SlaByRegion": {
        "id": "SlaByRegion",
        "type": "tableHeatMap",
        "facets": [
            {
                id: "region",
                type: "TERMS",
                field: "region",
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "subRegion",
                        type: "TERMS",
                        field: "sub_region",
                        limit: 10,
                        minCount: 1,
                        nested: [
                            {
                                id: "slaStatus",
                                type: "TERMS",
                                field: "sla_status",
                                limit: 10,
                                minCount: 1,
                            }
                        ]
                    },
                ]
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/SlaByRegion",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "AssignedToName": {
        "id": "AssignedToName",
        "type": "tableHeatMap",
        "label": "Assigned To Name",
        "facets": [
            {
                id: "caeType",
                type: "TERMS",
                field: "case_type",
                label: "Case Type",
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "slaStatus",
                        type: "TERMS",
                        field: "sla_status",
                        label: "SLA Status",
                        limit: 10,
                        minCount: 1,
                        nested: [
                            {
                                id: "assignedToName",
                                type: "TERMS",
                                field: "assigned_to_name",
                                label: "Assigned To",
                                limit: 10,
                                minCount: 1,
                            }
                        ]
                    },
                ]
            }
        ],
        scale: {
            colorScale: {
                range: ['#b2dfdb', '#8bc34a', '#0d47a1'],
                domain: ['0', '10', '341'],
            },
            opacityScale: {
                range: ['0.7', '1'],
                domain: ['0', '341'],
            }
        },
        "_links": {
            "self": {
                "href": "/api/config/components/AssignedToName",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
    "HierarchyComposite": {
        "id": "HierarchyComposite",
        "type": "vComposite",
        "label": "Hierarchy Composite Chart",
        "facets": [
            {
                id: "work_item_start",
                type: "RANGE",
                field: "work_item_start",
                label: 'Work Item Start Date',
                dataType: 'date',
                start: '2019-01-01',
                end: '2019-04-30',
                gap: '1m',
                nested: [
                    {
                        id: "taskName",
                        type: "TERMS",
                        field: "task_name",
                        label: 'Task Name',
                        dataType: 'string',
                        limit: 3,
                        minCount: 1,
                        nested: [
                            {
                                id: "avgTaskDurationByTaskName",
                                type: "METRICS",
                                field: "task_duration",
                                label: 'Task Duration',
                                dataType: 'float',
                                function: "AVG",
                            },
                        ]
                    },
                    {
                        id: "avgTaskDurationAll",
                        type: "METRICS",
                        field: "task_duration",
                        label: 'Task Duration',
                        dataType: 'float',
                        function: "AVG",
                    },
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'taskName', label: 'Task Name', stack: true, cluster: 'taskName'},
                {type: 'lineMark', facet: 'avgTaskDurationAll', label: 'AVG Task Duration'},
                {type: 'lineMark', facet: 'avgTaskDurationByTaskName', label: 'AVG Task Duration', stack: true, cluster: 'durationByTaskName'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/HierarchyComposite",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/casetasks/facets/select"
            }
        }
    },
};