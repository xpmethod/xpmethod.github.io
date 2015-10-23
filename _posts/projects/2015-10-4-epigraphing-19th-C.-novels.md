---
layout: project
title: "Epigraphing the 19th Century"
tags:
- Aaron Plasek
category: theory-method
type: experiment / archive
published: true
snippet: 123
images:

---

#PROVOCATION

From working with many 19th century novels, we know that the Bible and Shakespeare were frequently used as novel epigraphs, but little is known about who else was being quoted. Nor is anything known about the larger patterns of affiliation and citation assembled by these texts. How do epigraphs serve as "metadata" for different genres? And what can we infer about a particular text given the presence of a particular epigraph? Underlying these questions about the kinds of information the study of epigraph networks makes legible are questions of translation: how do the specific algorithmic affordances and limitations enacted through translation of physical books to XML pages serve to establish, stabilize, and challenge our historical and contemporary notions of credit, authority, and originality?

Frequently ignored and occasionally made up, the epigraph is a textual genre defined both by its physical placement on the page and by the absence of the textual object being signposted. An epigraph attribution situates the text it prefaces within a larger constellation of texts and authors, and in this manner has an indexical function rather similar to scanning the spines of books on a shelf, flipping through a card catalog, or examining a record in a digital relational database. While in no way accepting that the affordances offered through the iterative construction of citation networks is ever a substitution for a critical method, a comparative approach to the different kinds of citations practices made visible by different networks of attribution provide an opportunity to reconsider how shared concepts that constitute a (disciplinary) field are produced, transmitted, and inhibited through our media-centric notions of consensus.   


#WHAT WE'VE DONE

Collecting nearly 3,000 XML-encoded 19th-century US novels from the Early American Fiction archive and [Wright American Fiction](https://github.com/iulibdcs/tei_text) archive, Aaron (in [collaboration with others](https://github.com/aaronplasek/19th_C._novel_scraper/graphs/contributors)) wrote a [scraper in python](https://github.com/aaronplasek/19th_C._novel_scraper) to collect the following epigraph and bibliographic information: 
(1) novel author,
(2) novel title,
(3) novel publication date,
(4) novel publication location,
(5) epigraph text,
(6) epigraph attribution,
(7) author birth and death years, and 
(8) file provenance. 
This information is useful both for exploring epigraph-usage and for examining broader questions about the circulation and printing of novels in the 19th century, and could be quite easily adapted to digital techniques like mapping. **So far we've collected 7,689 epigraphs (as of 11 Oct 2015).**



#EXPERIMENTAL CHALLENGES / OPPORTUNITIES FOR COLLABORATION

* ##Finding untagged epigraphs in TEI-XML Files
The process of digitizing epigraphs transforms the layout of the page into code, and this conversion necessarily alters the legibility of the epigraph. What makes the epigraphs possible to extract from the digitized collections is that each epigraph has been tagged in the XML by a human transcriber. However, there are certain digitized novels from the collection (such as James Fenimore Cooper's _Wyandotte_) that have been found to be mistagged as "quotes" instead of "epigraphs" [1,2]. To account for this important source of error, the ratios of epigraph-to-quote tags have calculated so as to identify TEI files that may have untagged epigraphs. Based on spot checks, a back-of-the-envelope calculation suggests that 1% of the epigraphs in the corpus are currently untagged or incorrectly tagged.

 * ##Name disambiguation
One of the challenges in using the existing epigraph attributions to produce citation networks is that there is little standardization of how names were spelled in 19th-century texts. There are, for example, at least 8 different spellings of Shakespeare. To make matters worse, epigraph attributions formats are similarly unpredictable. Shakespeare's "Hamlet," for instance, might receive the following epigraph attributions: (1) Hamlet; (2) Shakespeare; (3) Shakespeare's Hamlet; (4) Hamlet, Shakespeare; (5) William Shakespeare; (6) William Shakespeare's Hamlet; and so forth. Merely separating the titles of the works (when present) from the author names (when present) is itself a very complex problem with no uniformly agreed upon solution. Such ambiguities must be resolved if one wishes to produce a definitive graphical model of epigraph attributions for our particular corpus. One potential solution is to crowd-source this work, as must be done with epigraph mistagging. We wish to open this corpus to the public for additional editing and future research. (Anyone interested in collaborating on this should send an email to [Aaron](http://aaronplasek.com).) However, another potential solution to this challenge is to perform this name disambiguation algorithmically. Such a project might make a very interesting undergraduate thesis project in computer science, math, or statistics. 

#SELECTED TALKS / PUBLICATIONS / PRESS

 * [1] Aaron Plasek and Rob Koehler. "Mediating Genres of Prestige, Credit, and Authority: The Epigraph and the Citation." Conference paper. Digital Crucible: Arts, Humanities, & Computation conference. Leslie Center for the Humanities & Neukom Institute for Computational Science. Dartmouth College, Hanover, NH. 7 October 2014.

 * [2] Aaron Plasek. “Fail Better: On Algorithmic ‘Transparency’ as Critical Procedure”. Media Res # 1: DH Lightning Talks. CUNY Graduate School, New York, NY. 8 May 2015. 