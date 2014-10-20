### Generally
Everything is either a post or a page. Pages are in the root folder with a `.md` extension, and connect to `.html` layouts in the `_layouts` folder. Pages have tags and categories and a bunch of other fields described in the YAML block.

- `events.html` drives the **events** page which lists all posts in the category `events`. 
- `strains.html` drives the **research** page, which lists all categories, *except* for `events`.
- `strain.html` drives the single strain view, that lists all projects in a given category (except for `events`).
- `project.html` drives the single project view
- there is no "projects" view yet

### YAML Headers
This section describes the fields in the site's YAML taxonomy.  

`layout:` looks for the corresponding .html in `_layouts/`  
`title:` accessible though the `post.title` liquid tag  

```
tags:
 - Alex Gil
 - Dennis Tenen
 - Grant Wythoff
```
Used to pull out the contributors on the "People" page and for project description in "strain" and "project" views. Should be plural and using the dash list as illustrated above (even for singular tags!)  

`categories:` indicates research strains in the "research" section. Possible values include "on-method," "public-discourse," and "minimal-computing." In addition the "events" category places the post into the "events" section. "Categories" is always plural.  

`type:` arbitrary types like "web-app," "seminar," "paper," and the like used to generate tags. We needed the built-in `tags` to drive the social aspect of the site.  

Additionally, the posts in the "events" layout have the following fields:  

`prompt:` used to pull out the prompts in the "events" section. Should be in quotations.  
`location:` used to indicate location in the "events" section  

Dates in the "events" and "event" view are generated form the post title.  
