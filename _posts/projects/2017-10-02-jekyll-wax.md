---
layout: project
title: "Jekyll-Wax"
tags:
  - Marii Nyröp
category: knowledge-design-studio
type: tools
published: true
github: mnyrop/wax
---

__Jekyll-Wax__ is a heterogeneous collection of experiments, strategies, and
functional components for adapting [Jekyll](http://jekyllrb.com) to evolve
with the needs of digital humanities researchers and practitioners.

## Project Description

**Minimal computing** practices and priorities have proven well suited to the
needs of digital humanities projects and scholars. Specifically, its tenets of
[Minimal
Dependencies](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-dependencies),
[Minimal
Maintenance](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-maintenance)
and [Minimal
Presence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-presence)
help offset DH's frequent scarcity of resources, and its emphases on [Maximum
Access](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#maximum-access),
[Minimal
Consumption](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-use)
and [Minimal
Obsolescence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-obsolescence)
complement and strengthen the core of critical digital humanities work.

In line with the goals of minimal computing, **Jekyll-Wax** is a set of
experiments, strategies, and functional components for adapting
[Jekyll](http://jekyllrb.com) (a modular, minimal static site generator) to
evolve with the needs of DH scholarship.

Though the objectives of Jekyll-Wax are ongoing, its success will be tied to
the development of several key workflows, namely for producing **digital
exhibitions**, **publications**, and **blogs** complete with many of the
components expected of database-powered platforms like WordPress, Scalar, or
Omeka. These components will be **discrete**, **lightweight**,
**interoperable**, and **easy to use**, creating an expansive framework of
Jekyll tooling that will enable scholars to assemble what they need and drop
what they don't.

Need a site with dynamic search but can't commit to maintaining a database?
Need a simple blog but are worried about vulnerabilities in WordPress? Want to
make a [IIIF](http://iiif.io/) image exhibition or a [D3js](https://d3js.org/)
data visualization from student-generated CSVs? Need to host thousands of
static pages, but don't have a budget for server space? These are just a few
of the needs currently giving shape to Jekyll-Wax.

<sup>(For more information, see the original post on Jekyll-Wax at
[marii.info](http://marii.info/projects/wax).)</sup>

<div id="openseadragon1" style="height:600px;background-color:#999;margin:15px 0px 10px 0px;"></div>
<script src="https://cdn.jsdelivr.net/npm/openseadragon@2.3.1/build/openseadragon/openseadragon.min.js"></script>

<script type="text/javascript">
    var viewer = OpenSeadragon({
      showNavigationControl: false,
      id: "openseadragon1",
      tileSources: "https://derivativo-1.library.columbia.edu/iiif/2/ldpd:113768/info.json"
    });
</script>

Hongmun Sŏgwan, “Pigŭk sosŏl - Pulsanghan insaeng (An unhappy life),”
[Columbia University Libraries Online
Exhibitions](https://dlc.library.columbia.edu/catalog/ldpd:113768), accessed
October 2, 2017. IIIF image shown in
[OpenSeadragon](https://openseadragon.github.io/) viewer.
