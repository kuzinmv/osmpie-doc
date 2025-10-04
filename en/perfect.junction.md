# How to 'Bake' the Perfect Junction in OpenStreetMap?
> key tags and recommendations

To create the perfect [junction](./node.tags.junction.md) in OSMPIE, we will need the following ingredients:


- [Number of Lanes](#1-number-of-lanes)
- [Turns and Connectivity](#2-turns-and-connectivity)
- [Lane Width and Position](#3-lane-width-and-position-from-centerline)
- [Intersection Types and New junction:* Tags](#4-intersections-and-junctions)
- [Parking, Stops, Bicycle Lanes](#5-parking-stops-bike-lanes-and-trams)
- [Auxiliary Tags](#6-auxiliary-tags-for-render-control)
- [Road Markings (in development)](#7-road-markings-soon)

## 1. Number of Lanes

For correct road display, it is necessary to properly specify the number of lanes and their direction. Basic tags:

```osm
way
    oneway:yes|no
    lanes:5
    lanes:forward:3
    lanes:backward:2
    lanes:both_ways:1
```

**Important:**  
- If tags are not specified, the renderer by default uses two lanes and bidirectional traffic.  
- Additional tags for special lanes (e.g., for public transport):  
  - [`lanes:psv`](https://wiki.openstreetmap.org/wiki/Key:lanes:psv)  
  - [`psv:lanes`](https://wiki.openstreetmap.org/wiki/Key:psv:lanes)  

---

## 2. Turns and Connectivity


Let's consider the main tags for managing turns and lane connections.

The [turn](https://wiki.openstreetmap.org/wiki/Key:turn) key is one of the most widely used ingredients 
of a well-prepared junction (or interchange), so we strongly recommend familiarizing yourself with the article.


```osm
way
    turn:lanes
    connect:lanes
relation 
    type:restriction
    type:connectivity
```

**Features:**  
By default, if turns are not specified, a fan pattern `left;through|...|through;right` is used depending on the number of lanes.


There are also two relations that define the possibility/impossibility of maneuvers. 
- The `restriction` type relation is supported by the renderer, though currently without clarifying suffixes like restriction:hov.

- The `connectivity` relation is currently not implemented. 
As an alternative that allows for convenient specification of complex connections at a junction, 
we suggest using the `connect:lanes` key instead of the relation, which can be read about in the additional article [connect:lanes](./way.tags.connect:lanes.md).  
 
---

## 3. Lane Width and Position from Centerline


The `width` tag sets the full [street width](https://wiki.openstreetmap.org/wiki/Key:width#Width_of_streets).
The other tags described in the article are applied in OSMPIE to set the width of other road objects.


```osm
way
    width:lanes
    placement
    placement:forward
    placement:backward
    placement:dist:[number]
    placement:transition
```

**Recommendations:**  


The `placement` tag used in OSM is perhaps the only means that allows correcting errors 
created by centerlines on roads with changing numbers of lanes and at forks. This tag is indispensable for lane mapping.

We **recommend** carefully familiarizing yourself with the provisions and applications of the extremely important [placement](https://wiki.openstreetmap.org/wiki/Proposal:Placement) tag, 
especially the `placement:transition` value.  

Note that this tag addresses the edges or center of a lane, which significantly limits its application for precise mapping.

In OSMPIE we propose two small extensions to set the centerline offset.

- . `dist:[number]`, for example
```
placement:dist:2.5  // axis is shifted right by 2.5 meters in the direction of travel for one-way paths
placement:dist:-2.5 // the same, but to the left.
```

- . by introducing forward and backward suffixes and considering them separately from each other, we get a centerline split

```
placement:forward:dist:-5
placement:backward:dist:-5
```


This allows shifting traffic lanes crosswise, changing the direction of travel from left-hand to right-hand traffic, which is important 
for short ways to reflect left turns at junctions where cars diverge with their right sides. 
It's also possible to reflect safety islands and roadway separations around small 
obstacles located in the middle of the roadway. And much more. At the same time, we preserve topology by continuing to map a single way object. 


[Examples of using placement=* in OSMPIE](./examples/placement.md)

---

## 4. Intersections and Junctions


The description of intersections in OSM is currently chaotic and patchwork. This approach is described in the article
[key:junction](https://wiki.openstreetmap.org/wiki/Key:junction). To prepare junctions
more perfectly, we need to systematize existing tags and ... add a bit more chaos!


```osm
node
    junction:controlled|uncontrolled|inout|joint 
    junction:shape:rectangle|oblique|staggered
    junction:radius:9
    junction:cluster:radius:15
    crossing:corner:yes|no
    
way 
    junction:radius:lanes:{direction}:{start|end}:||1|9
    connect:lanes:0|1;2|3||
```


Currently in OSM the tags `junction:yes`, `junction:uncontrolled` are used.
We have expanded this list for the purpose of classifying different intersections.

**Intersection Classification:**  
* `junction:controlled` - controlled intersection with traffic lights
* `junction:uncontrolled` - uncontrolled intersection/junction as it is currently used
* `junction:inout` - the intersection involves `way[highway=service]` - entrance/exit from yards
* `junction:joint` - the intersection involves exactly 2 `way`, the common point is the end of one and the beginning of another

In most cases, the renderer automatically calculates these tags based on other keys and tags of the objects participating in connections.
In such cases, these tags do not need to be specified or changed. In rare cases, for example, when a controlled intersection involves exits from parking lots and yards
`way[highway:service]`, the listed tags should be set explicitly, 

* `junction:controlled` -  node belongs to 2 or more ways, and it has traffic light tags
`(highway == traffic_signals || crossing == traffic_signals) == true`
* `junction:uncontrolled` - node belongs to 2 or more ways and there are no traffic light tags
`(highway == traffic_signals || crossing == traffic_signals) == false`   
* `junction:inout` node belongs to 2 or more ways and at least one of them is `way[highway=service]`
* `junction:joint` - the intersection involves exactly 2 ways marked as a road (not `footway,tram,cycleway`)


**New tags for precise and complete junction mapping:**  


For each point marked as junction (manually by mapper or automatically by renderer),
four new keys can be applied that we propose for more accurate rendering of intersections and junctions, 
as well as two new keys for mapping other features. 

1. `junction:shape` - defines the intersection shape (rectangle, parallelogram, or staggered); if not explicitly set, osmpie 
tries to automatically determine it based on the intersection angle of ways at this point, but the renderer can calculate the shape only if 2 or 4 ways intersect.
In cases of 5 or more way intersections, tags must be set explicitly and manually.
3. `junction:radius` - radius of the circle corresponding to the conflict zone in which vehicles participate at this junction.
4. `junction:radius:lanes` - override of the conflict zone specified at the point for the selected way object. 
For example, stop line offsets for each lane of a way object. 
5. `junction:cluster:radius` - minimum radius of a circle uniting way intersection points into one intersection cluster, which corresponds to a "real junction" in the common understanding.
6. `crossing:corner:yes|no` - tag for pedestrian crossing points. Formatted similarly to the `crossing:island` tag, as described in the article
   [crossing:island](https://wiki.openstreetmap.org/wiki/Key:crossing:island), which 
indicates the presence of a safety island. The `crossing:corner` tag marks the fact that the pedestrian crossing is located 
very close to the roadway on the right or left. That is, it is actually drawn from the corner of one sidewalk 
to the corner of the sidewalk on the opposite side of the way. Accounting for such a pedestrian crossing allows building topologically correct intersection shapes.
7. `connect:lanes` - a convenient way to address lanes for precise connectivity specification at a node. Used
as an alternative to the [relation[type=connectivity]](https://wiki.openstreetmap.org/wiki/Relation:connectivity) relation
 


Familiarize yourself with the articles that describe these keys and their application in more detail

- [junction:shape](./node.tags.junction:shape.md)
- [junction:radius](./node.tags.junction:radius.md)
- [junction:cluster:radius](./node.tags.junction:cluster:radius.md)
- [connect:lanes](./way.tags.connect:lanes.md)

---

## 5. Parking, Stops, Bike Lanes and Trams

In the first version of OSMPIE, partial support for parking and bike lane tags is implemented.
Only those parameters that affect the roadway width and road polygons are taken into account, i.e., location and width.
For parking, orientation is also considered, as it determines the parking lane width.


**Parking and bike lanes:**  
```osm
way
    parking:{side} = lane|street_side
    parking:{side}:orientation = number
    parking:{side}:width = number
    
way   
    cycleway:{side} = lane
    cycleway:{side}:width = number    
```
[Examples of using cycling and parking in OSMPIE](./examples/parking.md)

**Stops:**

Special attention is paid to bus stops. It is proposed to use the `bus_bay` key not only for
way, but also for the stop node `highway = bus_stop`, to indicate that the stop is located 
in a bay. Thus, the task arises to render this bay and the markings in it.

For stops with the `tram=yes` tag, a different type of marking is applied - perpendicular to the traffic lanes

  
```osm
node
   highway = bus_stop + bus_bay = yes
   highway = bus_stop + tram = yes 
```

[Examples of using bus_bay=yes in OSMPIE](./examples/bus_bay.md)

**Features:**  

It's worth mentioning separately that intersections of vehicle paths with tram tracks and bike lanes are ignored if they are not marked with appropriate tags,
for example `highway = traffic_signals`. The absence of tags means that connectivity resolution for these intersections is not required. Accounting for these intersections without defining
connectivity and relations generates many small edges, which distorts the geometric picture of lanes on the roadway.  


---

## 6. Auxiliary Tags for Render Control


In OSMPIE there is a set of additional tags with which the renderer can be controlled. 
Most of them are used extremely rarely. Let's consider these exceptional cases:


```osm
    osmpie:{key} = any
    osmpie:sparse = yes|no|number
    osmpie:fill = yes|no|number
    osmpie:usefull = yes|no
```


* `osmpie:{key} = any` - overrides the values of any tag if it exists. For example [junction on a bridge or bridge inside a junction](https://www.openstreetmap.org/way/243947044#map=19/59.935411/30.326399). 
osmpie separates the rendering of polygons at different road levels for cases of tunnels and interchanges with junctions at other levels.
In rare cases, a junction may be part of a bridge, or a bridge may be located inside a junction. In such constructions OSM does not allow building a junction polygon,
and changing the level tag for the bridge contradicts OSM rules.

In OSMPIE you can override `osmpie:level = 0 + level = 2` 

* `osmpie:sparse = yes|no|number`  - In osmpie there is a procedure for removing unnecessary points on ways that are located close to each other and have no tags.
This tag explicitly indicates whether the removal procedure should be performed for a specific way and, if so, with what constraints.

* `osmpie:fill = yes|no|number` - In osmpie there is a procedure for filling ways with points if the way contains long sections without points. 
This tag explicitly indicates whether the filling procedure should be performed for a specific way and, if so, with what constraints.

* `osmpie:usefull = yes|no` - Ways of type `way[highway = service]` are not used for final rendering and are filtered out. But sometimes some ways of this type are useful. 
This tag indicates that a specific way should not be deleted.


[Examples of using these tags in OSMPIE](./examples/fill.sparse.md)

---

## 7. Road Markings


In the first public version of osmpie, markings are not controllable and are generated automatically. Therefore, they may not reflect some local application features,
such as parking spaces or pedestrian crossings. Marking rendering is performed only to indicate the existence of markings 
for specific objects (for example, lanes) and their dimensions. One of the priority tasks is to open the possibility of editing markings.

Typical tags indicating road markings are `divider`, `turn:lanes=*`, `overtaking=*`, `change=*` or `crossing:markings=*.` 
The presence of markings on the road can be indicated using the `lane_markings=*` tag 
Using the aforementioned tags in combination with additional information such as `placement=*` or `width:lanes=*`,

is sufficient for controlling road marking rendering.

- [Key:divider](https://wiki.openstreetmap.org/wiki/Key:divider)
- [Key:change](https://wiki.openstreetmap.org/wiki/Key:change)
- [Key:overtaking](https://wiki.openstreetmap.org/wiki/Key:overtaking)
- [Key:crossing:markings](https://wiki.openstreetmap.org/wiki/Key:crossing:markings)
- [Key:lane_markings](https://wiki.openstreetmap.org/wiki/Key:lane_markings)
- [Tag:road_marking=solid_stop_line](https://wiki.openstreetmap.org/wiki/Tag:road_marking=solid_stop_line)


It's worth taking a closer look at the proposal [Proposal:Road_marking_revision](https://wiki.openstreetmap.org/wiki/Proposal:Road_marking_revision).
This principle of marking editing is supported by OSMPIE except that turn signs and text depicted on the lane must be designated as way objects.
This approach can also be applied to point objects. In such cases, it is necessary to set the angle in the attributes. This can be done manually or calculated from
the angle of the way to which the node belongs, with the addition of `direction = {forward|backward}`, 
as is currently applied for [traffic lights](https://wiki.openstreetmap.org/wiki/Key:traffic_signals:direction).
