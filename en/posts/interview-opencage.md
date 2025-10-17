### 1. Who are you and what do you do? What got you into OpenStreetMap?

My name is Mikhail Kuzin, I am 41 years old. I am a Christian, married, and raising two sons. I have been engaged in software development for over 20 years, as well as scientific research and data science in the field of road traffic. I hold a Master's Degree in Computer Science and a Ph.D. in Computer Sciences (Mathematical Modeling).

I lead a team of software developers in the field of Intelligent Transport Systems (ITS) and am involved in developing a small but "revolutionary" startup in the field of connected vehicle data analysis.

It's no secret that many scientific works are based on OSM data. Like many other developers of road traffic modeling software or autonomous vehicles, we turned to road data ([1](https://sumo.dlr.de/docs/Tutorials/Import_from_OpenStreetMap.html), [2](https://github.com/CommonRoad/commonroad-scenario-designer/discussions/20), [3](https://commonroad-scenario-designer.readthedocs.io/en/latest/details/osm/), [4](https://docs.aimsun.com/next/22.0.2/UsersManual/OSMImporter.html) and many others).

We had already developed several of our own road network models that solved specific tasks. And, like everyone else, we started writing a converter (loader) to import roads from the OSM format into our models.

Building a good and accurate network is a laborious task, and you always wonder: why draw again what already exists in many places? We quickly realized that it would not be possible to do this seamlessly and completely because intersections are truly complex in their structure, and the variability in their representation is high due to the human factor - everyone contributes data as they see it.

### 2. What is OSMPIE? What prompted you to create it? Why do we need another OSM editor?

An editor is a tool that reflects a person's needs in solving their tasks. If the tasks are specific, why not have a more convenient editor with fewer distracting objects? If you look at the entire multitude of OSM objects, obvious clusters are visible: buildings, roads, terrain (rivers, mountains, seas, forests, and individual trees), and POIs. Each of them has its own specifics for data entry.

![img-info](../../ru/posts/img2.png)

