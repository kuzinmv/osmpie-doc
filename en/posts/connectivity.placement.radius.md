# `connectivity`, `placement=transition`, `junction:radius`

In this article, I would like to use simple examples to show and tell about the benefits of using the new tags employed in OSMPIE. And most importantly — how they are related to the tags already used in OSM.

The proposed tags were not invented; they were rather "discovered": they were initially present in OSM within other tags, but their values were not explicit, although the functions are present, and this can be noticed even just by carefully reading the documentation.

It is often difficult to consider each tag (`relation`) separately because their final action (function, rendering) is intricately intertwined.

[Working example with simple constructions](https://osmpie.org/app/editor?pos=35.565451&pos=32.799122&zoom=19.86&bakeId=ca46777f-6c92-4a49-b193-bad5aa04f4c1&tile=Carto+Light)

Here is a working example with simple constructions, which we will refer to throughout the article. This allows you to independently study the nuances in practice.

(In the settings, it's better to turn off the highlight changes and switch to the "Connection frame" mode in the right window.)

It is also recommended to refresh your understanding of `connectivity` and especially to look at the pictures in the article about `placement` at the very bottom of the page.

- [Article about `connectivity`](https://wiki.openstreetmap.org/wiki/Relation:connectivity)
- [Proposal for `Placement`](https://wiki.openstreetmap.org/wiki/Proposal:Placement)

**So, let's begin,**

but first we need some basic concepts, axioms if you will, on which the reasoning will be built.

**Main Features of Intersections**

- **Participants** — an intersection involves **2 or more `way`s**, having a common point (`node`).
- **Size** — in reality, an intersection is an area where conflict is possible between vehicles (and other road users) moving along different paths (lanes). When mapping, we describe the intersection using a certain geometric figure that corresponds to the real linear dimensions of the place. The size of this figure (usually the linear size determining its area) is an integral attribute of the intersection.
- **Connectivity** — on each `way` participating in the intersection, entry points into the intersection and exit points from it appear. It is necessary to specify (attribute) their connections to each other. See `connect:lanes`, `relation`[`type=connectivity`].
- **Conflict Points** — an optional but frequently occurring feature that defines the fact of conflict between some connections and others, as well as the location of this conflict.

Some may doubt that an intersection with 2 `way`s, not 3, can be considered as such. This indeed seems like an edge effect that was convenient to discard. However, below we will consider an example where intersections of 2 `way`s can possess both connectivity and conflict (!). And the presence of even one example already confirms the correctness of the foundations. (For the impatient, this is Example 6.)

## Connecting 2 `way`s with a Change in the Number of Lanes

### Example 1A

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image12.png) | ![](../../ru/posts/image13.png) |

A very frequent and common case. Without the concept of `junction:radius`, we face uncertainty in interpretation: what linear size does this connection have? By allowing a numerical attribute at the point (`node`), we eliminate this misunderstanding — the uncertainty. The connection gains completeness. And most importantly — **there is no need to split the `way`** into small pieces; everything is resolved at the point (`node`).

### Example 1B

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image9.png) | ![](../../ru/posts/image14.png) |

Also an extremely common situation: 2 oneway + 1 bidirectional `way`.

Without precisely setting the radius at this point (`node`), we lack correct dimensionality. For example, in the top case — the radius is minimal, then we must follow the fork and lay paths along the centerline (which in reality is not one) and get a distorted geometric picture.

If we set the radius to be extremely large, the picture becomes more correct. But the uncertainty does not go away.

In OSM, there is a genius workaround (this is not irony or sarcasm) to solve this problem — meet **`placement = transition`**.

And although, by the authors' design and name, this tag is needed to indicate the position of the centerline, it also works as a length indicator, among other things, for this kind of intersections.

## Examples 2A and 2B

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image6.png) | ![](../../ru/posts/image7.png) |

**2A** Lane change from 2 to 4 — precise centerline position + an additional [`way`[`placement = transition`]](https://wiki.openstreetmap.org/wiki/File:Lane_Transition_2.png).

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image1.png) | ![](../../ru/posts/image3.png) |

**2B** Connection of 3 `way`s — which "on the ground" are one road, with separation between directions, in the left half.

In both these examples, the presence of such a `way` allows "closing the hole" in the dimensionality of the intersection and variable number of lanes, but raises many other questions. At the same time, it is implicitly assumed that at the ends of such a `way` the radius is extremely small, virtually non-existent.

Also, this `way` automatically falls out of `connectivity` because it has an **undefined** (again) number of lanes. That is, we cannot explicitly specify the connection between the 1st and the middle or the middle and the 3rd.

So it turns out that `way`[`placement=transition`] is kind of there, but also kind of not, its centerline is ignored, it doesn't participate in `connectivity`. And its ends are like one whole. `Node` — spaced apart in space and consisting of 2-3 other `node`s.

But with the manifestation of the radius as a measurable linear quantity, everything becomes much simpler and more holistic. And with the specification of the radius per lane, new possibilities open up.

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image4.png) | ![](../../ru/posts/image10.png) |

