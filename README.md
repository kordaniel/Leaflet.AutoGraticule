Leaflet.AutoGraticule
------------
A graticule for maps showing Latitude and Longitude, with automatic adjustment to the zoom level.

Based on [Leaflet.SimpleGraticule](https://github.com/ablakey/Leaflet.SimpleGraticule).

Usage
-----
Adding L.AutoGraticule:

```JavaScript
var options = {
    /** Leaflet map event on which to redraw the graticule. */
    redraw: 'moveend',

    /** Minimum distance in pixels between two graticule lines. */
    minDistance: 100
};

L.autoGraticule(options).addTo(map);
```
