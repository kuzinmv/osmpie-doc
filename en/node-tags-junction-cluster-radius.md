# junction:cluster:radius - Tag for Defining Maximum Influence Radius of Intersections on Surrounding Objects

The `junction:cluster:radius` tag establishes the maximum possible radius of influence or relationship that an intersection exerts on surrounding infrastructure objects, enabling sophisticated intersection grouping and functional zone management.

## Syntax

```
node.tags {
   junction:cluster:radius: number[1..N]
}
```

## Object Application

When applied to `node` objects, this tag requires the node to represent an intersection. The tag specifies the radius of a circle that encompasses the functional zone for the given intersection. Within this zone, other objects (parking areas, crossings, stop lines, etc.) may be displayed or interpreted differently. This concept correlates to the functional zone of an intersection, though in this case, it applies to the simplest intersection scenarios.

## Primary Motivation: Intersection Clustering

The principal motivation for introducing this tag was to enable the grouping of adjacent intersection nodes into a comprehensive concept of an **"Intersection Complex"**. Several approaches exist for achieving this grouping:

### Approach 1: Relation-Based Grouping
```
Relation: type:intersection, members[node1,...,nodeN, way1,..., wayM]
```

### Approach 2: Attribute-Based Clustering
```
junction:cluster = name or id
```
Node attribute serving as a clustering key (name-identifier of the cluster)

### Approach 3: Radius-Based Geometric Clustering
```
junction:cluster:radius = 5
```
Radius values that, when overlapped (union) as circles, generate a common polygon for a set of nodes

## Comparative Analysis of Approaches

The advantages and disadvantages of the first two approaches are evident: relations introduce referential integrity concerns and tag generation complexity. All three methods solve the same fundamental problem: controlled clustering of intersection nodes into more complex data structures.

### Advantages of the Geometric Approach (Method 3)

- **Geometric precision**: Reflects area and linear characteristics of intersections
- **Referential independence**: No referential integrity maintenance required (unlike Method 1) or uniqueness control (unlike Method 2)
- **Correlation potential**: Dependencies or correlations with other node properties (lane count) can be established
- **Simplicity**: Simple numerical value in meters
- **Dynamic generation**: No formal "intersection complex" object is created, but it can always be obtained through basic buffer + union operations
- **Occam's Razor compliance**: Avoids creating unnecessary new entities

## Formal Definition of Intersection Complex

An **Intersection Complex** can be formally defined as a set of nodes (`node junction=yes|...`) connected by edges (`way`), where those edges do not provide for vehicle stops through traffic organization devices (markings, signs, or other traffic control elements).

In simple terms, an intersection complex comprises points and arcs where no specially organized stop lines exist internally. Alternatively, it represents an area—a polygon—containing an indivisible conflict zone for vehicles and pedestrians.

## Practical Implementation Example

Consider a complex intersection with four separate conflict zones. Nodes where `junction:cluster:radius` is not explicitly specified default to 12 meters.

The left half shows nodes and ways, while the right half displays the intersection model where each node's radius appears as a hexagon. All hexagons are grouped based on overlap (union) criteria.

![Complex intersection example](./img/junction:cluster:radius-img1.png)

With this combination of `junction:cluster:radius` values, we obtain four distinct "Intersection Complexes," each with its own conflict zone. Consequently, separate stop lines should exist for conflict resolution at each complex.

![Four intersection complexes](./img/junction:cluster:radius-img4.png)

### Network Topology Visualization

To eliminate ambiguity about whether this represents one or multiple intersections, here's the network topology where each intersection is marked with a blue circle (see [junction:radius](./node.tags.junction:radius.md) tag). Each cluster contains 3-4 way intersections (automotive and pedestrian with different radii).

![Network topology](./img/junction:cluster:radius-img5.png)

## Modified Configuration Example

When increasing `junction:cluster:radius` values from 12 meters to 23 meters where previously specified, only one intersection complex remains, shaped like a horseshoe. With this radius combination, the intersection resembles a ring (semi-ring) where internal traffic cannot/should not stop.

This radius configuration is artificially incorrect since pedestrian crossings remain present, contradicting the ring-road interpretation.

![Single horseshoe intersection](./img/junction:cluster:radius-img3.png)

## Implementation Guidelines

### Default Behavior
- Nodes without explicit `junction:cluster:radius` values default to 12 meters
- Clustering occurs automatically when radius circles overlap
- Each resulting cluster represents a single functional intersection complex

### Geometric Processing
1. **Buffer Operation**: Create circular zones around each node using specified radius
2. **Union Operation**: Merge overlapping circles into unified polygons
3. **Cluster Formation**: Each resulting polygon represents one intersection complex

### Traffic Engineering Implications
- **Stop Line Placement**: Each cluster should have dedicated stop lines at entry points
- **Conflict Zone Management**: Internal areas should remain free of stopping requirements
- **Signal Coordination**: Clusters may require coordinated signal timing

## Best Practices

### Radius Selection Criteria
- Consider intersection geometry and approach speeds
- Account for pedestrian crossing locations
- Ensure logical grouping that reflects actual traffic patterns
- Avoid artificial clustering that contradicts physical infrastructure

### Quality Assurance
- Verify that clustered intersections function as unified traffic control zones
- Ensure pedestrian facilities are properly integrated
- Validate that resulting clusters align with actual traffic engineering practice

This tag provides a powerful tool for automated intersection analysis and traffic modeling while maintaining geometric accuracy and computational efficiency.
