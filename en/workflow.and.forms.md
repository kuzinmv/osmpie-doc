# OSMPIE Editor: Complete Workflow and Advanced Features Guide

## 1. Comprehensive Workflow and Input Forms

### Standard Editorial Workflow

The primary operational workflow for the OSMPIE editor follows a systematic approach:

1. **Data Loading Phase**: Upon initial data retrieval, information displays simultaneously in both left and right editor windows

2. **Interactive Editing Phase**: Select objects using mouse controls in the left panel, implementing modifications through:
   - Object repositioning via drag-and-drop functionality
   - Property modifications through integrated forms
   - Addition of new geometric elements
   - Systematic intersection refinement to achieve desired configuration

3. **Change Review Phase**: Access the changeset viewer window to examine implemented modifications and understand what data will be transmitted to the OSM server, including OSC file download capabilities

4. **Referential Integrity Maintenance**: If object deletion (nodes or ways) or way splitting operations were performed, the system prompts automatic repair of all relations associated with removed objects. If no deletions occurred, proceed directly to submission phase

5. **Relation Correction Phase**: Following automatic relation repair, further editing becomes restricted and the model transitions to read-only mode. Manual relation correction remains available for advanced users, with option to cancel this step and return to editing mode

6. **Collaborative Review**: Share project URLs with other contributors for collaborative discussion at any workflow stage. Only the original author retains editing privileges; other users access read-only review mode

7. **Finalization**: Following OSM submission, the project becomes read-only for all users, including the original author

---

## 2. Object Property Editor Interface

### Property Editing Activation

To modify object properties, select the target object with mouse controls and activate the property editor button located in the lower-left screen corner.

This button toggles between property viewing and editing modes.

### YAML-Based Property System

