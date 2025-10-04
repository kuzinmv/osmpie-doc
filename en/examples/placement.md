# Examples of Using placement=* in OSMPIE

## Introduction

The `placement` tag has long been proposed in OSM and is used for OSMPIE rendering with several additions.
This article describes some cases and features of using this tag with standard and extended suffixes.

**We recommend** carefully reviewing the provisions and applications of this important tag (especially the `placement=transition` value) [placement](https://wiki.openstreetmap.org/wiki/Proposal:Placement).

## Motivation for Tag Extension

By default, during rendering, the centerline is displayed exactly in the center of the road. For road sections where the number of lanes changes, at forks, or road merges, this property of the centerline leads to distortions when displaying lane markings.

Using the placement tag with the transition value partially solves the problem of mapping markings in such situations, but this value always addresses the middle of the lane or one of its edges, making precise mapping impossible in complex configurations.

## Tag Extension

In osmpie, we propose two small extensions for this method of specifying centerline offset.

- Introduction of the `dist:[number]` value.

Example:
```
placement = dist:2.5  // axis shifted right by 2.5 meters in the direction of travel for one-way roads
placement = dist:-2.5 // same, but to the left.
```

- Introduction of forward and backward suffixes, accounting for offset separately to map centerline splitting.

Example:
```
placement:forward = dist:-5
placement:backward = dist:-5
```

### Examples

Let's look at several examples where using such tags helps conveniently and accurately represent reality on the map.

### Centerline Splitting (positive shift — both to the right)

```
placement:forward = dist:1.5
placement:backward = dist:1.5
```

Sometimes circumstances arise when you need to split the centerline of one bidirectional way.
In the case of a physical separator (lawn or safety island with a curb), it's necessary to create a new way. Let's consider a variant where only buffer marking is applied between oncoming traffic lanes.

Using the `lanes:both_ways:1` tag in such a configuration will lead to a false representation on the map of a reversible lane instead of a buffer zone in the middle of the road.

```
  lanes: 5
  lanes:backward: 2
  lanes:both_ways: 1  <<--- lie ?
  lanes:forward: 2  
```
For this situation, it's sufficient to represent a separate centerline for each direction of travel. Two independent centerlines, attached to different lanes, form a buffer zone marked by markings. The presence of buffer markings is a consequence of the behavior of two centerlines, not the cause of the situation. And we represent this on the map without introducing unnecessary entities. If necessary, the buffer zone can be marked separately with an additional tag (for example, for a zone 3.5 meters wide — `marking = buffer + buffer:width = 3.5`).

| Double centerline             | Common centerline + lanes:both_ways: 1 | 
| :---------------- | :------ | 
|![image info](/ru/examples/img/placement-img1.png) |![image info](/ru/examples/img/placement-img2.png) |
| By adding a positive offset of 1.5 meters separately for forward and backward directions, we precisely position our centerline for each half, creating a buffer zone between them. | For this way segment, this is not required, since the middle of the road here contains not a buffer zone, but a lane that must be specified with the `lanes:both_ways: 1` tag. | 

Real example of such a changeset [placement with 2 centerline](https://osmpie.org/app/editor?bakeId=3f865538-017f-4fd8-92db-0240111ac257&pos=37.570287&pos=55.718356&zoom=19.37&tile=Esri+World
)

### The placement = transition Value

Using the placement tag with the transition value is described in the article [Placement](https://wiki.openstreetmap.org/wiki/Proposal:Placement).
Road sections where the number of lanes changes, forks are organized, or merges occur are mapped with short ways with two nodes. Such nodes are not located in the middle of the way. For accurate mapping, it's necessary to correctly cut out such road segments, apply tags, and specify the centerline position.


|  Sausage roads            | Ramps | 
| :---------------- | :------ | 
|![image info](/ru/examples/img/placement-img3.png) |![image info](/ru/examples/img/placement-img7.png) |
| In the USA and Canada, a road construction method is very widespread where roadways are separated and then reunited again.             | Placement=transition noticeably improves geometry when rendering small "branches" at intersections, roundabouts, forks, and merges | 

Real example of such a changeset [placement=transition](https://osmpie.org/app/editor?bakeId=c285c907-bce5-4ac6-99ee-2915854006d9&pos=73.378755&pos=54.972586&zoom=19.83&tile=Esri+World)


### Switching the Side of Traffic (negative shift — both to the left)

How to optimally map the common situation when vehicles making left turns at an intersection pass each other on the right side?

![image info](/ru/examples/img/placement-img6.png)

Drawing two separate way objects contradicts reality, since there are no separated roadways here.
Therefore, we need a way to move the traffic lanes so that they "face each other" not with their left sides, but with their right sides. The placement tag is suitable for this. Similar to how lanes are spread apart with it to form a buffer zone, they can be "moved closer" to each other and, moving further, their mutual position can be changed to mirror — for this we use negative dist values.

```
placement:forward = dist:-8
placement:backward = dist:-8
```


| Adding placement tag for both sides              | Transfer result | 
| :---------------- | :------ | 
|![image info](/ru/examples/img/placement-img4.png) |![image info](/ru/examples/img/placement-img5.png) |
| "mechanics" of transferring the left part of the road to the right and vice versa           | Result: traffic trajectories are accurate and have no mutual intersection | 

Real example of such a changeset [placement with 2 left turn](https://osmpie.org/app/editor?bakeId=3f865538-017f-4fd8-92db-0240111ac257&pos=37.570287&pos=55.718356&zoom=19.37&tile=Esri+World)

## Conclusion

The placement tag with the proposed dist value and forward and backward suffixes allows convenient mapping of road sections where the number of lanes changes, road forks or merges, buffer zones, intersection sections where vehicles make left turns passing on the right side, and similar cases. The OSMPIE renderer will accurately reproduce sections mapped using this tag.

## Recommended Articles

- [How to "Bake" the Perfect Intersection](../perfect.junction.md)  
- [Tag connect:lanes](../way.tags.connect:lanes.md)  
- [Tag junction:shape](../node.tags.junction:shape.md)
