# -*- coding: utf-8 -*-        
#===========================================================================     
dpis: [254]      
     
#===========================================================================     
# the allowed scales
#===========================================================================     
scales:      
  - 100
  - 200
  - 500
  - 1000
  - 2000
  - 2500
  - 5000
  - 10000
  - 25000
  - 50000
  - 100000
  - 200000
  - 500000
     
#===========================================================================     
# the list of allowed hosts
#===========================================================================     
hosts:       
  - !localMatch
    dummy: true
  - !dnsMatch
    host: ${host}        
    port: 80         
  - !dnsMatch
    host: ${host}        
    port: ${waitress_port}       
  - !dnsMatch
    host: otile1.mqcdn.com
    port: 80
  - !dnsMatch
    host: otile2.mqcdn.com
    port: 80
  - !dnsMatch
    host: otile3.mqcdn.com
    port: 80
  - !dnsMatch
    host: otile4.mqcdn.com
    port: 80
  - !dnsMatch
    host: a.tile2.opencyclemap.org
    port: 80
  - !dnsMatch
    host: b.tile2.opencyclemap.org
    port: 80
  - !dnsMatch
    host: c.tile2.opencyclemap.org
    port: 80
  - !dnsMatch
    host: a.tile.opencyclemap.org
    port: 80
  - !dnsMatch
    host: b.tile.opencyclemap.org
    port: 80
  - !dnsMatch
    host: c.tile.opencyclemap.org
    port: 80
  - !dnsMatch
    host: geomapfish.demo-camptocamp.com
    port: 80
     
localHostForward:        
    from:        
        - ${host}        
    https2http: True
     
#===========================================================================     
# the output filename
#===========================================================================     
outputFilename: c2cgeoportail_print
     
#===========================================================================     
# supported output formats
#===========================================================================     
formats:     
  - "pdf"        
  - "png"        
     
     
globalParallelFetches: 1000
     
layouts:     
     
## A4 portrait inherit example, inherit from A4_portrait.mako
<%include file="templates/A4_portrait_demo.mako" />      
     
## A3 landscape inherit example, inherit from A3_landscape.mako
<%include file="templates/A3_portrait_demo.mako" />      
     
## A4 landscape inherit example, inherit from A4_landscape.mako
<%include file="templates/A4_landscape_demo.mako" />     
     
## A3 landscape inherit example, inherit from A3_landscape.mako
<%include file="templates/A3_landscape_demo.mako" />
