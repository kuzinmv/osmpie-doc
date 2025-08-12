# junction:radius - Tag for Defining Maximum Conflict Zone at Intersections

The `junction:radius` tag serves as a critical tool for specifying the maximum possible conflict zone area at road intersections, enabling precise control over intersection geometry and traffic flow modeling.

## Syntax

```
node.tags {
   junction:radius: number[1..N]
}

way.tags {
   junction:radius:lanes: number[1..N]|number[1..N]|...
   junction:radius:lanes(:forward|backward)(:start|end) number[1..N]|number[1..N]|...
}
```

## Object Application

### Node-level Implementation

When applied to `node` objects, this tag requires the node to represent an intersection. The tag defines the radius of a circle that can encompass the conflict zone for all intersecting paths at that junction.

The `junction:radius` value represents the circular radius corresponding to the conflict zone where vehicles interact and potentially interfere with each other's movement patterns.

### Way-level Implementation

When applying this tag to `way` objects, the `:lanes` suffix becomes mandatory. These values override the intersection's conflict zone radius individually for each lane when specified, providing granular control over lane-specific intersection behavior.

## Practical Examples and Visual Analysis

The following examples demonstrate proper implementation, with the blue circle in each diagram representing the visualization of the tag's effect.

### Example 1: Incorrect Radius Definition

**Configuration:** `junction:radius = 4`

**Issue:** The conflict zone cannot be properly described by a circle of the specified radius due to road width and lane configuration. This value is incorrectly defined.

![Example 1 - Incorrect radius](./img/junction:radius-img1.png)

### Example 2: Optimal Radius Configuration  

**Configuration:** `junction:radius = 8`

**Result:** Correctly implemented. Stop lines and other intersection entry points align precisely with the circular boundary, creating an accurate representation of the conflict zone.

![Example 2 - Optimal radius](./img/junction:radius-img2.png)

### Example 3: Oversized Radius with External Influences

**Configuration:** `junction:radius = 12`

**Analysis:** When other objects (nodes or ways) exist within the specified radius, they begin to modify and influence the conflict zone geometry. The radius describes only the maximum possible area of the conflict zone, not necessarily its actual shape.

![Example 3 - Oversized radius](./img/junction:radius-img3.png)

### Example 4: Multiple Junction Interactions

**Configuration:** `junction:radius = 8` for each node

**Observation:** Proximity between nodes creates mutual influence on conflict zones. The intersection geometry becomes more complex, with U-turns between parallel paths exhibiting different curvature radii and geometric characteristics.

![Example 4 - Multiple junctions](./img/junction:radius-img4.png)

### Example 5: Mixed Intersection Types with Traffic Signals

This example demonstrates the interaction between different junction types and their respective radius values.

**Upper-left pedestrian crossing node tags:**
```
junction:radius = 3
junction:shape = rectangle
highway = traffic_signals
```

**Lower-right pedestrian crossing node tags:**
```
junction:radius = 6
highway = traffic_signals
```

**Key Principle:** The radius value determines the width of the conflict zone. Adjacent nodes limit the influence of the `junction:radius` tag for their associated ways. When radii of two neighboring `node[junction = yes]` objects intersect, the intermediate edge shrinks to minimal length and positions proportionally based on the ratio of these neighboring radii.

![Example 5 - Mixed intersections](./img/junction:radius-img5.png)

## Advanced Lane-Specific Configuration

### Directional Suffixes

The tag supports `forward` and `backward` suffixes to specify way direction:
- For one-way paths, `forward` serves as the default value
- `start` and `end` suffixes indicate movement direction relative to intersections:
  - `start`: Applied to the node where movement begins along the way
  - `end`: Applied to the destination node (default behavior, consistent with turn restriction tagging)

### Configuration Example

```
way.tags {
    oneway = yes
    lanes = 3
    junction:radius:lanes = ||2
    junction:radius:lanes:forward:end = ||2
}
```

These two tags are equivalent, specifying that lane 3 should override the default `junction:radius` value at the way's endpoint, while other lanes use default values from the node.

**Important Consideration:** When a way contains multiple nodes classified as `junction=*` (see [junction documentation](./node.tags.junction.md)), these settings apply to each lane at every intersection along that way.

### Geometric Calculation Method

For basic `junction:radius`, the center point uses the node's coordinates. However, with `:lanes` suffixes, radius measurements originate from the intersection point between the lane and conflicting way, or from a perpendicular line drawn from the node to the way when no conflict exists.

## Example 6: Staggered Stop Line Implementation

This example demonstrates creating a stepped stop line configuration at traffic signals, showcasing the tag's precision capabilities.

![Example 6 - Staggered stop line](./img/junction:radius-img7.png)

**Way1 Configuration (highlighted in blue):**
```
way.id = way1
way.tags = {
    oneway = yes
    lanes = 4
    junction:radius:lanes = 4.5|3|1.5|0.1
}
```

**Node1 Configuration:**
```
node.id = node1
node.tags = {
    junction:shape = staggered
    junction:radius = 1
} 
```

The deliberately small radius combined with the staggered shape type (see [junction:shape documentation](./node.tags.junction:shape.md)) creates the desired geometric effect.

### Debug Visualization

In debug mode, connection segment lengths in this micro-intersection not only form a stepped pattern but also vary in length. This variation results from lane-specific overrides applied to way2:

![Example 6 - Debug view](./img/junction:radius-img8.png)

**Way2 Configuration:**
```
way.id = way2 
way.tags = {
    oneway = yes
    lanes = 4
    junction:radius:lanes:forward:start = 4.5|3|1.5|0.1
}
```

This configuration demonstrates the tag's capability to create sophisticated intersection geometries that accurately reflect real-world traffic engineering requirements while maintaining computational efficiency in routing and simulation applications.
