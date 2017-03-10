---
layout: project
title: "Text Divider: Quick Markup for Chapter and Dialogue Splitting"
tags: 
 - Moacir P. de Sá Pereira
category: literary-modeling-and-visualization-lab
type: markup
image: url-alice.png
snippet: 89
---

Read the [README](https://github.com/muziejus/text_divider) at GitHub.

This python script breaks up a text into its internal sections. It uses a
light markup scheme to signal where chapters and sections begin, and it also
can keep track of dialogue by speaker. Given an electronic version of *The
Great Gatsby*, for example, after the markup, it is possible to extract only
Tom Buchanan’s lines.

The markup that breaks out the sections and dialogue was [created by David
Hoover](https://wp.nyu.edu/exceltextanalysis/analyzetextualdivisions/), though
the entirety of Prof. Hoover’s markup scheme has not been implemented here.

The current state of the markup is:

```
<1>    text division level 1 (chapter, say)
<2>    text division level 2 (subchapter, say)
/      new speaker (character)
\      reporting clause (“speech marker”)
```
<br>
As a result, the opening of *The Great Gatsby* can be marked up as:

```

<1>The Great Gatsby

Then wear the gold hat, if that will move her;
If you can bounce high, bounce for her too,
Till she cry "Lover, gold-hatted, high-bouncing lover,
I must have you!"

THOMAS PARKE D'INVILLIERS.

<2>Chapter 1

In my younger and more vulnerable years my father gave me some advice
that I've been turning over in my mind ever since.

/Mr. Carraway"Whenever you feel like criticizing any one," 

\he told me, 

/Mr. Carraway"just remember that all the people in this world haven't had the
advantages that you've had."

[...]

<2>Chapter 2
```
<br>
Here, I have arbitrarily designated the novel itself as `level 1` of the text
division, thereby making each chapter `level 2`. When Mr. Carraway speaks, his
speech is introduced with `/Mr. Carraway`, and the reporting clause is marked
with a backslash. Every aspect of the markup, of course, is optional, so if you
want to keep the reporting clause as part of the narration, just don’t use the
backslash. If you want to skip dialogue by certain characters or in certain
parts, just don’t mark them up. There is a
[`sample.txt`](https://github.com/muziejus/text_divider/blob/master/sample.txt)
on the GitHub project that is a bit longer than the example above.

The script expects dialog to take the form of `ascii` double quotes (`"some
dialogue"`), though it also recognizes curly quotes (`“some dialogue”`). It
treats either `“` or `"` as the barrier that stops the name of the character
(`Mr. Carraway` above). Other dialogue markers require some extra
pre-processing.

There are no closing tags, because the script resets dialogue and reporting
clauses on blank lines. As a result, a paragraph gets broken up, as above.
Since, presumably, the text will be fed into [`NLTK`](http://www.nltk.org) or
some other processing environment, the lack of paragraph integrity should not
be a cause for concern. Similarly, a new `<2>` treats the previous one as
closed, much like `html` does with `<li>` tags.

`text_divider` was designed to be quick to use, as I wanted simply to pull out
dialogue from novels with character attributes, without having to create a
whole TEI version of the novel. This markup, with some useful vim macros (see
the README) lets me markup about 100 pp of text in an hour or so, which is a
pretty quick way of building up something to feed the processor for
differential analysis.