**3A** Explicit connection without extra entities (`connectivity`) + flexible control of the linear size `junction:radius`.

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image5.png) | ![](../../ru/posts/image8.png) |

**3B** Explicit setting (overriding the intersection radius for the right lane) allows avoiding (minimizing) drawing additional `way`s (links) where intersections are very large, and there is no physical separation, only paint.
[Example](https://osmpie.org/app/editor?bakeId=8e6d87b4-3f58-4876-9e5e-1c0d7469f0e8&pos=73.342014&pos=54.972697&zoom=19.55&tile=Esri+World).

For the central `node`, a small radius is set:

`junction:radius: 5`

But for the `way` it is overridden, and again, without losing context, embedded in the ideology of `*:lanes:*`:

`turn:lanes: left;through|through|right`

`junction:radius:lanes:forward:end: ||15` <- only for the 3rd lane

On intersections with more than 2 participants, using `way`[`placement=transition`] for the purpose of indicating linear dimensions becomes ambiguous, due to the presence of the central `node` of the intersection, not to mention the flexibility of managing the size per individual lanes.

Although regarding the application of `way`[`placement=transition`] on complex intersections, there are many interesting and subtle points that we will probably reveal in other articles.

## Implementing `connectivity` using `relation` and `connect:lanes`

Let's try, for clarity, to implement a simple but unusual/incorrect lane connection scheme at an intersection.

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image16.png) | ![](../../ru/posts/image18.png) |

**4A** Requires as many as three `relation`s, in each of which its own combination of lanes (red numbers) must be specified, manually!

1. `connectivity: 3:2|4:1`
2. `connectivity: 1:2|2:1`
3. `connectivity: 2:2|3:1`

## Implementing `connectivity` using the `way` attribute — `connect:lanes`

| `way` | lane |
| :--- | :--- |
| ![](../../ru/posts/image2.png) | ![](../../ru/posts/image11.png) |

**5A** At the same time, identical combinations are easily specified as a `way` attribute and deleted along with it if necessary. Black numbers are the indices of the output lanes in the intersection.

`connect:lanes: 0|5;2|1;4|3`

`turn:lanes: left|left;through|through;right|right`

Moreover, this is done (entered-edited) in the same context as `turn:lanes`, not in different ones, as in the example with `relation`.

As far as I know, there are no specific tags implementing `connectivity` in OSM.

And at the same time, many objects can be defined in several ways — parking, sidewalks, and cycle paths, both by tag and as a separate object.

## Going into the Weeds

Examples 4B and 5B are more complex to understand, but I want to highlight them explicitly here.

In OSM, for indicating connectivity, it is considered possible to use a `way` as a `via` in the most extreme and rare cases.

However, it is not explicitly stated that this `way` used in `via` must be explicitly set as `placement=transition`. Because if it has a clear definition of the number of lanes, and we pass connectivity through it, then it is an error. Or again, another **uncertainty**.

Example 5B shows that connectivity via `connect:lanes` will also ignore `way`[`placement=transition`] and the lane indices will be considered jointly for both `node`s.

And it is also shown that all this complexity can be avoided by using `node` and `radius` to display the linear dimensions of the intersection. The result is identical.

And finally, Example 6, which shows the implementation of an intersection consisting of 2 `way`s, having length (size), specific connectivity and conflict. This shows and proves that `junction` can be applied to a `node` where there are only two `way`s.

For the top road, the implementation uses `way`[`placement=transition`] + `relation`[`type=connectivity`], and for the bottom one — `connect:lanes` + `junction:radius`.

| `way` | lane | lane |
| :--- | :--- | :--- |
| ![](../../ru/posts/image17.png) | ![](../../ru/posts/image15.png) | ![](../../ru/posts/image19.png) |

## Conclusions

*   `Placement=transition` is a [hidden `junction`](https://wiki.openstreetmap.org/wiki/File:Lane_Placement_3.png) (segment 4), consisting simultaneously of 2 `node`s (start and end). It is a genius crutch to make it possible to indicate length (size) using 2 coordinates, but it raises questions and ambiguities about the connectivity of such `way`s.
*   `connect:lanes` and `junction:radius` are an ideal addition to the existing tagging scheme for connectivity and dimensionality of intersections (`way`[`placement=transition`] + `relation`[`type=connectivity`]), simplifying manual entry and consistency. They explicitly mark the linear dimensions of the intersection with attributes instead of implicitly. And without denying or contradicting the existing system for indicating connectivity.
*   `relation[type=connectivity]` is a good tool as long as via == `node`, beyond that there is again too much uncertainty.
*   `junction` should be considered starting from the connection of 2 `way`s.

Both schemes should be applied only if `turn:lanes` is not resolved automatically unambiguously or correctly from the point of view of truth on the ground.

I hope this article and the examples in it will help many to understand the features of various schemes for implementing connectivity at intersections, and OSMPIE will serve as a visual, practical, and not just theoretical, tutorial.