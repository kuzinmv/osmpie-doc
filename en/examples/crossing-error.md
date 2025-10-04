## Pedestrian Crossing Rendering Errors

If a pedestrian crossing did not display during rendering, check the following points:

1. The start and end points of the crossing must lie within the cluster polygon. If this is not the case, move the specified points inside the polygon or increase its size (`junction:cluster:radius`) for the corresponding nodes.

2. If the crossing way is split by a point, this can interfere with pedestrian route construction and crossing rendering. Try to represent one crossing across one roadway using a single way.

3. In accordance with this same rule, you should not represent two or more crossings across different roads of an intersection using a single way. Unfortunately, intersections are often encountered where a pedestrian crossing is represented by a single circular way across all roadways. The renderer cannot automatically detect and correct such constructions. This results in an error where pedestrian crossings are not displayed. The same error is caused by a shared point between two ways of adjacent pedestrian crossings.

Thus, for all pedestrian crossings at an intersection to display correctly, it is necessary to build each crossing across each roadway using a separate way, verify that there are no points inside this way, that adjacent ways do not have shared points, and that the entry and exit points of each crossing are located within the cluster polygon.

|A|B|  
| :------ | :---------------- |  
|![image info](../ru/examples/img/crossing.error-img1.png)|![image info](../ru/examples/img/crossing.error-img2.png)|
|1|2|

|A|B|  
| :------ | :---------------- |  
|![image info](../ru/examples/img/crossing.error-img3.png)|![image info](../ru/examples/img/crossing.error-img4.png)|
|1|2|

### Recommended Articles
[junction:cluster:radius](./node.tags.junction:cluster:radius.md)  
[crossing:corner](./node.tags.crossing:corner.md)
