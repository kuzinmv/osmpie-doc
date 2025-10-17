### 1. Who are you and what do you do? What got you into OpenStreetMap?

I'm Mikhail Kuzin, 41, married with two sons. I've spent over 20 years in software development, scientific research, and data science focused on road traffic. I hold a Master's and Ph.D. in Computer Science (Mathematical Modeling). I lead a development team building Intelligent Transport Systems and co-founded a startup analyzing connected vehicle data.

Many scientific works rely on OSM data, and like other developers of road traffic modeling software and autonomous vehicles, we turned to it for road data. We had already developed several proprietary road network models for specific tasks, so naturally we started building a converter to import roads from OSM format into our systems.

Building accurate road networks is laborious, and we wondered: why recreate what already exists in many places? We quickly realized seamless, complete conversion wasn't possible. Intersections are truly complex in their structure, and their representation varies significantly due to the human factor—everyone contributes data as they see it.

### 2. What is OSMPIE? What prompted you to create it? Why do we need another OSM editor?

An editor is a tool that reflects a person's needs in solving their tasks. If the tasks are specific, why not have a more convenient editor with fewer distracting objects? If you look at the entire multitude of OSM objects, obvious clusters are visible: buildings, roads, terrain (rivers, mountains, seas, forests, and individual trees), and POIs. Each of them has its own specifics for data entry.

![img-info](../../ru/posts/img2.png)

