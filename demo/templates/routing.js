<%
from json import dumps
%>
Ext.onReady(function() {
    /*
     * Initialize the application.
     */
    // OpenLayers
    OpenLayers.Number.thousandsSeparator = ' ';
    OpenLayers.DOTS_PER_INCH = 72;
    OpenLayers.ProxyHost = "${request.route_url('ogcproxy')}?url=";

    // Ext
    Ext.QuickTips.init();

    OpenLayers.ImgPath = "${request.static_url('demo:static/lib/cgxp/core/src/theme/img/ol/')}";
    Ext.BLANK_IMAGE_URL = "${request.static_url('demo:static/lib/cgxp/ext/Ext/resources/images/default/s.gif')}";

    // Apply same language than on the server side
    OpenLayers.Lang.setCode("${lang}");
    GeoExt.Lang.set("${lang}");

    // Server errors (if any)
    var serverError = ${serverError | n};

    // Themes definitions
    var THEMES = {
        "local": ${themes | n}
% if external_themes:
        , "external": ${external_themes | n}
% endif
    };

    <% bounds = user.role.bounds if user else None %>
% if bounds:
    var INITIAL_EXTENT = ${dumps(bounds)};
% else:
    var INITIAL_EXTENT = [-466375, 5379611, 1035458, 6573252];
% endif

    var RESTRICTED_EXTENT = [-666375, 3379611, 1235458, 7573252];

    // Used to transmit event throw the application
    var EVENTS = new Ext.util.Observable();

    var WMTS_OPTIONS = {
        url: ${tiles_url | n},
        displayInLayerSwitcher: false,
        requestEncoding: 'REST',
        buffer: 0,
        transitionEffect: "resize",
        visibility: false,
        style: 'default',
        dimensions: ['TIME'],
        params: {
            'time': '2011'
        },
        matrixSet: 'c2cgp',
        maxExtent: new OpenLayers.Bounds(420000, 30000, 900000, 350000),
        projection: new OpenLayers.Projection("EPSG:3857"),
        units: "m",
        formatSuffix: 'png',
        serverResolutions: [156543.03390625,78271.516953125,39135.7584765625,19567.87923828125,9783.939619140625,4891.9698095703125,2445.9849047851562,1222.9924523925781,611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,9.554628534317017,4.777314267158508,2.388657133579254,1.194328566789627,0.5971642833948135]
    };

    app = new gxp.Viewer({

        // viewer config
        portalConfig: {
            layout: 'border',
            items: [
                'app-map',
            {
                id: 'left-panel',
                region: 'west',
                layout: 'fit',
                width: 405
            }]
        },

        // tools
        tools: [
        {
            ptype: 'cgxp_routing',
            routingService: {
                osrm_demo: {
                    type: 'OSRM',
                    url: 'http://router.project-osrm.org/',
                    dynamic: true
                }/*,
                c2c_car: {
                    type: 'OSRM',
                    url: 'http://mfusrgrp-re2013.demo-camptocamp.com/car',
                    dynamic: true
                },
                c2c_bicycle: {
                    type: 'OSRM',
                    url: 'http://mfusrgrp-re2013.demo-camptocamp.com/bicycle',
                    dynamic: true
                },
                c2c_foot: {
                    type: 'OSRM',
                    url: 'http://mfusrgrp-re2013.demo-camptocamp.com/foot',
                    dynamic: true
                }*/
            },
            searchOptions: {
                url: "${request.route_url('fulltextsearch', path='')}",
            },
            outputConfig: {
                zoomToRouteLevel: 16
            },
            outputTarget: 'left-panel'
        },
        {
            ptype: "cgxp_mapopacityslider",
            defaultBaseLayerRef: "OSM_MapQuest"
        }
        ],

        // layer sources
        sources: {
            "olsource": {
                ptype: "gxp_olsource"
            }
        },

        // map and layers
        map: {
            id: "app-map", // id needed to reference map in portalConfig above
            stateId: "map",
            xtype: 'cgxp_mappanel',
            projection: "EPSG:3857",
            extent: INITIAL_EXTENT,
            maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
            //restrictedExtent: RESTRICTED_EXTENT,
            projection: new OpenLayers.Projection("EPSG:3857"),
            units: "m",
            //maxResolution: 156543.0339,
            //resolutions: [4000,2000,1000,500,250,100,50,20,10,5,2.5,1,0.5,0.25,0.1,0.05],
            resolutions: [156543.03390625,78271.516953125,39135.7584765625,19567.87923828125,9783.939619140625,4891.9698095703125,2445.9849047851562,1222.9924523925781,611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,9.554628534317017,4.777314267158508,2.388657133579254,1.194328566789627,0.5971642833948135],
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.KeyboardDefaults(),
                new OpenLayers.Control.PanZoomBar({panIcons: false}),
                new OpenLayers.Control.ArgParser(),
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.ScaleLine({
                    geodesic: true,
                    bottomInUnits: false,
                    bottomOutUnits: false
                }),
                new OpenLayers.Control.MousePosition({numDigits: 0})
            ],
            layers: [{
                source: "olsource",
                type: "OpenLayers.Layer.OSM",
                group: 'background',
                args: [
                    OpenLayers.i18n('OSM_MapQuest'),
                    [
                        'http://otile1.mqcdn.com/tiles/1.0.0/osm/${"${z}/${x}/${y}"}.png',
                        'http://otile2.mqcdn.com/tiles/1.0.0/osm/${"${z}/${x}/${y}"}.png',
                        'http://otile3.mqcdn.com/tiles/1.0.0/osm/${"${z}/${x}/${y}"}.png'
                   ], {
                        projection: new OpenLayers.Projection("EPSG:3857"),
                        transitionEffect: 'resize',
                        attribution: [
                            "(c) <a href='http://openstreetmap.org/'>OSM</a>",
                            "<a href='http://creativecommons.org/licenses/by-sa/2.0/'>by-sa</a>"
                        ].join(' '),
                        group: 'background',
                        ref: 'OSM_MapQuest',
                        visibility: false
                    }
                ]
            },
            {
                source: "olsource",
                type: "OpenLayers.Layer.OSM",
                args: [
                    OpenLayers.i18n('ortho'),
                    [
                        "http://a.tiles.mapbox.com/v2/camptocamp.map-con6pdvs/${'${z}/${x}/${y}'}.png",
                        "http://b.tiles.mapbox.com/v2/camptocamp.map-con6pdvs/${'${z}/${x}/${y}'}.png"
                    ],
                    {
                        projection: new OpenLayers.Projection("EPSG:3857"),
                        transitionEffect: 'resize',
                        ref: 'ortho',
                        visibility: false,
                        opacity: 0
                    }
                ]
            },
            {
                source: "olsource",
                type: "OpenLayers.Layer",
                group: 'background',
                args: [OpenLayers.i18n('blank'), {
                    displayInLayerSwitcher: false,
                    ref: 'blank',
                    group: 'background',
                    visibility: false
                }]
            }],
            items: []
        }
    });

    app.on('ready', function() {
        // remove loading message
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove: true
        });

        if (serverError.length > 0) {
            cgxp.tools.openWindow({
                html: serverError.join('<br />')
            }, OpenLayers.i18n("Error notice"), 600, 500);
        }
    }, app);
});
