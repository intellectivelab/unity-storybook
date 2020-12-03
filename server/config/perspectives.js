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
				"id": "page2",
				"title": "Employees Search",
				"tooltip": "Single Template With Filter",
				"lazy": true,
				filter: "gender==Male",
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
						"href": "/api/config/perspectives/search/dashboards/page2"
					},
				}
			},
			{
				"id": "page3",
				"title": "Employees Search",
				"tooltip": "Multiple Templates",
				"lazy": true,
				"containers": [
					{
						"ui": "tabs",
						"components": [
							{
								"id": "usersSearch0",
								"type": "searchTemplate",
								"title": "Female",
								"_links": {
									"config": {
										"href": "/api/config/components/usersSearch_Female"
									}
								}
							},
							{
								"id": "usersSearch1",
								"type": "searchTemplate",
								"title": "Male",
								"_links": {
									"config": {
										"href": "/api/config/components/usersSearch_Male"
									}
								}
							},
						],
					}
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page3"
					},
				}
			},
			{
				"id": "page8",
				"title": "Documents Search",
				"tooltip": "Folder View",
				"components": [
					{
						"id": "DocumentSearchTemplate",
						"type": "searchTemplate",
						"folderPath": "/",
						"_links": {
							"config": {
								"href": "/api/config/components/DocumentSearchTemplate"
							},
							"browse": {
								"href": "/api/folders/browse?scope=ce_repository&root=/&offset=0&limit=20"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page8"
					},
					"actions": {
						"href": "/api/config/perspectives/search/dashboards/page8/actions"
					}
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
				"id": "page9",
				"title": "Enterprise Search",
				"tooltip": "Multiple Templates",
				"lazy": true,
				"containers": [
					{
						"ui": "tabs",
						"components": [
							{
								"id": "usersEnterpriseSearch",
								"type": "searchTemplate",
								"title": "Users Search",
								"_links": {
									"config": {
										"href": "/api/config/components/usersEnterpriseSearch"
									}
								}
							},
							{
								"id": "casetasksEnterpriseSearch",
								"type": "searchTemplate",
								"title": "Case Tasks Search",
								"_links": {
									"config": {
										"href": "/api/config/components/casetasksEnterpriseSearch"
									}
								}
							},
						],
					}
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page9"
					},
				}
			},
			{
				"id": "page4",
				"title": "Employees Analytics",
				"tooltip": "Employees Analytics Visualization",
				"lazy": true,
				"builder": 'dashboard',
				filter: "gender==Male",
				"components": [
					{
						"id": "usersSearchCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/usersSearchCriteria"
							}
						}
					},
					{
						"id": "minAgeIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/minAgeIndicator"
							}
						}
					},
					{
						"id": "maxAgeIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/maxAgeIndicator"
							}
						}
					},
					{
						"id": "salaryAvgIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/salaryAvgIndicator"
							}
						}
					},
					{
						"id": "usersByCountry",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByCountry"
							}
						}
					},
					{
						"id": "usersByIndustry",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByIndustry"
							}
						}
					},
					{
						"id": "usersByGender",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByGender"
							}
						}
					},
					{
						"id": "jobsAreaByCountry",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobsAreaByCountry"
							}
						}
					},
					{
						"id": "industryStatistics",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/industryStatistics"
							}
						}
					},
					{
						"id": "jobStatistics",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobStatistics"
							}
						}
					},
					{
						"id": "jobsTypeByArea",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobsTypeByArea"
							}
						}
					},
					{
						"id": "users",
						"type": "grid",
						"_links": {
							"config": {
								"href": "/api/config/components/users"
							},
							"query": {
								"href": "/api/users/query",
								"type": "application/json"
							},
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page4"
					},
					"actions": {
						"href": "/api/config/perspectives/search/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page5",
				"title": "Case Analytics",
				"tooltip": "Case Analytics Visualization",
				"lazy": true,
				"default": false,
				"builder": 'dashboard',
				"components": [
					{
						"id": "HierarchyComposite",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/HierarchyComposite"
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
						"href": "/api/config/perspectives/search/dashboards/page5"
					},
					"actions": {
						"href": "/api/config/perspectives/search/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page6",
				"title": "Process Analytics",
				"tooltip": "SLA",
				"lazy": true,
				"builder": 'dashboard',
				"components": [
					{
						"id": "caseTasksCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/caseTasksCriteria"
							}
						}
					},
					{
						"id": "CaseAvgDuration",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseAvgDuration"
							}
						}
					},
					{
						"id": "ActiveCases",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/ActiveCases"
							}
						}
					},
					{
						"id": "SLA_Warnings",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/SLA_Warnings"
							}
						}
					},
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
						"id": "TasksByRegion",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByRegion"
							}
						}
					},
					{
						"id": "CaseTypes",
						"type": "chart",
						"cluster": "casetypes",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseTypes"
							}
						}
					},
					{
						"id": "AvgCaseTypeDuration",
						"type": "chart",
						"cluster": "casetypes",
						"layout": "X8",
						"_links": {
							"config": {
								"href": "/api/config/components/AvgCaseTypeDuration"
							}
						}
					},
					{
						"id": "TasksByStartDate",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByStartDate"
							}
						}
					},
					{
						"id": "TaskNamesByStartDate",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TaskNamesByStartDate"
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
						"href": "/api/config/perspectives/search/dashboards/page6"
					},
					"actions": {
						"href": "/api/config/perspectives/search/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page7",
				"title": "Process Analytics",
				"tooltip": "Tasks By Region",
				"lazy": true,
				"builder": 'dashboard',
				"components": [
					{
						"id": "caseTasksCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/caseTasksCriteria"
							}
						}
					},
					{
						"id": "CaseAvgDuration",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseAvgDuration"
							}
						}
					},
					{
						"id": "ActiveCases",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/ActiveCases"
							}
						}
					},
					{
						"id": "TasksByRegion",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByRegion"
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
						"id": "AssignedToName",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/AssignedToName"
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
						"href": "/api/config/perspectives/search/dashboards/page7"
					},
					"actions": {
						"href": "/api/config/perspectives/search/dashboards/dashboard/actions"
					},
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
			{
				"id": "page10",
				"title": "External Content",
				"tooltip": "IFrame View",
				"containers": [
					{
						"ui": "tabs",
						"components": [
							{
								"id": "IframeView1",
								"type": "iframe",
								"href": "/api/data/view/1",
							},
							{
								"id": "IframeView2",
								"type": "iframe",
								"href": "/api/data/view/2",
							},
						],
					}],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page10"
					}
				}
			},
			{
				"id": "page11",
				"title": "RTF Text Editor",
				"tooltip": "RTF Text Editor Sandbox",
				"components": [
					{
						"id": "RtfEditor",
						"type": "rtfTextEditor",
						"label": '[{"children": [{"text": "RTF Text Editor with "},{"type": "link","url": "https://en.wikipedia.org/wiki/Hypertext","children": [{"text": "hyperlinks"}]},{"text": " support."}]}, ' +
							'{"children": [{"text": "It features two ways to add links. You can either add a link via the toolbar Link icon, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected."}]}, ' +
							'{"children": [{"text":"Use toolbar "},{"text":"Copy sources","bold":true},{"text":" icon "},{"text":" to copy results of editing in JSON format into the clipboard."}]}' +
							']'
					}
				],

				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/page11"
					}
				}
			},

			{
				"id": "ticks_page",
				"title": "Chart ticks customization",
				"tooltip": "SLA",
				"lazy": true,
				"builder": 'dashboard',
				"components": [

					{
						"id": "TasksByRegion",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByRegion"
							}
						}
					},
					{
						"id": "TaskNamesByStartDate",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TaskNamesByStartDate"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/search/dashboards/ticks_page"
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
