---
layout: project
title: Roget Tools
tags:
- Phillip R. Polefrone
category: literary-modeling-and-visualisation-lab
type: toolkit
snippet: 100
issue: 14
updates:
- date: 2015-09-01
  text: "Added two new methods to enable export of category-count arrays to
[Pandas](http://http://pandas.pydata.org/) and CSV."

---

Following Klingenstein, Hitchcock, and DeDeo (2014)'s work on the "Old Bailey"
records,[^1] Roget Tools is a Python class for tracking broad semantic
categories through bodies of text using the top-down hierarchical structure of
Peter Mark Roget's *Thesaurus*.[^2] This hierarchy is a comprehensive and
unbroken network encompassing all of Roget's original thesaurus categories,
and importing it into a Python-readable format achieves two goals. First, it
enables the body of research on Roget's thesaurus to incorporated into
automated text analysis, thus providing a basis for stable interpretation of
quantitative results. Second, it facilitates an integration of semantic
network analysis into the analysis of textual corpora.

[^1]: Klingenstein, Sara, Tim Hitchcock, and Simon DeDeo. “The Civilizing
Process in London’s Old Bailey.” *Proceedings of the National Academy of
Sciences* 111.26 \(2014\): 9419–24. www.pnas.org. Web. 20 Aug. 2014.
[http://www.pnas.org/content/111/26/9419.abstract](http://www.pnas.org/content/111/26/9419.abstract)

[^2]: These tools were derived from the 1911 index to and full text of the
*Thesaurus* [available from Project
Gutenberg](http://www.gutenberg.org/ebooks/search/?query=roget) and were
generated using 1. automated regular expression text extraction on the
[index](http://www.gutenberg.org/cache/epub/10681/pg10681.txt) and 2.
reconstruction of the hierarchy represented by the headings of the [full 1911
edition](http://www.gutenberg.org/cache/epub/22/pg22.txt).

With this integration in mind, the library provides several primary tools for
analysis. First, it enables Python-readable categorization of individual words
at different levels of abstraction (i.e., specificity of semantic
categorization). It can also return the full hierarchical path of all a given
word's categories to the top of Roget's taxonomy, simultaneously measuring the
path length. In addition to being applicable to individual words, both of
these methods can be automatically applied to large samples of text, replacing
words with their semantic categories. Roget Tools can also return the distance
(in network edges) between any two words in the *Thesaurus* or any two nodes
in the hierarchy. (See Jarmasz and Szpakowicz (2012)[^3] on the relevance of
this measure.) Finally, given a text---be it a list of randomly selected
words, a portion of a literary text, or part of the output from a topic
modeling algorithm---the Roget tools can return the node or nodes that most
accurately represent that text's semantic character; this representativeness
is measured as the minimum average distance in edges from each word in the
list to the selected node.

This is a work in progress, and suggestions for application and development
are welcome. Full instructions can be found on the [main project
page](https://github.com/prpole/roget-tools), which also contains projections
for future development.

### Download

Roget Tools can be downloaded
[here](https://github.com/prpole/roget-tools/archive/master.zip).

[^3]: Jarmasz, Mario, and Stan Szpakowicz. “Roget’s Thesaurus and Semantic Similarity.” arXiv:1204.0245 \[cs\]\(2012\): n. pag. arXiv.org. Web. 20 Aug. 2014. [http://arxiv.org/abs/1204.0245](http://arxiv.org/abs/1204.0245)
