module.exports = [
	{
		"id": "search",
		"title": "UnityDefaultPage.js",
		"default": true,
		"dashboards": [
			{
				"id": "page1",
				"title": "Employees Search",
				"tooltip": "Single Template",
				"lazy": true,
				"components": [
					{
						"id": "usersSearch0",
						"type": "searchTemplate",
						"_links": {
							"config": {
								"href": "/api/config/components/usersSearch0"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page1"
					},
				}
			},
			{
				"id": "page12",
				"title": "Case Search",
				"tooltip": "Single Template",
				"lazy": true,
				"default": false,
				"builder": 'page',
				"components": [
					{
						"id": "CaseSearchTemplate",
						"type": "searchTemplate",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseSearchTemplate"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page12"
					}
				}
			},
            {
                "id": "page13",
                "title": "Process Analytics",
                "tooltip": "Process Analytics",
                "lazy": true,
                "builder": 'custom',
                "components": [
                    {
                        "id": "SLAByWeek",
                        "type": "chart",
                        "_links": {
                            "config": {
                                "href": "/api/config/components/SLAByWeek"
                            }
                        }
                    },
                    {
                        "id": "AvgCaseTypeDuration",
                        "type": "chart",
                        "_links": {
                            "config": {
                                "href": "/api/config/components/AvgCaseTypeDuration"
                            }
                        }
                    },
                    {
                        "id": "RegionCaseType",
                        "type": "chart",
                        "_links": {
                            "config": {
                                "href": "/api/config/components/RegionCaseType"
                            }
                        }
                    },
                    {
                        "id": "casetasks",
                        "type": "grid",
                        "_links": {
                            "config": {
                                "href": "/api/config/components/casetasks"
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
                ],
                "_links": {
                    "self": {
                        "href": "/api/config/perspectives/search/dashboards/page13"
                    },
                    "actions": {
                        "href": "/api/config/perspectives/search/dashboards/dashboard/actions"
                    },
                }
            },
		],
		"_links": {
			"self": {
				"href": "/api/config/perspectives/search"
			},
			"dashboards": {
				"href": "/api/config/perspectives/search/dashboards"
			}
		}
	}
];
