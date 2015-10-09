---
layout: project
title: "Epigraphing the 19th Century"
tags:
- Aaron Plasek
category: theory-method
type: project
published: true
snippet: 100
images:


---

#PROVOCATION

The epigraph situates the text it precedes within a larger network of texts, and in this manner has an indexical function rather similar to that of a book shelf, a card catalog, or a relational database. The attribution of a particular epigraph takes its meaning from its relation to a network of extant, imagined, or fictitious texts. Conversely, at the same time, the epigraph also serves as a framing device for a *particular* text, and, in this manner, functions as a text capable of offering an inexhaustible number of interpretations in much the same manner as one might continue to read new meanings into a poem. These two ways kinds of intertextuality--the one-text-of-many-copies and the many-texts-in-one--can be explored experimentally by taking advantage of the digital tools for generating and comparing different networks of citation. 

Nearly 3,000 19th-century US novels in the Early American Fiction and [Wright American Fiction](https://github.com/iulibdcs/tei_text) archives have been digitized into TEI-XML files. From these collections, using this python [script](https://github.com/aaronplasek/xml_scraper.git), we have collected the following information: (1) novel author, (2) novel title, (3) novel publication date, (4) novel publication location, (5) epigraph text, (6) epigraph attribution, (7) author birth and death years, and (8) file creation information in a three CSV files. More than 7,000 epigraphs from 19th-century US novels have been found. These files will soon be released here and made freely available for download via a git repository.

#TALKS & PUBLICATIONS

[1] Aaron Plasek and Rob Koehler. "Mediating Genres of Prestige, Credit, and Authority: The Epigraph and the Citation." Conference paper. Digital Crucible: Arts, Humanities, & Computation conference. Leslie Center for the Humanities & Neukom Institute for Computational Science. Dartmouth College, Hanover, NH. 7 October 2014.

[2] Aaron Plasek. “Fail Better: On Algorithmic ‘Transparency’ as Critical Procedure”. Media Res # 1: DH Lightning Talks. CUNY Graduate School, New York, NY. 8 May 2015.


#OPPORTUNITIES FOR COLLABORATION

##Finding untagged epigraphs in TEI-XML Files

<sub>
The process of digitizing epigraphs transforms the layout of the page into code, and this conversion necessarily alters the legibility of the epigraph. What makes the epigraphs possible to extract from the digitized collections is that each epigraph has been tagged in the XML by a human transcriber. However, there are certain digitized novels from the collection (such as James Fenimore Cooper's _Wyandotte_) that have been found to be mistagged as quotes instead of epigraphs [1,2]. To account for this important source of error, the ratios of epigraph-to-quote tags have calculated so as to identify TEI files that may have untagged epigraphs. Based on spot checks, it is estimated that about 10% of the epigraphs in the collections are currently untagged. As a first approximation, novels that have at least one epigraph tagged almost always have all epigraphs correctly tagged. Rather than relying on one person to examine hundreds of files, the CSV files have been released under a creative commons license that requires all subsequent improvements be shared. We happily accept pull requests!
</sub>

##Name disambiguation

<sub>
One of the challenges in using the existing epigraph attributions to produce citation networks is that there is little standardization of how names were spelled in 19th-century texts. There are, for example, at least 8 different spellings of Shakespeare. To make matters worse, epigraph attributions formats are similarly unpredictable. Shakespeare's "Hamlet," for instance, might receive the following epigraph attributions: (1) Hamlet, (2) Shakespeare, (3) Shakespeare's Hamlet, (4) Hamlet, Shakespeare, (5) William Shakespeare, (6) William Shakespeare's Hamlet, and so on. Merely separating the titles of the works (when present) from the author names (when present) is itself a difficult computational problem. Such ambiguities must be resolved if one wishes to produce a definitive graphical model of epigraph attributions. One solution is to crowd-source this work, as must be done with epigraph mistagging. However, another potential solution is to perform this disambiguation algorithmically. Such a project might make a very interesting undergraduate project for a computer scientist or statistician. 
</sub>