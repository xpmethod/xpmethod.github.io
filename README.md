#xpmethod.github.io
[![Build Status](https://travis-ci.org/xpmethod/xpmethod.github.io.svg?branch=master](https://travis-ci.org/xpmethod/xpmethod.github.io.svg?branch=master)

This page describes the file structure and the taxonomy of xpmethod.github.io

## Logic

Everything is either a post or a page. Pages are in the root folder with a
`.md` extension, and connect to `.html` layouts in the `_layouts` folder.
Pages have tags and categories and a bunch of other fields described in the
YAML block.

- `events.html` drives the **events** page which lists all posts in the
  category `events`

- `research.html` drives the **research** page, which lists all categories,
  *except* for `events`

- `strain.html` drives the single strain view, that lists all projects in a
  given category (except for `events`)

- `project.html` drives the single project view

- there is no "projects" view yet

## YAML Headers
This section describes the fields in the site's YAML taxonomy.  

`layout:` looks for the corresponding .html in `_layouts/`  
`title:` accessible though the `post.title` liquid tag  

```
tags:
 - Manan Ahmed
 - Alex Gil
 - Dennis Tenen
 - Grant Wythoff
```
Used to pull out the contributors on the "People" page and for project description in "strain" and "project" views. Should be plural and using the dash list as illustrated above (even for singular tags!)  

Tags can also include URL using the following convention:

```
tags:
- name: Author Name
  url: http://www.authorsite.com
```

If you use a name/url for one post, please make sure it is consistent with the
tag in previous posts to avoid duplicates on the "People" page.

`categories:` indicates research strains in the "research" section. Possible
values include "on-method," "public-discourse," and "minimal-computing." In
addition the "events" category places the post into the "events" section.
"Categories" is always plural.  

`type:` arbitrary types like "web-app," "seminar," "paper," and the like used
to generate tags. We needed the built-in `tags` to drive the social aspect of
the site.  

`issue:` indicates the issue to which the project belongs. Issues are
typically two-digit years, such as `15` or `14` for 2015 and 2014,
respectively.

Additionally, the posts in the "events" layout have the following fields:  

`prompt:` used to pull out the prompts in the "events" section. Should be in
quotations.  `location:` used to indicate location in the "events" section  

`snippet:` should be the numeric number of **words** that you want to be
included in your snippet. Note that his counts .md and HTML tags, but we will
try to "prettify" the snippet by rendering the markup. However, bad things
*will* happen if we pull a snippet that breaks one of your html or .md tags.
Try to keep the snippets clean for this reason.

`image:` an image can be handled by this tag to gracefully handle image
snippets. Avoid embedding images into the post otherwise.

```
images:
 - image1.jpg
 - image2.jpg
 - image3.jpg
```

Used for posts requiring multiple images. Images must be placed in
/public/images or path specified if in subfolder.

`sparkle:` is an option to include the little progress report visualization
seen in plain-text book project Dates in the "events" and "event" view are
generated form the post title.  

The site was originally forked from
<https://github.com/mojombo/mojombo.github.io>

# Style

- set your editor to hard-wrap at 78 characters
- if you are using vim, use the sample .vimrc file provided here for lab
defaults
- for links to static pages use internet archive snapshots as much as possible to minimize link rot
- for simple issues use the [TODO.md](https://github.com/xpmethod/xpmethod.github.io/blob/master/TODO.md) file
- travis