Especially with the development of the [idea of micro-mapping](https://strassenraumkarte.osm-berlin.org/?map=micromap#18/52.47379/13.44164). We have become accustomed to the capabilities of modern mapping systems ([Yandex](https://yandex.ru/maps/66/omsk/?ll=73.380364%2C54.972583&z=18), [2GIS](https://2gis.ru/omsk/geo/282213711094197/73.382814%2C54.970556?floor=0&m=73.383523%2C54.970326%2F18.52&immersive=on), [Gaode](https://www.google.com/search?q=gaode%20navigation%20app%20roads%20screen&hl=ru&udm=2&tbs=rimg:CR2ONwVl2iipYZAlZjQg4Hn2sgIAwAIA2AIA4AIA&sa=X&ved=0CB4QuIIBahcKEwjIqp2d3KqQAxUAAAAAHQAAAAAQBw&biw=1775&bih=925&dpr=2#vhid=UxvCU0q04wI5_M&vssid=mosaic)). Mapping every tree or bench is "low-hanging fruit," easy to pick. With roads, it's not like that!

Road micro-mapping, i.e., the transition from the [granularity level](https://www.sciencedirect.com/science/article/pii/S1569843225004509?clckid=ef46d8dd) of `way` to `lane`, causes a super-exponential explosion of connections (`relations`) between new objects or requires an immense number of actions.

A proposal for lane markup was recently approved, but even in small areas, maintaining such a number of objects is very labor-intensive. However, in reality, road markings are not random - most lines are drawn for a reason (although that happens too...), they have meaning (semantics) and a certain algorithm. OSMPIE is an attempt to recreate these algorithms.

There are two approaches here: "scanner" and "function."
-   **Scanner** - when a robot/program/AI recognizes objects from geotagged photos.
-   **Function** - we try to reconstruct an object based on the meaning of its attributes and those of its neighbors (heuristics).

OSMPIE changes many concepts:

1.  **Automation.** We thought: if our task is to seamlessly convert the OSM road network from the granularity level of `way` to `lane`, what are we missing? Why do we have to manually adjust points in the final model every time? How can we reduce this manual work, and ideally, get rid of it completely?

2.  **Data Philosophy.** Is OSM a map? A database? Let's look at it differently. OSM is not just tags and points; it is an object-semantic model, a kind of programming language with its own structure and "code," similar to HTML/CSS.

3.  **Intersection Semantics.** In OSM, the semantic area of intersections is not very well developed due to their complexity and diversity of relations. One of the main tasks was not just to add new tags, but to make their number **minimal** and, most importantly, to integrate them into the current ideology, for example, `*:lanes:*`. This took several years.

4.  **Collaboration.** A mapper is always a lone hero. I may not be a strong expert in OSM editors, but in Miro or Google Docs, I can collaborate, get feedback and comments - that's real collaborative work. Why isn't it like that in OSM? OSMPIE takes the first step towards this - you can share drafts or results of the intersection "baking" process. The cognitive complexity of intersections is very high, and as we say, two heads are better than one.

We have been using this editor for our own needs for several years and have created models of cities or their large parts for transport analytics. [This is what it looked like before](https://photos.google.com/album/AF1QipPJoOPiKseqQQ8L6ZG9jJXSN5HAqgKpWxDlqacJ).

![img-info](../../ru/posts/img1.png)

In 2025, we decided to offer it to the community, as we thought there wasn't much work left - improve the editing process, change the authorization and the place for saving changesets to the common OSM database. Ha...

We would be happy if our ideas are discussed, improved, or accepted by the community. Then we could think about further development in this direction: expanding the API, plugins for other applications, and open source. If they are rejected... well, God bless OSM.

### 3. What are the unique challenges involved in mapping intersections in OpenStreetMap?

1.  **Lack of a Unified Model.** The OSM object model lacks a coherent, unambiguous, and widespread model for intersections.

2.  **Geometric Accuracy vs. Simplification.** An intersection is not just a point where road lines cross. It is an area with its own boundaries where roads merge, split, have curves, traffic islands, and multiple lanes. How to accurately convey this form without making the map impossibly difficult to edit and use? (see `placement`, see `radius`).

3.  **Semantic Model (Logical Structure).** In OSM, it's important not only how an intersection looks but also how it functions. Which turns are allowed? Where are the crosswalks? How do traffic lights control flows? What tags and rules describe this logic so that navigation programs and mapping services can interpret it correctly? This is the biggest "unique challenge."

4.  **Topology (Road Network Connectivity).** It is crucial that roads at an intersection are correctly connected. One mistake - and the router will "think" that it's impossible to pass here. Ensuring seamless connectivity of all entrances, exits, and lanes, especially on complex interchanges, is a difficult task. When we move to micro-mapping and the granularity level of `lane`, this problem becomes one of the main ones.

    The `connect:lanes` tag was proposed to the community for practical reasons. It does not replace `relation[type=connectivity]`, just as the tag `way[highway=* + cycleway:right=lane]` does not replace `highway=cycleway`. They coexist. `connect:lanes` allows conveniently setting connectivity as an attribute rather than creating a separate object. [Example with cycleway](https://osmpie.org/app/editor?pos=13.425174&pos=52.486&zoom=20.15&bakeId=7edb9995-b958-4776-be55-5a7426c76916&tile=Carto+Light). When you try to map the roads of an entire city yourself, you will be able to make a choice.

5.  **Dynamism and Level of Detail.** An intersection is a dynamic object. New lanes appear, traffic organization changes, new signs are installed. How to maintain the relevance of such a complex model and to what level of detail is it necessary? Is it necessary to mark every arrow on the asphalt?

### 4. What steps could the OpenStreetMap community take to improve mapping of intersections specifically and roads generally?

The answer may seem banal, but the maximum effect will come from the correct placement of the `lanes:` and `turn:lanes` tags. This alone will bring significant improvements. Next, of course, `placement` is important - in cities at intersections and interchanges. Pedestrian crossings should be drawn as separate `ways` (one "zebra" - one `way`), not as one `way` around the entire intersection. And this doesn't require special editors.

Mappers in many cities create excellent roads. When I open them in OSMPIE, I just say: "Perfection! Nothing to correct, everything is in its place." Their work and experience deserve attention and respect. They do this "blindly," without AI prompts or detailed renders, using only their imagination and internal vision.

### 5. Last year OpenStreetMap celebrated 20 years. Where do you think the project will be in another 20 years?

Too long a period for accurate predictions. OSM is, first and foremost, people. If interested people are involved, then everything will be fine. I think OSM will be in perfect order. OSM as an entry point into the world of new ideas will always attract both scientists and simply those who want to tidy up their yard.

But of course, much can change, and we won't have to wait 20 years. In the near future, I expect the emergence of "vibe mapping" by analogy with "vibe coding." The emergence of specialized editors with AI on board, like Cursor. The same OSMPIE can provide training samples like "from-to" or "as is-to be". The OSM object model plus the final OSMPIE result, if vectorized, then collectively, this will open up new possibilities for structural and semantic "juggling" of OSM objects for AI, just as it now juggles words and meanings in text.

Of course, micro-mapping and object recognition from photographs with their transfer to vector form will advance. Any objects. Why even add a tree or a bench as a point? Why not just take a photo with your phone and click "OK"? Maybe this or something similar already exists, I'm just not up to date with events.