The property editor utilizes **YAML** formatting with all associated [advantages](https://en.wikipedia.org/wiki/YAML) and considerations inherent to this structured data format. The interface includes autocomplete functionality to expedite routine property correction tasks, though tag schemas remain incomplete in current implementation.

![Property Editor Interface](./img/screen4.png)

**Deactivation**: Toggle the property viewing/editing mode by clicking the same button again.

---

## 3. OSMPIE Renderer Options Configuration

### Comprehensive Rendering Parameters

| Option | Purpose/Description |
|:-------|:-------------------|
| `Lane's width ([p,s,t] + width:lanes) (m)` | Base lane width in meters for primary roads (primary, secondary, tertiary). Other values derive through coefficient calculations from this base value. All parameters can be overridden using `width:lanes: *` tags |
| `Remove edges less than ... (m)` | Delete resulting graph edges shorter than X meters. Setting to 0 proves useful during debugging procedures |
| `Default way's osmpie:fill value (veh,bus,psv) (m)` | Establish new points every X meters for vehicular roadways |
| `Default way's osmpie:fill value (tram,cycle) (m)` | Establish new points every X meters for tram and bicycle infrastructure |
| `Default node's junction:cluster:radius value (m)` | Base `junction:cluster:radius` value for all nodes unless overridden in node properties |
| `Max route radius (m)` | Distance from intersection center to micro-route beginning and termination points |
| `Max area of polygon's hole filling (sq. m)` | Maximum area of holes requiring asphalt color filling |
| `Ignore restriction relations` | Convenient option to ignore all restriction-type relations during processing |
| `Filter way[highway=service]` | Enable inclusion of service ways in rendering output. Increases processing complexity but enhances visual completeness |
| `1. Step connect points` | Debug steps 1-4: Not recommended for deactivation |
| `2. Step connect rest veh` | Vehicular connection processing step |
| `3. Step connect extra (tram,cycle,ped)` | Additional mode connectivity (tram, cycling, pedestrian) |
| `4. Step guess stoplines` | Automatic stop line detection and placement |
| `5. Step build routes` | Construction of micro-routes through intersection areas |
| `6. Step build road MultiPolygon` | Road polygon geometry generation |
| `7. Step build conflict points` | Conflict point identification at intersections |
| `8. Step build road markings` | Linear road marking generation |
| `8.1 Step build intersection markings` | Specialized intersection marking generation |

![Renderer Options Interface](./img/screen5.png)

---

## 4. Changeset Viewer: Modification Review System

### Change Tracking Interface

The changeset viewer provides a specialized window for examining current edit states. Access this interface by clicking the three-badge button displaying numerical indicators.

### Comprehensive Change Documentation

**Change Categories**: Complete listing of deleted, added, or modified elements, organized chronologically with most recent changes displayed first.

**Filtering Capabilities**: Efficient filtering by operation type, object category, or identifier for streamlined review processes.

**Differential Analysis**: Object selection in the lower window section highlights changes relative to initial state loaded from Overpass API, providing Git-like differential visualization.

![Changeset Viewer Interface](./img/screen6.png)

---

## 5. Changeset Viewer: Referential Integrity and Relation Repair

### Automatic Relation Correction System

When way or node deletion (or splitting operations) occurs, the editor offers automatic reference correction for deleted objects.

**Repair Process**: Clicking **Check & fix relation** initiates Overpass API queries to identify all relations containing references to deleted objects.

### Repair Operations

1. **Split Way Handling**: Member references to original ways are replaced with references to new way segments (maintaining route order)
2. **Deleted Object Processing**: Referencing members are removed from relations
3. **Manual Intervention Requirements**: Cases involving way deletion followed by new way creation require manual relation correction
4. **Post-Repair State**: Following relation repairs, editing becomes restricted and the editor transitions to read-only mode
5. **Editing Restoration**: Return to editing mode using the **Cancel relation fix** button

![Relation Repair Interface](./img/screen7.png)

---

## 6. Changeset Viewer: OSM Submission Process

### Final Submission Procedures

When confident that all modifications are complete and referential integrity is maintained, click **Apply to OSM** to proceed to final submission phase.

**Submission Requirements**:
- Changeset commentary input
- Source tag selection or custom source attribution
- Final review confirmation

**Congratulations**: Successfully contributing a perfected intersection to the OpenStreetMap database.

![OSM Submission Interface](./img/screen8.png)

---

## 7. Micro-Route Visualization for Intersection Validation

### Interactive Route Analysis

Right-panel objects remain selectable for property examination. Selecting cluster-type objects (hexagonal cloud formations) reveals additional windows with micro-route selection capabilities generated by the OSMPIE engine for specific intersections.

**Validation Benefits**: This visualization system enables rapid assessment of lane structure accuracy and connectivity validation for each intersection approach, providing comprehensive quality assurance for complex intersection modeling.

![Micro-Route Visualization](./img/screen11.png)

---

## 8. Read-Only Editor Mode

### Restricted Access Functionality

Read-only mode eliminates modification capabilities and activates under specific conditions:
- Other users viewing your work
- Following relation corrections
- Post-changeset submission to OSM

### Collaborative and Comparison Features

**Use Cases**:
- Sharing work with other contributors for detailed discussion
- Comparing multiple intersection variants across browser tabs
- Historical change analysis

**Interface Features**:
- Before/after display mode for OSM data structure examination in left panel
- **Use changes** toggle in right panel for rendering comparison purposes

![Read-Only Mode Interface](./img/screen9.png)

---

## Professional Workflow Integration

The OSMPIE editor represents a comprehensive solution for professional intersection modeling within the OpenStreetMap ecosystem. Through systematic implementation of these workflow procedures, cartographers can achieve unprecedented precision in road infrastructure representation while maintaining full compatibility with existing OSM editorial standards.

**Key Workflow Benefits**:
- **Systematic Quality Control**: Multi-stage validation ensures data integrity
- **Collaborative Enhancement**: Built-in sharing and review capabilities
- **Professional Documentation**: Comprehensive change tracking and differential analysis
- **Automated Maintenance**: Intelligent relation repair and referential integrity preservation
