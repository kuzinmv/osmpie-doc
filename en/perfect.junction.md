# Creating Perfect Intersections in OpenStreetMap: A Comprehensive Tagging Guide
> Essential tags and professional recommendations

To construct an ideal intersection using OSMPIE, the following essential components are required:

[Lane Configuration](#1-lane-configuration) *
[Turn Movements and Connectivity](#2-turn-movements-and-connectivity) *
[Lane Width and Centerline Positioning](#3-lane-width-and-centerline-positioning) *
[Intersection Types and New junction:* Tags](#4-intersections-and-crossroads) *
[Parking, Stops, and Cycling Infrastructure](#5-parking-stops-cycling-infrastructure-and-trams) *
[Auxiliary Renderer Control Tags](#6-auxiliary-renderer-control-tags) *
[Road Markings (In Development)](#7-road-markings-coming-soon)

---

## 1. Lane Configuration

Accurate road representation requires precise specification of lane quantities and directional flow. Essential tags include:

```osm
way
    oneway = yes|no
    lanes = 5
    lanes:forward = 3
    lanes:backward = 2
    lanes:both_ways = 1
```

**Critical Requirements:**
- When tags are omitted, the renderer defaults to 2 lanes with bidirectional traffic flow
- Additional tags for specialized lanes (public transit applications):
  - [`lanes:psv`](https://wiki.openstreetmap.org/wiki/Key:lanes:psv)
  - [`psv:lanes`](https://wiki.openstreetmap.org/wiki/Key:psv:lanes)

---

## 2. Turn Movements and Connectivity

Essential tags for turn movement control and lane connections:

The [turn](https://wiki.openstreetmap.org/wiki/Key:turn) key represents one of the fundamental components for properly configured intersections and interchanges, utilized comprehensively throughout the system. Thorough familiarity with the associated documentation is essential.

```osm
way
    turn:lanes
    connect:lanes
relation 
    type = restriction
    type = connectivity
```

**Implementation Specifications:**
By default, when turn movements are not specified, the system employs a fan-pattern scheme `left;through|...|through;right` based on lane quantity.

**Relation Types for Movement Control:**
- **Restriction Relations**: `type = restriction` relations are supported by the renderer, currently without qualifying suffixes such as `restriction:hov`
- **Connectivity Relations**: `type = connectivity` relations are not currently implemented. As an alternative for complex intersection connections, we propose utilizing the `connect:lanes` key instead of relations. [Detailed connect:lanes documentation](./way.tags.connect:lanes.md)

---

## 3. Lane Width and Centerline Positioning

Most tags specified in the street width documentation apply to the OSMPIE renderer:
[Street Width Reference](https://wiki.openstreetmap.org/wiki/Key:width#Width_of_streets)
Exception: The direct `width` tag, which specifies complete street width.

```osm
way
    width:lanes
    placement
    placement:forward
    placement:backward
    placement = dist:[number]
    placement = transition
```

**Professional Recommendations:**

The `placement` tag represents a de facto standard in OSM and is fully implemented in the renderer. This tag proves invaluable for lane mapping as it effectively addresses inaccuracies introduced by centerlines on roads with variable lane counts or at diverging junctions.

**Recommended Study**: Comprehensive examination of this critical tag's applications, particularly the `placement=transition` value. [Placement Documentation](https://wiki.openstreetmap.org/wiki/Proposal:Placement)

### OSMPIE Placement Extensions

For precise mapping applications, standard placement values possess limitations as they reference lane edges or centers, significantly restricting practical implementation.

OSMPIE proposes two minor extensions to centerline offset methodology:

**Distance-Based Placement:**
```
placement = dist:2.5  // Centerline offset 2.5 meters right for one-way paths
placement = dist:-2.5 // Centerline offset 2.5 meters left
```

**Directional Split Placement:**
```
placement:forward = dist:5
placement:backward = dist:-5
```

This enables cross-lane positioning with direction reversals (left-hand to right-hand traffic patterns), applicable to short intersection segments where vehicles pass starboard-to-starboard during left turns.

**Additional Applications:**
- Minor spatial separation around mid-carriageway obstacles
- Continued single-way object mapping for complex scenarios
- Enhanced geometric accuracy for specialized intersection configurations

[OSMPIE Placement Usage Examples](./examples/placement.md)

---

## 4. Intersections and Crossroads

OSM intersection descriptions, like many mapping elements, exhibit considerable fragmentation and inconsistency. [See Key:junction](https://wiki.openstreetmap.org/wiki/Key:junction). Enhanced intersection preparation requires systematic organization of existing tags and strategic additions.

```osm
node
    junction = controlled|uncontrolled|inout|joint 
    junction:shape = rectangle|oblique|staggered
    junction:radius = 9
    junction:cluster:radius = 15
    crossing:corner = yes|no
    
way 
    junction:radius:lanes:{direction}:{start|end} = ||1|9
    connect:lanes = 0|1;2|3||
```

### Intersection Classification System

Current systems utilize `junction=yes` and `junction=uncontrolled` tags. Renderer development necessitated comprehensive intersection classification with expanded categorization:

**Enhanced Classification:**
* `junction = controlled` - Traffic signal-controlled intersection
* `junction = uncontrolled` - Uncontrolled intersection/crossroad (current standard usage)
* `junction = inout` - Intersection involving `way[highway=service]` - driveway/parking access
* `junction = joint` - Intersection involving exactly 2 ways, shared node represents terminus of one and origin of another

These values are computationally derivable from participating object keys and tags, typically requiring no explicit specification. However, explicit tagging proves beneficial in specific scenarios, such as signalized intersections involving parking and driveway exits `way[highway=service]`.

**Automated Classification Logic:**
* `junction = controlled` - Node belongs to 2+ ways with traffic signal tags: `(highway == traffic_signals || crossing == traffic_signals) == true`
* `junction = uncontrolled` - Node belongs to 2+ ways without signal tags: `(highway == traffic_signals || crossing == traffic_signals) == false`
* `junction = inout` - Node belongs to 2+ ways with at least one `way[highway=service]`
* `junction = joint` - Intersection involves exactly 2 roadway ways (excluding `footway`, `tram`, `cycleway`)

### Advanced Junction Tagging System

For nodes explicitly or implicitly marked as junctions, four new keys enable precise intersection and crossroad rendering, plus two additional feature mapping keys:

1. **`junction:shape`** - Intersection geometry (rectangle, parallelogram, or staggered). When unspecified, OSMPIE attempts automatic determination based on way intersection angles for 2 or 4-way intersections. Configurations with 5+ ways require explicit manual tagging.

2. **`junction:radius`** - Conflict zone radius defining the circular area where vehicles interact.

3. **`junction:radius:lanes`** - Conflict zone override for specific way objects, enabling stop line positioning adjustments per lane.

4. **`junction:cluster:radius`** - Clustering radius for grouping intersection points into unified "traditional" intersections (intersection clusters in our terminology).

5. **`crossing:corner = yes|no`** - Pedestrian crossing tag similar to `crossing:island` [crossing:island reference](https://wiki.openstreetmap.org/wiki/Key:crossing:island), indicating safety island presence. This tag identifies crossings positioned very close to carriageway edges, essentially connecting sidewalk corners, enabling more accurate intersection geometry generation.

6. **`connect:lanes`** - Enhanced lane addressing for precise nodal connectivity specification as an alternative to relations. [relation[type=connectivity]](https://wiki.openstreetmap.org/wiki/Relation:connectivity)

### Detailed Documentation References:
- [junction:shape](./node.tags.junction:shape.md)
- [junction:radius](./node.tags.junction:radius.md)
- [junction:cluster:radius](./node.tags.junction:cluster:radius.md)
- [connect:lanes](./way.tags.connect:lanes.md)

---

## 5. Parking, Stops, Cycling Infrastructure, and Trams

OSMPIE's initial version incorporates partial support for parking and cycling infrastructure tags, specifically addressing their impact on carriageway width and road polygons. Location, width, and parking orientation (determining parking lane width) are considered.

### Parking and Cycling Infrastructure

```osm
way
    parking:{side} = lane|street_side
    parking:{side}:orientation = number
    parking:{side}:width = number
    
way   
    cycleway:{side} = lane
    cycleway:{side}:width = number    
```
[Parking Implementation Examples](./examples/parking.md)

### Transit Stops

Special attention focuses on bus stops. The `bus_bay` key is proposed for both ways and `highway = bus_stop` nodes, enabling proper bay rendering and associated markings. Stops tagged with `tram=yes` utilize perpendicular-to-lanes marking patterns.

```osm
node
   highway = bus_stop + bus_bay = yes
   highway = bus_stop + tram = yes 
```

[OSMPIE bus_bay=yes Examples](./examples/bus_bay.md)

### Implementation Considerations

Vehicle path intersections with tram tracks and cycling infrastructure are ignored unless specifically tagged (e.g., `highway = traffic_signals`) as they don't require connectivity resolution. Including these intersections generates numerous small edges and distorts automotive lane geometric representation.

---

## 6. Auxiliary Renderer Control Tags

OSMPIE includes supplementary tags for renderer control, primarily utilized in exceptional circumstances:

```osm
    osmpie:{key} = any
    osmpie:sparse = yes|no|number
    osmpie:fill = yes|no|number
    osmpie:usefull = yes|no
```

### Tag Specifications:

* **`osmpie:{key} = any`** - Overrides any existing tag value. Example: [bridge intersection scenarios](https://www.openstreetmap.org/way/243947044#map=19/59.935411/30.326399). OSMPIE separates road polygon rendering by level for tunnels, interchanges, and over/under intersections. When intersections are bridge components or bridges exist within intersections, polygon construction becomes impossible. Direct level tag modification contradicts OSM rules. Override solution: `osmpie:level = 0 + level = 2`

* **`osmpie:sparse = yes|no|number`** - OSMPIE implements proximity-based node removal for closely-spaced, untagged way points. This tag explicitly controls sparse processing for specific ways with defined limitations.

* **`osmpie:fill = yes|no|number`** - OSMPIE includes way point densification for lengthy segments lacking intermediate nodes. This tag explicitly controls fill processing for specific ways with defined parameters.

* **`osmpie:usefull = yes|no`** - `way[highway = service]` objects are typically filtered from final rendering. This tag designates specific ways for retention despite filtering rules.

[Detailed fill.sparse Examples](./examples/fill.sparse.md)

---

## 7. Road Markings (Coming Soon)

OSMPIE's initial public release features non-customizable road markings generated comprehensively, potentially not reflecting local application conventions such as parking spaces or pedestrian crossings. Marking rendering indicates object existence, lane presence, and dimensional characteristics. Priority development focuses on rapid resolution of these limitations.

### Standard Road Marking Tags

Typical road marking indicators include `divider`, `turn:lanes=*`, `overtaking=*`, `change=*`, or `crossing:markings=*`. Road marking presence is specified using `lane_markings=*`. These tags combined with supplementary information such as `placement=*` or `width:lanes=*` provide sufficient road marking renderer control.

**Reference Documentation:**
- [Key:divider](https://wiki.openstreetmap.org/wiki/Key:divider)
- [Key:change](https://wiki.openstreetmap.org/wiki/Key:change)
- [Key:overtaking](https://wiki.openstreetmap.org/wiki/Key:overtaking)
- [Key:crossing:markings](https://wiki.openstreetmap.org/wiki/Key:crossing:markings)
- [Key:lane_markings](https://wiki.openstreetmap.org/wiki/Key:lane_markings)
- [Tag:road_marking=solid_stop_line](https://wiki.openstreetmap.org/wiki/Tag:road_marking=solid_stop_line)

### Future Development Considerations

Special attention should be directed toward [Proposal:Road_marking_revision](https://wiki.openstreetmap.org/wiki/Proposal:Road_marking_revision), which we support 99%, with the exception that turn arrows and lane text should be designated as way objects. Potential point object applications with angle specification in attributes or way angle computation for node-containing ways, incorporating `direction = {forward|backward}` as currently implemented for [traffic signals](https://wiki.openstreetmap.org/wiki/Key:traffic_signals:direction).
