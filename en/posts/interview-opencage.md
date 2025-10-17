### 1. Who are you and what do you do? What got you into OpenStreetMap?

I'm Mikhail Kuzin, 41, married with two sons. I've spent over 20 years in software development, scientific research, and data science focused on road traffic. I hold a Master's and Ph.D. in Computer Science (Mathematical Modeling). I lead a development team building Intelligent Transport Systems and co-founded a startup analyzing connected vehicle data.

Many scientific works rely on OSM data, and like other developers of road traffic modeling software and autonomous vehicles, we turned to it for road data. We had already developed several proprietary road network models for specific tasks, so naturally we started building a converter to import roads from OSM format into our systems.

Building accurate road networks is laborious, and we wondered: why recreate what already exists in many places? We quickly realized seamless, complete conversion wasn't possible. Intersections are truly complex in their structure, and their representation varies significantly due to the human factor—everyone contributes data as they see it.

### 2. What is OSMPIE? What prompted you to create it? Why do we need another OSM editor?

**What is OSMPIE?**

OSMPIE is a specialized editor designed for detailed road network mapping. It focuses on converting OpenStreetMap road data from the `way` level to the `lane` level of granularity. The editor uses both scanning approaches (recognizing objects from geotagged photos) and functional approaches (reconstructing objects based on semantic meaning and heuristics) to automate and streamline the micro-mapping process.

**What prompted you to create it?**

Road micro-mapping creates exponential complexity—transitioning from `way` to `lane` level causes a super-exponential explosion of relations between objects. While a lane markup proposal was recently approved, maintaining such a large number of objects remains extremely labor-intensive. However, road markings aren't arbitrary; they follow patterns and have semantic meaning. We created OSMPIE to recreate these algorithmic patterns and automate what would otherwise require endless manual adjustment.

**Why do we need another OSM editor?**

Existing editors serve general purposes, but specialized tasks need specialized tools. OSMPIE introduces four key innovations: First, it automates the conversion process, eliminating repetitive manual work. Second, it treats OSM as an object-semantic model rather than just tags and points—more like a programming language with structure and logic. Third, it develops intersection semantics properly, integrating minimal new tags into OSM's existing ideology (like `*:lanes:*`). Fourth, it enables true collaboration—you can share drafts and get feedback, something missing from traditional OSM mapping. After using it internally for several years to model cities for transport analytics, we decided in 2025 to offer it to the community, hoping our ideas spark discussion and improvement.

### 3. What are the unique challenges involved in mapping intersections in OpenStreetMap?

**Lack of a Unified Model.** OSM lacks a coherent, unambiguous, and widely adopted standard for representing intersections, creating inconsistency across the database.

**Geometric Accuracy vs. Simplification.** Intersections aren't simply points where roads cross—they're areas with boundaries where roads merge, split, curve, and branch into multiple lanes around traffic islands. The challenge is conveying this complexity accurately without making the map prohibitively difficult to edit and use, especially when considering elements like `placement` and `radius`.

**Semantic Model (Logical Structure).** Beyond visual representation, OSM must capture how intersections function: which turns are allowed, where crosswalks exist, how traffic lights control flow. Developing tags and rules that accurately describe this logic so navigation programs and mapping services can interpret it correctly remains the most challenging aspect.

**Topology and Road Network Connectivity.** Roads must connect correctly at intersections—a single error can break routing. Ensuring seamless connectivity across all entrances, exits, and lanes becomes exponentially harder at complex interchanges and especially when mapping at the `lane` level of detail. The community-proposed `connect:lanes` tag addresses this by allowing convenient connectivity as an attribute rather than requiring separate relation objects, coexisting with traditional approaches like `relation[type=connectivity]`.

**Dynamism and Level of Detail.** Intersections constantly evolve as new lanes emerge, traffic organization changes, and signs are installed. The challenge is maintaining such a complex model's relevance while determining appropriate detail levels—do you map every arrow painted on asphalt?

### 4. What steps could the OpenStreetMap community take to improve mapping of intersections specifically and roads generally?

I'd say the most impactful improvement is consistent use of `lanes:` and `turn:lanes` tags. This single step alone would bring significant improvements to intersection mapping. Beyond that, properly mapping `placement` at city intersections and interchanges is crucial. Pedestrian crossings should be drawn as separate `ways`—each zebra crossing as its own `way` rather than a single `way` encircling the entire intersection. These improvements don't require specialized editors; they simply need community adoption of existing standards.

I have to appreciate the exceptional work many mappers are already doing in cities across the globe. When I open their roads in OSMPIE, they're often perfect—nothing to correct, everything precisely in place. These mappers accomplish this remarkable level of detail "blindly," without AI assistance or detailed renders, relying solely on their imagination and internal spatial vision. Their expertise and dedication deserve genuine recognition and respect from the community. Their approach demonstrates what's possible when mappers commit to quality and precision. With OSMPIE, we were simply aiming to make their work easier. 

### 5. Last year OpenStreetMap celebrated 20 years. Where do you think the project will be in another 20 years?

Twenty years is too long for accurate predictions. OSM is, fundamentally, about people. If dedicated contributors remain engaged, everything will be fine. I'm confident OSM will thrive. As an entry point for new ideas, it will continue attracting scientists and those who simply want to improve their local area.

Of course, much can change before then. In the near future, I expect "vibe mapping" to emerge—analogous to "vibe coding." We'll see specialized editors powered by AI, similar to Cursor. OSMPIE itself could provide training samples like "from-to" or "as-is-to-be." When the OSM object model combined with OSMPIE results are vectorized collectively, this will unlock new possibilities for structural and semantic manipulation of OSM objects for AI—much as AI now works with words and meanings in text.

Micro-mapping and object recognition from photographs will undoubtedly advance. Why limit this to trees or benches as points? Imagine simply taking a photo on your phone and clicking "OK" to add objects. Perhaps this already exists — I'm just not current with recent developments.
