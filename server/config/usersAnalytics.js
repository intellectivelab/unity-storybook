module.exports = {
    "industryStatistics": {
        "id": "industryStatistics",
        "type": "vComposite",
        "label": "Salary by Industry",
        "facets": [
            {
                id: "jobareas",
                type: "TERMS",
                field: "jobArea",
                label: 'Job Area',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "salaryMin",
                        type: "METRICS",
                        field: "salary",
                        label: 'Salary',
                        dataType: 'float',
                        function: "MIN"
                    },
                    {
                        id: "salaryMax",
                        type: "METRICS",
                        field: "salary",
                        label: 'Salary',
                        dataType: 'float',
                        function: "MAX"
                    }
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'jobareas', label: 'Job Area'},
                {type: 'lineMark', facet: 'salaryMin', label: 'Salary Min', curve: 'curveMonotoneX'},
                {type: 'lineMark', facet: 'salaryMax', label: 'Salary Max', curve: 'curveMonotoneX'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/industryStatistics",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "jobStatistics": {
        "id": "jobStatistics",
        "type": "vComposite",
        "label": "Jobs by Industry",
        "facets": [
            {
                id: "jobareas",
                type: "TERMS",
                field: "jobArea",
                label: 'Job Area',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "jobtypes",
                        type: "TERMS",
                        field: "jobType",
                        label: 'Job Type',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1
                    },
                    {
                        id: "salaryAvg",
                        type: "METRICS",
                        field: "salary",
                        label: 'Salary',
                        dataType: 'float',
                        function: "AVG"
                    }
                ]
            }
        ],
        plot: {
            "height": 360,
            series: [
                {type: 'bar', facet: 'jobtypes', label: 'Job Type', stack: true, cluster: 'jobtypes'},
                {type: 'mark', facet: 'salaryAvg', label: 'Salary Avg', curve: 'curveMonotoneX'},
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/jobStatistics",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "usersByCountry": {
        "id": "usersByCountry",
        "type": "pie",
        "label": "Users by Country",
        "facets": [
            {
                id: "countries",
                type: "TERMS",
                field: "countryName",
                label: 'Country',
                dataType: 'string',
                limit: 10,
                minCount: 1,
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersByCountry",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "usersByIndustry": {
        "id": "usersByIndustry",
        "type": "pie",
        "label": "Users by Industry",
        "facets": [
            {
                id: "industries",
                type: "TERMS",
                field: "jobArea",
                label: 'Job Area',
                dataType: 'string',
                limit: 10,
                minCount: 1,
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersByIndustry",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "usersByGender": {
        "id": "usersByGender",
        "type": "pie",
        "label": "Users by Gender",
        "facets": [
            {
                id: "genders",
                type: "TERMS",
                field: "gender",
                label: 'Gender',
                dataType: 'string',
                limit: 2,
                minCount: 1,
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/usersByGender",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "jobsAreaByCountry": {
        "id": "jobsAreaByCountry",
        "type": "hComposite",
        "label": "Industry by Country",
        "facets": [
            {
                id: "countryName",
                type: "TERMS",
                field: "countryName",
                label: 'Country',
                dataType: 'string',
                limit: 10,
                minCount: 1,
                nested: [
                    {
                        id: "jobArea",
                        type: "TERMS",
                        field: "jobArea",
                        label: 'Job Area',
                        dataType: 'string',
                        limit: 10,
                        minCount: 1
                    }
                ]
            }
        ],
        plot: {
            "height": 320,
            series: [
                {type: 'bar', facet: 'jobArea', label: 'Job Area', stack: true, cluster: 'jobArea'}
            ],
        },
        "_links": {
            "self": {
                "href": "/api/config/components/jobStatistics",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "jobsTypeByArea": {
        "id": "jobsTypeByArea",
        "type": "treeMap",
        "label": "Jobs by Industry",
        "facets": [
            {
                id: "jobArea",
                type: "TERMS",
                field: "jobArea",
                label: 'Job Area',
                dataType: 'string',
                limit: 5,
                minCount: 1,
                nested: [
                    {
                        id: "jobType",
                        type: "TERMS",
                        field: "jobType",
                        label: 'Job Type',
                        dataType: 'string',
                        limit: 5,
                        minCount: 1
                    }
                ]
            }
        ],
        plot: {
            "height": 500,
            "mode": "resquarify"
        },
        "_links": {
            "self": {
                "href": "/api/config/components/jobsTypeByArea",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "minAgeIndicator": {
        "id": "minAgeIndicator",
        "type": "text",
        "label": "Age Min",
        "facets": [
            {
                id: "age-min",
                type: "METRICS",
                field: "age",
                label: 'Age',
                dataType: 'int',
                function: "MIN"
            },
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/minAgeIndicator",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "maxAgeIndicator": {
        "id": "maxAgeIndicator",
        "type": "text",
        "label": "Age Max",
        "facets": [
            {
                id: "age-max",
                type: "METRICS",
                field: "age",
                label: 'Age',
                dataType: 'int',
                function: "MAX"
            },
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/maxAgeIndicator",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
    "salaryAvgIndicator": {
        "id": "salaryAvgIndicator",
        "type": "text",
        "label": "Salary Average",
        "facets": [
            {
                id: "salaryAvg",
                type: "METRICS",
                field: "salary",
                label: 'Salary',
                dataType: 'float',
                function: "AVG"
            }
        ],
        "_links": {
            "self": {
                "href": "/api/config/components/salaryAvgIndicator",
                "type": "application/json"
            },
            "facetItems": {
                "href": "/api/users/facets/select"
            }
        }
    },
};