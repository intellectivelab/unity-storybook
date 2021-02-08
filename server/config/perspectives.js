module.exports = [
	{
		"id": "storybook",
		"default": true,
		"dashboards": [
			{
				"id": "page1",
				"title": "Employees Search",
				"tooltip": "Showcase of using default search template",
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
						"href": "/api/config/perspectives/storybook/dashboards/page1"
					},
				}
			},
			{
				"id": "ticks_page",
				"title": "Chart ticks customization",
				"tooltip": "SLA",
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
						"href": "/api/config/perspectives/storybook/dashboards/ticks_page"
					},
					"actions": {
						"href": "/api/config/perspectives/storybook/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "custom_menu_page",
				"title": "Menu customization",
				"tooltip": "SLA",
				"components": [
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
						"href": "/api/config/perspectives/storybook/dashboards/custom_menu_page"
					},
					"actions": {
						"href": "/api/config/perspectives/storybook/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "sunburst_menu_page",
				"title": "Sunburst menu addition",
				"tooltip": "SLA",
				"components": [
					{
						"id": "CaseTypeByLocationBreakdown",
						"type": "chart",
						"layout": "X6",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseTypeByLocationBreakdown"
							}
						}
					}
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/storybook/dashboards/sunburst_menu_page"
					},
					"actions": {
						"href": "/api/config/perspectives/storybook/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "folderTreeView",
				"title": "Folders View",
				"tooltip": "Showcase of using storybook template and folders",
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
						"href": "/api/config/perspectives/storybook/dashboards/folderTreeView"
					}
				}
			},
		],
		"_links": {
			"self": {
				"href": "/api/config/perspectives/storybook"
			},
			"dashboards": {
				"href": "/api/config/perspectives/storybook/dashboards"
			}
		}
	}
];
