Leaflet.AutoGraticule
=====================

A graticule for maps showing Latitude and Longitude, with automatic adjustment to the zoom level.

Based on [Leaflet.SimpleGraticule](https://github.com/ablakey/Leaflet.SimpleGraticule).

[Demo](https://esm.sh/leaflet-auto-graticule/example.html)\
[Demo on FacilMap](https://facilmap.org/#3/0.00/0.00/MSfR-grid)

Usage
-----

Since release 2.0.0, Leaflet.AutoGraticule is published as an ES module only. Install it using `npm install -S leaflet-auto-graticule` and use it in your code like so:
```javascript
import AutoGraticule from "leaflet-auto-graticule";

new AutoGraticule().addTo(map);
```

TypeScript is supported.

If you want to use Leaflet.AutoGraticule directly inside a website without using a module bundler (not recommended for production), you need to make sure to import it and Leaflet as a module, for example from esm.sh:

```html
<script type="importmap">
	{
		"imports": {
			"leaflet": "https://esm.sh/leaflet",
			"leaflet-auto-graticule": "https://esm.sh/leaflet-auto-graticule"
		}
	}
</script>
<script type="module">
	import L from "leaflet";
	import AutoGraticule from "leaflet-auto-graticule";

	const map = L.map('map', { center: [0, 0], zoom: 5 });
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '© <a href="http://www.openstreetmap.org/copyright" target="_blank">OSM Contributors</a>',
		noWrap: true
	}).addTo(map);
	new AutoGraticule().addTo(map);
</script>
```

## Options
All options are optional and any passed option will override the corresponding default option listed below.
```javascript
const options = {
    /** Leaflet map event on which to redraw the graticule. */
    redraw: 'moveend',

    /** Minimum distance in pixels between two graticule lines. */
    minDistance: 100,

    /** Format of labels for every graticule, options:
     *  - degrees - Decimal degrees, examples: -13.37°, 0.1°,
     *  - dms - Degrees-Minutes-Seconds, examples: 13°22'12.00''W, 00°00'36.00''E
     */
    labelFormat: 'degrees',

    /** Size of rendered graticule labels, options:
     * - normal
     * - large - css font-size: 1.25em
     */
    labelSize: 'normal',

    /** Style for graticule lines, accepts a Partial<L.PolylineOptions> object.
     *  Overrides the default values with the provided fields, while keeping
     *  defaults for all unspecified fields.
     */
    lineStyle: {
        stroke: true,
        color: '#111',
        opacity: 0.6,
        weight: 1,
        interactive: false
    }
};

new L.AutoGraticule(options).addTo(map);
```