Especially with the development of the [idea of micro-mapping](https://strassenraumkarte.osm-berlin.org/?map=micromap#18/52.47379/13.44164). We have become accustomed to the capabilities of modern mapping systems ([Yandex](https://yandex.ru/maps/66/omsk/?ll=73.380364%2C54.972583&z=18), [2GIS](https://2gis.ru/omsk/geo/282213711094197/73.382814%2C54.970556?floor=0&m=73.383523%2C54.970326%2F18.52&immersive=on), [Gaode](https://www.google.com/search?q=gaode%20navigation%20app%20roads%20screen&hl=ru&udm=2&tbs=rimg:CR2ONwVl2iipYZAlZjQg4Hn2sgIAwAIA2AIA4AIA&sa=X&ved=0CB4QuIIBahcKEwjIqp2d3KqQAxUAAAAAHQAAAAAQBw&biw=1775&bih=925&dpr=2#vhid=UxvCU0q04wI5_M&vssid=mosaic)). Mapping every tree or bench is "low-hanging fruit," easy to pick. With roads, it's not like that!

Road micro-mapping, i.e., the transition from the [granularity level](https://www.sciencedirect.com/science/article/pii/S1569843225004509?clckid=ef46d8dd) of `way` to `lane`, causes a super-exponential explosion of connections (`relations`) between new objects or requires an immense number of actions.

A proposal for lane markup was recently approved, but even in small areas, maintaining such a number of objects is very labor-intensive. However, in reality, road markings are not random - most lines are drawn for a reason (although that happens too...), they have meaning (semantics) and a certain algorithm. OSMPIE is an attempt to recreate these algorithms.

OSMPIE changes some concepts:

1.  **Automation.** We thought: if our task is to seamlessly convert the OSM road network from the granularity level of `way` to `lane`, what are we missing? Why do we have to manually adjust points in the final model every time? How can we reduce this manual work, and ideally, get rid of it completely?

2.  **Data Philosophy.** Is OSM a map? A database? Let's look at it differently. OSM is not just tags and points; it is an object-semantic model, a kind of programming language with its own structure and "code," similar to HTML/CSS.

3.  **Intersection Semantics.** In OSM, the semantic area of intersections is not very well developed due to their complexity and diversity of relations. One of the main tasks was not just to add new tags, but to make their number **minimal** and, most importantly, to integrate them into the current ideology, for example, `*:lanes:*`. This took several years.

4.  **Collaboration.** A mapper is always a lone hero. I may not be a strong expert in OSM editors, but in Miro or Google Docs, I can collaborate, get feedback and comments - that's real collaborative work. Why isn't it like that in OSM? OSMPIE takes the first step towards this - you can share drafts or results of the intersection "baking" process. The cognitive complexity of intersections is very high, and as we say, two heads are better than one.

We have been using this editor for our own needs for several years and have created models of cities or their large parts for transport analytics. [This is what it looked like before](https://photos.google.com/album/AF1QipPJoOPiKseqQQ8L6ZG9jJXSN5HAqgKpWxDlqacJ).

![img-info](../../ru/posts/img1.png)

In 2025, we decided to offer it to the community, as we thought there wasn't much work left - improve the editing process, change the authorization and the place for saving changesets to the common OSM database. Ha...

We would be happy if our ideas are discussed, improved, or accepted by the community. Then we could think about further development in this direction: expanding the API, plugins for other applications, and open source. If they are rejected... well, God bless OSM.

### 3. What are the unique challenges involved in mapping intersections in OpenStreetMap?

**Lack of a Unified Model.** OSM lacks a coherent, unambiguous, and widely adopted standard for representing intersections, creating inconsistency across the database.

**Geometric Accuracy vs. Simplification.** Intersections aren't simply points where roads cross—they're areas with boundaries where roads merge, split, curve, and branch into multiple lanes around traffic islands. The challenge is conveying this complexity accurately without making the map prohibitively difficult to edit and use, especially when considering elements like `placement` and `radius`.

**Semantic Model (Logical Structure).** Beyond visual representation, OSM must capture how intersections function: which turns are allowed, where crosswalks exist, how traffic lights control flow. Developing tags and rules that accurately describe this logic so navigation programs and mapping services can interpret it correctly remains the most challenging aspect.

**Topology (Road Network Connectivity).** It is crucial that roads at an intersection are correctly connected. One mistake - and the router will "think" that it's impossible to pass here. Ensuring seamless connectivity of all entrances, exits, and lanes, especially on complex interchanges, is a difficult task. When we move to micro-mapping and the granularity level of `lane`, this problem becomes one of the main ones. The `connect:lanes` tag was proposed to the community for practical reasons. It does not replace `relation[type=connectivity]`, just as the tag `way[highway=* + cycleway:right=lane]` does not replace `highway=cycleway`. They coexist. `connect:lanes` allows conveniently setting connectivity as an attribute rather than creating a separate object. Example with cycleway [1](https://osmpie.org/app/editor?pos=13.425174&pos=52.486&zoom=20.15&bakeId=7edb9995-b958-4776-be55-5a7426c76916&tile=Carto+Light) and [2](https://osmpie.org/app/editor?bakeId=8d92e8c3-18d6-467a-a003-d3eaf9d3da4f&pos=-73.967557&pos=40.580387&zoom=19.84&tile=Carto+Light). 
When you try to map the roads of an entire city yourself, you will be able to make a choice.

**Dynamism and Level of Detail.** Intersections constantly evolve as new lanes emerge, traffic organization changes, and signs are installed. The challenge is maintaining such a complex model's relevance while determining appropriate detail levels—do you map every arrow painted on asphalt?

### 4. What steps could the OpenStreetMap community take to improve mapping of intersections specifically and roads generally?

I'd say the most impactful improvement is consistent use of `lanes:` and `turn:lanes` tags. This single step alone would bring significant improvements to intersection mapping. Beyond that, properly mapping [`placement`](https://wiki.openstreetmap.org/wiki/Proposal:Placement#Simple_transition_from_three_to_two_lanes)  at city intersections and interchanges is crucial. Pedestrian crossings should be drawn as separate `ways`—each zebra crossing as its own `way` rather than a single `way` encircling the entire intersection. These improvements don't require specialized editors; they simply need community adoption of existing standards.

I have to appreciate the exceptional work many mappers are already doing in cities across the globe. When I open their roads in OSMPIE, they're often perfect—nothing to correct, everything precisely in place. These mappers accomplish this remarkable level of detail "blindly," without AI assistance or detailed renders, relying solely on their imagination and internal spatial vision. Their expertise and dedication deserve genuine recognition and respect from the community. Their approach demonstrates what's possible when mappers commit to quality and precision. With OSMPIE, we were simply aiming to make their work easier. 

### 5. Last year OpenStreetMap celebrated 20 years. Where do you think the project will be in another 20 years?

Twenty years is too long for accurate predictions. OSM is, fundamentally, about people. If dedicated contributors remain engaged, everything will be fine. I'm confident OSM will thrive. As an entry point for new ideas, it will continue attracting scientists and those who simply want to improve their local area.

Of course, much can change before then. In the near future, I expect "vibe mapping" to emerge—analogous to "vibe coding." We'll see specialized editors powered by AI, similar to Cursor. OSMPIE itself could provide training samples like "from-to" or "as-is-to-be." When the OSM object model combined with OSMPIE results are vectorized collectively, this will unlock new possibilities for structural and semantic manipulation of OSM objects for AI—much as AI now works with words and meanings in text.

Micro-mapping and object recognition from photographs will undoubtedly advance. Why limit this to trees or benches as points? Imagine simply taking a photo on your phone and clicking "OK" to add objects. Perhaps this already exists — I'm just not current with recent developments.
