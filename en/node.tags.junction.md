# Intersections and Junctions. Classification and Description.

## Introduction

This article defines formal criteria for classifying nodal elements of a transport network related to intersections and junctions, and establishes unified standards for their attribution. The purpose of the described tags is to improve the quality of mapping and optimize data processing.

## Current State of the Tagging System

The existing system for describing intersections in OpenStreetMap is characterized by fragmentation and a lack of a unified methodological approach. The basic tags `junction=yes` and `junction=uncontrolled`, defined in [Key:junction](https://wiki.openstreetmap.org/wiki/Key:junction), provide only elementary functionality and do not allow for detailed classification of complex transport nodes. As a result, an intersection may look quite organic on the map but be semantically inaccurate.

## Key Characteristics of Junctions

- **Participants** - A junction involves 2 or more `ways` that share a common node.
- **Size** - In reality, a junction is an area where conflict is possible between vehicles (and other road users) moving on different roads. When mapping, we describe a junction using a geometric figure that correlates with the actual linear dimensions of the location. The size of this figure (usually a linear dimension defining its area) is an integral attribute of the junction. In most cases, the renderer automatically determines the junction size, but in some cases, it must be explicitly specified to reflect all significant features of the junction.
- **Connectivity** - On each way participating in the junction, entry and exit points appear. Their connections to each other must be specified (attributed). See [connect:lanes](./way.tags.connect:lanes.md), [relation[type=connectivity]](https://wiki.openstreetmap.org/wiki/Relation:connectivity).
- **Conflict Point** - An optional but common characteristic that defines the fact of conflict between some connections and others, as well as the location of this conflict.

There is another characteristic of junctions that relates not to a single junction but to multiple junctions. A complex object, which is a finite set of junctions united by traffic logic, is called an "intersection" (or "complex junction").

---
### Size
For modeling the junction area, OSMPIE uses a circle. Its radius ([junction:radius](./node.tags.junction:radius.md)) is a parameter defining the zone of interaction (potential conflict) for road users.

### Clustering (Grouping Junctions into an Intersection)
The clustering process is governed by the parameter [junction:cluster:radius](./node.tags.junction:cluster:radius.md), which defines the maximum distance between junctions for them to be merged into a single intersection.

---

## Extended Junction Classification System, Syntax of the `junction` Tag

```osm
node
    junction = yes|no|controlled|uncontrolled|inout|joint
```

## 0. `junction` (General)

- ***Applied to:*** The intersection of motorized paths and pedestrian paths.
- ***Not applied to:*** The intersection of motorized paths and tram tracks, motorized paths and cycleways.

## 1. `junction = uncontrolled`, `junction = yes`
A junction without active control systems; right-of-way is determined by priority rules.
Intersections with such junctions are typically genuinely uncontrolled intersections, with corresponding signs and markings on each approach ("main road", "give way", "stop", etc.).

![image info](../ru/img/junction-img2.png)

***Renderer Specifics:***
1.  A separate "intersection" object is created, inside which there is no road marking.
2.  Markings on the intersecting roads on the approaches to the junction define the priority. On the main road, the marking is continuous; on the minor road, a "stop line" and/or "give way" object is drawn.

## 2. `junction = no`
A junction without active control systems; right-of-way is determined by priority rules and signs. Junctions of this type are often not considered intersections according to traffic regulations and are usually access points to a main artery. It is incorrect to tag the minor way as `service` if the adjoining road is a regular way (`secondary`, `tertiary`, or `residential`), and not an exit from a parking lot or technical zone.

![image info](../ru/img/junction-img1.png)

***Renderer Specifics:***
A special separate intersection object is not created; instead, the linear marking of the main road continues. On minor roads, the approaches are separated by additional dashed markings.

## 3. `junction = inout`
A junction involving service roads providing access to adjacent territories, or [highway=service](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dservice).
Very similar to the previous junction type but выделен в отдельный класс ( выделен в отдельный класс - выделен в отдельный класс ) due to its focus on `way[highway=service]`.

![image info](../ru/img/junction-img6.png)

***Renderer Specifics:***
A special separate intersection object is not created; instead, the linear marking of the main road continues. On minor roads, the approaches are separated by additional dashed markings. Medians, parking lanes, and bus lanes may be interrupted by dashed markings at such junctions.

This junction type is separated because when such intersection points are untagged, service ways might be filtered out during rendering and not displayed. However, information about the intersection with a service road is required for marking parking and other details that are important on the main road, even if the service road itself is not displayed. To ensure the map reflects this important information, the intersection must be explicitly marked with this tag.

## 4. `junction = controlled`
The presence of traffic light control. A junction where traffic is regulated by active systems.

![image info](../ru/img/junction-img5.png)

***Renderer Specifics:***
A separate intersection object is created, inside which there is no linear marking, but the approaches have markings specific to this type of intersection. A stop line is marked on each road. Beyond it, each lane is defined by three types of lines (solid, long-dash intermittent (3/1), short-dash intermittent (1/3)) with lane maneuver signs applied.

## 5. `junction = joint`
A connection of two paths at a single point, representing a transition between road segments with a change in the number of lanes.
If the sum of lanes in the connecting paths equals the number of lanes in the next road segment, such a connection does not require marking.
When the number of traffic lanes differs between adjacent segments, lane-changing maneuvers arise, characterized by:
- Spatial extent ([cluster:radius](./node.tags.junction:cluster:radius.md))
- Topological connectivity ([connect:lanes](./way.tags.connect:lanes.md))
- Specific traffic safety parameters

![image info](../ru/img/junction-img3.png)

**Semantic Justification**:
Points of this kind are also classified as `junction` because they possess 3 out of the 4 junction characteristics (conflicts may be absent in `joint`).
Accounting for these parameters, especially spatial extent, allows for the correct construction of road polygons.

***Renderer Specifics:***
The normal linear road marking continues; when the number of lanes changes (widening or narrowing), specific intermittent lines are applied.

## Conclusion

Explicit classification significantly simplifies object filtering and search:

```sql
SELECT * FROM nodes WHERE tags->'junction' = 'controlled';
```
... instead of complex recursive queries analyzing related objects.

The presented junction classification system provides a more structured approach to describing transport nodes and creates a foundation for developing more effective navigation systems, traffic flow analysis tools, and road transport infrastructure planning means.
The proposed system is fully compatible with existing OpenStreetMap tags and can be implemented without disrupting existing applications.

## Recommended Articles

- [OSMPIE Tags Glossary](./osmpie.tags.glossary.md)
- [junction:shape](./node.tags.junction:shape.md)
- [junction:radius](./node.tags.junction:radius.md)
- [junction:cluster:radius](./node.tags.junction:cluster:radius.md)
- [How to understand what a conflict zone is, why is radius needed?](./junction:radius.vs.width.md)
