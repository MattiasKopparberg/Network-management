# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Landing page accessibility - dark mode
- Location: tests\accessibility.spec.ts:8:3

# Error details

```
Error: [
  {
    "id": "color-contrast",
    "impact": "serious",
    "tags": [
      "cat.color",
      "wcag2aa",
      "wcag143",
      "TTv5",
      "TT13.c",
      "EN-301-549",
      "EN-9.1.4.3",
      "ACT",
      "RGAAv4",
      "RGAA-3.2.1"
    ],
    "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
    "help": "Elements must meet minimum color contrast ratio thresholds",
    "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
    "nodes": [
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#90a1b9",
              "bgColor": "#ffffff",
              "contrastRatio": 2.63,
              "fontSize": "9.0pt (12px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
                "target": [
                  "aside"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Overview</h2>",
        "target": [
          "nav > div:nth-child(1) > .uppercase.tracking-wider"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
      },
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#90a1b9",
              "bgColor": "#ffffff",
              "contrastRatio": 2.63,
              "fontSize": "9.0pt (12px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
                "target": [
                  "aside"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Network</h2>",
        "target": [
          "div:nth-child(2) > .uppercase.tracking-wider"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
      },
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#90a1b9",
              "bgColor": "#ffffff",
              "contrastRatio": 2.63,
              "fontSize": "9.0pt (12px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
                "target": [
                  "aside"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Management</h2>",
        "target": [
          "div:nth-child(3) > .uppercase.tracking-wider"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
      },
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#90a1b9",
              "bgColor": "#ffffff",
              "contrastRatio": 2.63,
              "fontSize": "10.5pt (14px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<header class=\"sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6\">",
                "target": [
                  ".sticky"
                ]
              },
              {
                "html": "<div class=\"min-h-screen bg-slate-50\">",
                "target": [
                  ".min-h-screen.bg-slate-50"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<span class=\"hidden text-sm text-slate-400 sm:inline\">Network Manager</span>",
        "target": [
          ".hidden.sm\\:inline.text-slate-400"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1"
      },
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#90a1b9",
              "bgColor": "#ffffff",
              "contrastRatio": 2.63,
              "fontSize": "9.0pt (12px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<div class=\"relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5\">",
                "target": [
                  ".shadow-xl"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<span class=\"text-xs text-slate-400\">Example data</span>",
        "target": [
          ".mb-4 > .text-xs.text-slate-400"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1"
      }
    ]
  }
]

expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 204

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.63,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#90a1b9",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
+                 "target": Array [
+                   "aside",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Overview</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "nav > div:nth-child(1) > .uppercase.tracking-wider",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.63,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#90a1b9",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
+                 "target": Array [
+                   "aside",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Network</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div:nth-child(2) > .uppercase.tracking-wider",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.63,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#90a1b9",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<aside class=\"fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full\">",
+                 "target": Array [
+                   "aside",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<h2 class=\"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400\">Management</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div:nth-child(3) > .uppercase.tracking-wider",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.63,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#90a1b9",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<header class=\"sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6\">",
+                 "target": Array [
+                   ".sticky",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"min-h-screen bg-slate-50\">",
+                 "target": Array [
+                   ".min-h-screen.bg-slate-50",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"hidden text-sm text-slate-400 sm:inline\">Network Manager</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".hidden.sm\\:inline.text-slate-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.63,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#90a1b9",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5\">",
+                 "target": Array [
+                   ".shadow-xl",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.63 (foreground color: #90a1b9, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-xs text-slate-400\">Example data</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".mb-4 > .text-xs.text-slate-400",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - link [ref=e5] [cursor=pointer]:
        - /url: /dashboard
        - generic [ref=e12]:
          - paragraph [ref=e13]: Network Manager
          - paragraph [ref=e14]: Infrastructure
      - navigation "Main navigation" [ref=e15]:
        - generic [ref=e16]:
          - heading "Overview" [level=2] [ref=e17]
          - link "Dashboard" [ref=e19] [cursor=pointer]:
            - /url: /dashboard
        - generic [ref=e26]:
          - heading "Network" [level=2] [ref=e27]
          - generic [ref=e28]:
            - link "Devices" [ref=e29] [cursor=pointer]:
              - /url: /devices
            - link "Locations" [ref=e33] [cursor=pointer]:
              - /url: /locations
            - link "VLANs" [ref=e38] [cursor=pointer]:
              - /url: /vlan
            - link "Device VLANs" [ref=e45] [cursor=pointer]:
              - /url: /device-vlan
        - generic [ref=e51]:
          - heading "Management" [level=2] [ref=e52]
          - generic [ref=e53]:
            - link "Maintenance" [ref=e54] [cursor=pointer]:
              - /url: /maintenance
            - link "Users" [ref=e60] [cursor=pointer]:
              - /url: /users
      - generic [ref=e68]:
        - paragraph [ref=e69]: Network Management
        - paragraph [ref=e70]: Personal project
    - generic [ref=e71]:
      - banner [ref=e72]:
        - generic [ref=e74]:
          - generic [ref=e75]: Network Manager
          - heading "Network Management" [level=1] [ref=e78]
        - generic [ref=e79]:
          - generic [ref=e80]: Administration
          - generic "Administrator" [ref=e81]: A
      - main [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e85]:
            - link [ref=e86] [cursor=pointer]:
              - /url: /
              - generic [ref=e93]:
                - paragraph [ref=e94]: Network Manager
                - paragraph [ref=e95]: Infrastructure management
            - link "Log in" [ref=e96] [cursor=pointer]:
              - /url: /login
          - main [ref=e99]:
            - generic [ref=e101]:
              - generic [ref=e102]:
                - generic [ref=e103]: Network infrastructure, organized
                - heading "Your network. One central place." [level=1] [ref=e107]:
                  - text: Your network.
                  - generic [ref=e108]: One central place.
                - paragraph [ref=e109]: Manage devices, VLANs, locations, and maintenance through one clear interface. Keep your network infrastructure structured and easier to oversee.
                - generic [ref=e110]:
                  - link "Access your dashboard" [ref=e111] [cursor=pointer]:
                    - /url: /login
                  - link "Explore features" [ref=e114] [cursor=pointer]:
                    - /url: "#features"
                - paragraph [ref=e115]: A centralized interface for managing network resources.
              - generic [ref=e118]:
                - generic [ref=e120]:
                  - paragraph [ref=e121]: Network overview
                  - paragraph [ref=e122]: Infrastructure dashboard preview
                - generic [ref=e127]:
                  - generic [ref=e128]:
                    - paragraph [ref=e130]: Devices
                    - paragraph [ref=e133]: "24"
                  - generic [ref=e134]:
                    - paragraph [ref=e136]: Locations
                    - paragraph [ref=e140]: "3"
                  - generic [ref=e141]:
                    - paragraph [ref=e143]: VLANs
                    - paragraph [ref=e149]: "6"
                  - generic [ref=e150]:
                    - paragraph [ref=e152]: Maintenance
                    - paragraph [ref=e157]: "4"
                - generic [ref=e158]:
                  - generic [ref=e159]:
                    - paragraph [ref=e160]: Infrastructure overview
                    - generic [ref=e161]: Example data
                  - generic [ref=e162]:
                    - generic [ref=e164]:
                      - generic [ref=e165]: Office network
                      - generic [ref=e166]: 12 devices
                    - generic [ref=e170]:
                      - generic [ref=e171]: Server room
                      - generic [ref=e172]: 8 devices
                    - generic [ref=e176]:
                      - generic [ref=e177]: Remote location
                      - generic [ref=e178]: 4 devices
                - paragraph [ref=e182]: Illustrative preview · Not live system data
            - generic [ref=e183]:
              - generic [ref=e184]:
                - paragraph [ref=e185]: Core functionality
                - heading "Everything organized in one place" [level=2] [ref=e186]
                - paragraph [ref=e187]: A straightforward way to manage the key components of a network infrastructure.
              - generic [ref=e188]:
                - article [ref=e189]:
                  - heading "Device management" [level=3] [ref=e193]
                  - paragraph [ref=e194]: Keep track of network devices and their details from one place.
                - article [ref=e195]:
                  - heading "VLAN organization" [level=3] [ref=e202]
                  - paragraph [ref=e203]: Manage VLANs and keep network segmentation organized.
                - article [ref=e204]:
                  - heading "Location tracking" [level=3] [ref=e209]
                  - paragraph [ref=e210]: Connect infrastructure to physical locations for easier oversight.
                - article [ref=e211]:
                  - heading "Maintenance tracking" [level=3] [ref=e217]
                  - paragraph [ref=e218]: Keep maintenance activities organized and easy to review.
            - generic [ref=e220]:
              - generic [ref=e221]:
                - heading "Ready to manage your network?" [level=2] [ref=e222]
                - paragraph [ref=e223]: Sign in to access your network management dashboard and infrastructure records.
              - link "Go to login" [ref=e224] [cursor=pointer]:
                - /url: /login
          - generic [ref=e228]:
            - paragraph [ref=e229]: Network Manager
            - paragraph [ref=e230]: Network infrastructure management project
  - button "Open Next.js Dev Tools" [ref=e236] [cursor=pointer]
  - alert [ref=e240]
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from "@playwright/test";
  3  | import AxeBuilder from "@axe-core/playwright";
  4  | 
  5  | const themes = ["light", "dark"] as const;
  6  | 
  7  | for (const theme of themes) {
  8  |   test(`Landing page accessibility - ${theme} mode`, async ({ page }) => {
  9  |     await page.emulateMedia({ colorScheme: theme });
  10 | 
  11 |     await page.goto("/");
  12 | 
  13 |     const accessibilityResults = await new AxeBuilder({ page })
  14 |       .withTags([
  15 |         "wcag2a",
  16 |         "wcag2aa",
  17 |         "wcag21a",
  18 |         "wcag21aa",
  19 |         "wcag22aa",
  20 |       ])
  21 |       .analyze();
  22 | 
  23 |     expect(
  24 |       accessibilityResults.violations,
  25 |       JSON.stringify(accessibilityResults.violations, null, 2)
> 26 |     ).toEqual([]);
     |       ^ Error: [
  27 |   });
  28 | }
  29 | 
```