# -*- coding: utf-8 -*-
## the leading / is needed to tell mako to look for the template using the provided TemplateLookup
<%inherit file="A4_portrait.mako" />

## using a trailing \ to prevent new line from being inserted by mako
<%def name="title()">\
1 A4 portrait demo\
</%def>

<%def name="backgroundPdf()">
      backgroundPdf: '<%text>$</%text>{configDir}/tpl_demo_A4_portrait.pdf'
</%def>
