---
title: "Cemmento"
people:
 - Martin Eve
 - Alex Gil
type: tool
image: cemmento.png
github: MartinPaulEve/cemmento
---

#Cemmento

Cemmento is a digital storage solution/proxy for pages that have been annotated. The proxy expects a URL to be passed to the main route at "/". The proxy then queries the storage engine to see if a copy has been archived. If it has, the user is redirected to the storage endpoint's earliest version. If not, the proxy instructs the storage engine to save a copy and then redirects the user. The default storage engine is the Internet Archive. The default redirect engine is hypothes.is. Cemmento is designed to be agnostic in terms of storage engine and annotation platform, although at present only the internet archive (storage) and hypothesis (annotation) are written. 
Expected Default Behaviour Users will be redirected to an internet archive version of the requested URL with the hypothesis annotation sidebar loaded.
Known Issues: Links are likely to be broken on the Wayback Machine version.

Cemmento was written by Martin Paul Eve and Alex Gil. It is copyright 2016. With thanks to Ben Armintor for a design chat.
