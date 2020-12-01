---
A Generic Markdown Extender: zintGenericMarkdownExtender (zGME)
---

# Goal
Markdown is great.
But wouldn't be nice to be able to extent it?

This app provides an easy way to extend Markdown Markup Language (MarkdownML) in any way you desire.
You can extend MarkdownML 
by means of defining your own Extending Markup Language (ExML),
which fits your requirements.
It is relatively easy to define your own extension.

One version of ExML, called `ZintML`, for presentation of content is already given 
as an example.






# How it works

## Process on a single file
1. Get `.md` file with ExML.
1. Transform ExML markup to HTML as defined in `config_extension_definitions.json`.
1. Use pandoc to transform regular MarkdownML to HTML. 
The obtained file is in `tmp/_tmp.html`.
Note that upper and lower parts are missing.
1. Add html upper and lower parts defined in 
`static/ch/sec/?-f1.html`  and 
`static/ch/sec/?-f2.html` to the file.

## Definition of ExML

Extending ML is defined in 
Extending Markup Language (ExML) is defined in `config_extension_definitions.json`.
 
