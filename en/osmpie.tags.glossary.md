# Glossary of OSM Tags and Keys Used in OSMPIE

This glossary covers most of the tags used in the code for transforming OSM data into a detailed road network model.


## 1. **Basic Road Tags (Highway)**
*   **`highway`**: The main key for designating roads and paths.
    *   `motorway`, `motorway_link`
    *   `trunk`, `trunk_link`
    *   `primary`, `primary_link`
    *   `secondary`, `secondary_link`
    *   `tertiary`, `tertiary_link`
*  and other values:
    *   `residential`, `living_street`, `unclassified`, `service`, `pedestrian`, `footway`, `cycleway`, `construction`, `road` (deprecated, used when exact classification is unknown)
    *   **Documentation:** [Key:highway](https://wiki.openstreetmap.org/wiki/Key:highway)

## 2. **Rail Transport Tags (Railway)**
*   **`railway`**: Key for objects related to railway and tram traffic.
    *   `tram` (tram tracks)
    *   `tram_stop` (tram stop)
    *   `level_crossing` (tram track crossing)
    *   `tram_level_crossing` (tram track crossing)
    *   `tram_traffic_signals` (traffic light for tram)
    *   **Documentation:** [Key:railway](https://wiki.openstreetmap.org/wiki/Key:railway)

## 3. **Traffic Control and Junction Tags**
*   **`junction`**: Type of junction.
    *   `roundabout` (roundabout)
    *   `uncontrolled` (uncontrolled junction)
    *   `controlled` (controlled junction, e.g., with traffic lights)
    *   `no` (not a junction)
    *   `inout` (entrance/exit, e.g., for service roads)
    *   `joint` (joint)

**Documentation:**
- [Key:junction](https://wiki.openstreetmap.org/wiki/Key:junction)
- [OSMPIE Key:junction extended](./node.tags.junction.md)

*   **`traffic_signals`**: Traffic light.
    *   **Documentation:** [Tag:highway=traffic_signals](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dtraffic_signals)

*   **`crossing`**: Pedestrian crossing designation.
    *   `traffic_signals` (crossing with traffic lights)
    *   **Documentation:** [Key:crossing](https://wiki.openstreetmap.org/wiki/Key:crossing)

## 4. **Lane Tags (Lanes)**
*   **`oneway`**: One-way traffic designation (`yes`, `no`, `reversible`).
    *   **Documentation:** [Key:oneway](https://wiki.openstreetmap.org/wiki/Key:oneway)


*   **`lanes`**: Total number of traffic lanes.
*   **`lanes:forward`**, **`lanes:backward`**: Number of lanes for forward and backward direction.
*   **`lanes:both_ways`**: Number of lanes used for traffic in both directions (e.g., on a narrow road).
*   **`turn:lanes`**, **`turn:lanes:forward`**, **`turn:lanes:backward`**: Lane markings for turns (e.g., `left|through|right`).
*   **`change:lanes`**: Whether lane changes are allowed (`yes`, `no`, `not_right`, `not_left`).
*   **`psv:lanes`**, **`bus:lanes`**, **`bicycle:lanes`**: Dedicated lanes for public transport, buses, and cyclists.
*   **`width:lanes`**: Lane width.
*   **Documentation:** [Key:lanes](https://wiki.openstreetmap.org/wiki/Key:lanes)

## 5. **Parking Tags (Parking)**
*   **`parking:left`**, **`parking:right`**, **`parking:both`**: Parking placement.
    *   `lane` (parking lane)
    *   `shared_lane` (shared lane)
    *   `street_side` (street-side parking)
    *   `link` (connection)
*   **`parking:lane:orientation`**: Parking orientation (`parallel`, `diagonal`, `perpendicular`).
*   **`parking:lane:width`**: Parking lane width.

**Documentation:**
- [Street_parking](https://wiki.openstreetmap.org/wiki/Street_parking),
- [Key:parking:lane](https://wiki.openstreetmap.org/wiki/Key:parking:lane)

## 6. **Cycling Infrastructure Tags (Cycleway)**
*   **`cycleway`**, **`cycleway:left`**, **`cycleway:right`**, **`cycleway:both`**: Type of cycling infrastructure.
    *   `lane` (bike lane)
    *   `track` (separated bike path)
*   **`cycleway:lane:width`**: Bike lane width.
*   **`cycleway:lane:buffer`**: Buffer zone between bike lane and road.


   **Documentation:** [Key:cycleway](https://wiki.openstreetmap.org/wiki/Key:cycleway)

## 7. **Public Transport Tags (Public Transport)**
*   **`highway=bus_stop`**: Bus stop.
*   **`public_transport=platform`**, **`tram=yes`**: Tram platform.
*   **`public_transport=stop_position`**: Transport stop position.
*   **`bus_bay`**: Bus bay.

**Documentation:**
- [Key:public transport](https://wiki.openstreetmap.org/wiki/Key:public_transport)
- [bus_bay](https://wiki.openstreetmap.org/wiki/Key:bus_bay)

## 8. **Road Marking and Divider Tags**
*   **`divider`**: Type of lane divider.
    *   `no` (absent)
    *   `dashed_line` (dashed line)
    *   `solid_line` (solid line)
    *   `double_solid_line` (double solid line)
*   **`road_marking=solid_stop_line`**: Stop line.
*   **`crossing:markings`**: Pedestrian crossing markings.
    *   `zebra` (zebra crossing)
    *   `zebra:double` (double zebra)
    *   `zebra:bicolour` (bicolor zebra)
    *   `no` (absent)
*   **`lane_markings`**: Presence of road markings (`yes`/`no`).

**Documentation:**
- [Key:divider](https://wiki.openstreetmap.org/wiki/Key:divider)
- [Tag:road marking=solid stop line](https://wiki.openstreetmap.org/wiki/Tag:road_marking%3Dsolid_stop_line)
- [Key:crossing:markings](https://wiki.openstreetmap.org/wiki/Key:crossing:markings)

## 9. **Turn Restrictions (Restrictions)**
*   **`type=restriction`**: Relation defining a movement restriction (e.g., no left turn).
*   **`restriction`**: Specific restriction within the relation (e.g., `no_left_turn`).
*   **Roles in relation:** `from`, `to`, `via`.

**Documentation:** [Relation:restriction](https://wiki.openstreetmap.org/wiki/Relation:restriction)

## 10. **Other Important Tags**
*   **`width`**: Overall width of road or object.
*   **`layer`**: Vertical level for tunnels, bridges, etc.
*   **`surface`**: Surface type (code includes filtering by `ground`, `compacted`, `steps`).
*   **`placement`**, **`placement:forward`**, **`placement:backward`**: Road axis offset for complex lane configurations.
*   **`junction:radius`**: Junction rounding radius.
*   **`junction:shape`**: Junction geometry (`auto`, `rectangle`, `staggered`).
*   **`footway=crossing`**: Pedestrian crossing.

**Documentation:** Be sure to check the article about [placement](./examples/placement.md)

## 11. Glossary of Tags with `osmpie:` Prefix

These tags provide a mechanism to overcome limitations of standard OSM tags and fine-tune the road model creation process for specific requirements.
See [Auxiliary tags](./perfect.junction.md#6-auxiliary-tags-for-render-control)


### 1. **`osmpie:usefull`**
- **Purpose**: Flag for filtering service roads (service ways)
- **Values**:
  - `yes` - road is considered useful and should not be filtered
  - `no` - road should be excluded from processing
- **Usage context**: Applied to highway=service for manual indication of whether to include the road in the final model


### 2. **`osmpie:fill`**
- **Purpose**: Managing node density on long road segments
- **Values**:
  - Numeric value - minimum distance between nodes in meters
  - `yes` - use default value from settings
  - `no` - disable node addition
- **Usage context**: Automatic addition of intermediate nodes on long straight sections to improve geometry


### 3. **`osmpie:sparse`**
- **Purpose**: Managing sparsification of redundant nodes on roads
- **Values**:
  - Numeric value - minimum distance between nodes in meters
  - `yes` - aggressive sparsification (large distance)
  - `no` - disable sparsification (keep all nodes)
- **Usage context**: Removal of unnecessary nodes that don't carry semantic meaning (are not junctions, traffic lights, etc.)


### 4. **`osmpie:ignore`**
- **Purpose**: Complete exclusion of element from processing
- **Values**: `yes` - element is ignored
- **Usage context**: For elements that should not be included in the final road network model


### 5. **`osmpie:outer`**
- **Purpose**: Marking nodes located outside the processing area (bake area)
- **Values**: `yes` - node is outside the area of interest
- **Usage context**: Automatically set for nodes outside the processing polygon to exclude them from connections

---

#### Purpose of the `osmpie:` Prefix

Tags with the `osmpie:` prefix are **service tags** that:

1. **Control the transformation process** - affect how the OSMPie engine processes OSM data
2. **Are not standard OSM tags** - created specifically for this tool
3. **Allow fine-tuning** of specific map element processing
4. **Can be set manually** in OSM data or **automatically** during processing


## Recommended Articles

Concepts introduced by OSMPIE and tags for their representation

- [connect:lanes](./way.tags.connect:lanes.md)
- [junction:shape](./node.tags.junction:shape.md)
- [junction:radius](./node.tags.junction:radius.md)
- [junction:cluster:radius](./node.tags.junction:cluster:radius.md)
- [crossing:corner](./node.tags.crossing:corner.md)
