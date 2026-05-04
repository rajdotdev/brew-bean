# Graph Report - /Users/durgarijal/Desktop/brew-bean  (2026-05-04)

## Corpus Check
- Corpus is ~3,133 words - fits in a single context window. You may not need a graph.

## Summary
- 34 nodes · 28 edges · 4 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.83)
- Token cost: 17,168 input · 30,840 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage Components|Homepage Components]]
- [[_COMMUNITY_AR Features|AR Features]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Layout Configuration|Layout Configuration]]

## God Nodes (most connected - your core abstractions)
1. `Home` - 8 edges
2. `MenuItem Interface` - 4 edges
3. `ARModal Component` - 3 edges
4. `MenuSection Component` - 3 edges
5. `AR Integration Design Rationale` - 3 edges
6. `MenuCard Component` - 2 edges
7. `Next.js Agent Rules` - 2 edges
8. `AR Models Documentation` - 2 edges
9. `Next.js Agent Rules Rationale` - 2 edges
10. `RootLayout` - 1 edges

## Surprising Connections (you probably didn't know these)
- `MenuItem Interface` --conceptually_related_to--> `AR Models Documentation`  [INFERRED]
  src/app/page.tsx → public/models/README.md
- `AR Models Documentation` --rationale_for--> `AR Integration Design Rationale`  [INFERRED]
  public/models/README.md → src/app/page.tsx
- `Next.js README` --rationale_for--> `Next.js Agent Rules Rationale`  [EXTRACTED]
  README.md → AGENTS.md
- `CLAUDE Configuration` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md

## Hyperedges (group relationships)
- **Page Component Tree** — page_home, page_nav, page_hero, page_marquee, page_menusection, page_storysection, page_visitsection, page_ctasection, page_footer [EXTRACTED 1.00]
- **AR Feature Set** — page_armodal, page_menuitem, ar_integration_rationale, models_readme [INFERRED 0.85]
- **Project Documentation** — readme, agents_md, claude_md, models_readme [EXTRACTED 1.00]

## Communities (10 total, 1 thin omitted)

### Community 1 - "Homepage Components"
Cohesion: 0.25
Nodes (8): CTASection Component, Footer Component, Hero Component, Home, Marquee Component, Nav Component, StorySection Component, VisitSection Component

### Community 2 - "AR Features"
Cohesion: 0.53
Nodes (6): AR Integration Design Rationale, AR Models Documentation, ARModal Component, MenuCard Component, MenuItem Interface, MenuSection Component

### Community 3 - "Project Documentation"
Cohesion: 0.5
Nodes (4): Next.js Agent Rules, CLAUDE Configuration, Next.js Agent Rules Rationale, Next.js README

## Knowledge Gaps
- **11 isolated node(s):** `RootLayout`, `Page Metadata`, `Nav Component`, `Hero Component`, `Marquee Component` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Home` connect `Homepage Components` to `AR Features`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `MenuSection Component` connect `AR Features` to `Homepage Components`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MenuItem Interface` (e.g. with `ARModal Component` and `AR Integration Design Rationale`) actually correct?**
  _`MenuItem Interface` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `ARModal Component` (e.g. with `MenuItem Interface` and `AR Integration Design Rationale`) actually correct?**
  _`ARModal Component` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `AR Integration Design Rationale` (e.g. with `MenuItem Interface` and `ARModal Component`) actually correct?**
  _`AR Integration Design Rationale` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RootLayout`, `Page Metadata`, `Nav Component` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._