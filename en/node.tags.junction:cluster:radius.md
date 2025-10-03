# `junction:cluster:radius` — A Tag for the Functional Area of a Junction

The functional area of a junction is a geometric figure; objects located inside it are subject to the influence of this junction or influence it themselves.
Within this zone, other objects (parking, crossings, stop lines, etc.) may be displayed or interpreted differently than in the absence of this junction.
To some extent, this concept correlates with the concept of the functional area of an intersection, but for a simple junction.

### Syntax
```
node.tags {
   junction:cluster:radius: number[1..N]
}
```

### Usage

This tag is used for objects of the `node` type that represent a junction.
The tag specifies the radius of a circle into which the functional area for this junction can be inscribed.

### Advantages of This Tag

The main motivation for introducing this tag was to enable the grouping of nodes of adjacent junctions into the overarching concept of an **"Intersection"**.

This goal can be achieved by various approaches:

1.  Relation: `type:intersection, members[node1,...,nodeN, way1,..., wayM]`
2.  A node attribute that serves as the grouping key (cluster name or identifier) `junction:cluster = name or id`
3.  A radius which, when circles are overlapped (union), produces a common polygon for a certain set of nodes `junction:cluster:radius = 5`

All these methods solve the same task: **controlled clustering of junction nodes** into a more complex data structure.

The pros and cons of the first two approaches are obvious: the need to use a relation, maintain referential integrity, and generate tags.

Let's consider the third method.

*   Very geometric, reflects the areal/linear characteristics of the junction
*   Does not require maintaining referential integrity (as in 1) or uniqueness control (as in 2)
*   Allows finding dependencies or correlations with other node properties (number of lanes)
*   Simply a numerical value in meters
*   Formally, no new object of the "intersection" type is created, but it can always be obtained by a simple buffer + union operation
*   Corresponds to Occam's razor principle - we do not multiply entities unnecessarily

Formally, the concept of an **Intersection** can be expressed as follows:
An intersection is a set of nodes (`node junction=yes|...`), connected by edges (`way`), where traffic control means (road markings, signs, other traffic control elements) do **NOT** provide for the stopping of vehicles.

In simple terms, an intersection can be considered a set of points and arcs where there are no specially organized stop lines inside.
It can also be said that an intersection is an areal figure (polygon) inside which there exists an indivisible zone of conflict between vehicles and pedestrians.

Consider an example of a complex intersection with 4 separate conflict zones.
In nodes where `junction:cluster:radius` is not explicitly specified, it defaults to 12 meters.
On the left half are the nodes and ways; on the right half is the intersection model, where the radius of each node is represented as a hexagon.
All hexagons are grouped based on the union criterion.

![image info](ru/img/junction:cluster:radius-img1.png)

As a result, with this combination of `junction:cluster:radius` values, we get 4 "intersections", each with its own conflict zone. This means that in reality, each resulting "intersection" *should* have its own separate stop line for conflict resolution.

![image info](ru/img/junction:cluster:radius-img4.png)

The following illustration confirms that several junctions can be combined into a single object. Each junction is marked with a blue circle (see the tag [junction:radius](./node.tags.junction:radius.md)), with each cluster containing 3-4 junctions of ways (vehicle and pedestrian, with different radii).

![image info](ru/img/junction:cluster:radius-img5.png)

Let's increase the `junction:cluster:radius` values from twelve to thirty-two meters.
All junctions merged into one intersection in the shape of a horseshoe. With this radius combination, this intersection resembles a roundabout (semi-roundabout), inside which road users are not allowed to stop.
However, this radius configuration is artificially incorrect because the pedestrian crossings still remain.

![image info](ru/img/junction:cluster:radius-img3.png)

---

## Using the Node Attribute – Pinpoint Control of Clustering

In addition to combining junctions into a single intersection, this tag is used to separate junctions that are located close enough but are not part of the same intersection. These are rare configurations, but since they occur, they need to be mapped accurately.

Let's compare explicitly specifying such a configuration using the `cluster:radius` tag with alternative approaches, for example, using a hypothetical relation.

Let's look at a fairly large section of a typical map. Yellow dots mark nodes where the presence of traffic light regulation is indicated in one way or another: `highway: traffic_signals | crossing: traffic_signals`

![image info](ru/img/junction:cluster:radius-img7.png)

Looking from a "bird's-eye view" at how junctions are typically grouped (using traffic lights as an example), it's clear that distinct clusters form, and we could achieve this automatically in one way or another.

But if we introduce a relation explicitly, then **every** intersection, despite its typicality, would have to be processed manually, maintaining referential integrity and other aspects.

## Example of Using the Tag in Combination with Other `junction:*` Tags

![image info](ru/img/junction:cluster:radius-img8.png)

At first glance, this appears to be a trivial T-shaped intersection, but this impression is deceptive.

In reality, it is not a single intersection but a combination of three closely located junctions:
1.  A controlled pedestrian crossing - marked in blue,
2.  An uncontrolled pedestrian crossing - marked in grey,
3.  An uncontrolled vehicle junction - marked in white.

Vehicles moving north on the main road have the right to turn left onto the adjacent road or make a U-turn. At the same time, only a right turn is allowed from the minor road. Therefore, this junction cannot be considered an uncontrolled intersection. Such an assumption would lead to incorrect road markings and faulty navigation services.
Furthermore, the junction is located close to the controlled pedestrian crossing. If not separated, the entire area would be considered controlled, which would again lead to inaccurate map markings, and the intersection data would become unusable for navigation and traffic management automation purposes.

Using OSMPIE tags for the points in the white area elegantly solves this task:

~~~
   junction = no  - explicitly marks this as not being a full intersection (marking will correspond to regular linear road markings)
   junction:cluster:radius = 1  - so it does not merge with the other two clusters (blue and grey)
   junction:radius = 7~8   - meters, because it is still a junction and has geometric characteristics
~~~

Note that for the node of the junction in the grey area, a small clustering radius must also be explicitly set to prevent it from merging with the blue node, since in reality these are two independent pedestrian crossings, and of different types (controlled and uncontrolled).

## Conclusions
- Using the `cluster:radius` tag for point-controlled clustering of junction nodes into intersections significantly reduces the labor required for correct intersection mapping. We apply the tag explicitly and only in exceptional cases.
- Combinations with other tags (e.g., `junction:radius`, `junction = yes|no`, etc.) allow for accurate mapping of any combination of objects found on real roads.
- This creates or preserves semantics, as the attributes during mapping accurately describe the functions of a road object or indicate its qualities. Thus, we follow the main goal of mapping: to reliably reflect all necessary information about reality in the model.

## Recommended Articles

- [junction:radius](./node.tags.junction:radius.md)
- Gallery of interesting works - [featured](./examples/examples.md)
