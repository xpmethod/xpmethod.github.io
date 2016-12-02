---
layout: project
title: "#feminism action defense"
tags:
- Manan Ahmed
- Jonah Bossewitch
- Tara Conley
- Sierra Eckert
- Emily Fuhrman
- Alex Gil
- Anna Hiatt
- Phillip R. Polefrone
- Juan Francisco Saldarriaga
- Dennis Yi Tenen
- Zoe Wood
type: OpSec
published: true
category: technologies-of-dissent
image: woman-poster.jpg
images:
- hashtag-feminism.png
- hashfem-code.JPG
snippet: 145
issue: 14
---

Following the turmoil of [#gameragate](http://en.wikipedia.org/wiki/Gamergate_controversy) our friends at [hashtagfeminism.com](http://www.hashtagfeminism.com) are getting hacked. It is our duty as citizens of the internet to protect free speech online. Action Defense is first, an all-nighter code-fest to move `#feminism` to a secure, static, hacker-proof platform and second, the attempt to articulate online security basics for the wider activist community.

### Online Security for Activists

During the initial meeting our group identified several potential vectors of
attack. We've closed down vulnerabilities and took steps to harden the site's
publishing platform. These included: deleting default administrator accounts,
restricting database user privileges, and limiting code execution. Most
importantly, we found and eliminated a number of unauthorized users with
administrator privileges.

To further minimize security risks we explored the possibility of moving
`#feminism` to [may first/people link](https://mayfirst.org), an
internet service provider that specializes in hosting infrastructure for
progressive mission-based organizations. Finally, we've [recreated the website
using a static site generator](http://xpmethod.plaintext.in/action-defense/)
to evaluate a hostless solution, which would radically reduce the number of
potential attack vectors.
