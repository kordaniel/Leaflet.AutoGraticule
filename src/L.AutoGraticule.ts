import L, { LatLngBounds, LatLngExpression, LayerOptions, LeafletEventHandlerFnMap, PolylineOptions, Map } from 'leaflet';
import './L.AutoGraticule.css';

function round(number: number, digits: number) {
    const fac = Math.pow(10, digits);
    return Math.round(number*fac)/fac;
}

function niceRound(number: number, variableDistance: boolean) {
    if(number <= 0 || !isFinite(number))
        throw "Invalid number " + number;
    else {
        if(variableDistance && number >= 5)
            return 5;
        if(number <= 10) {
            let fac = 1;
            while(number>1) { fac*=10; number/=10; }
            while(number<=0.1) { fac/=10; number*=10; }

            // Dist is now some number between 0.1 and 1, so we can round it conveniently and then multiply it again by fac to get back to the original dist

            if(number == 0.1)
                return round(0.1*fac, 12);
            else if(number <= 0.2)
                return round(0.2*fac, 12);
            else if(number <= 0.5)
                return round(0.5*fac, 12);
            else
                return fac;
        } else if(number <= 30)
            return 30;
        else if(number <= 45)
            return 45;
        else if(number <= 60)
            return 60;
        else
            return 90;
    }
}

function bboxIntersect(bbox1: LatLngBounds | LatLngExpression[], bbox2: LatLngBounds | LatLngExpression[]) {
    const bounds1 = bbox1 instanceof LatLngBounds ? bbox1 : L.latLngBounds(bbox1);
    const bounds2 = bbox2 instanceof LatLngBounds ? bbox2 : L.latLngBounds(bbox2);
    return L.latLngBounds([
        [ Math.max(bounds1.getSouth(), bounds2.getSouth()), Math.max(bounds1.getWest(), bounds2.getWest())],
        [ Math.min(bounds1.getNorth(), bounds2.getNorth()), Math.min(bounds1.getEast(), bounds2.getEast())]
    ]);
}

export interface Options extends LayerOptions {
    redraw: keyof LeafletEventHandlerFnMap,

    /** Minimum distance between two lines in pixels */
    minDistance: number
}

export default class AutoGraticule extends L.LayerGroup {

    options: Options = {
        redraw: 'moveend',
        minDistance: 100 // Minimum distance between two lines in pixels
    };

    lineStyle: PolylineOptions = {
        stroke: true,
        color: '#111',
        opacity: 0.6,
        weight: 1,
        interactive: false
    };

    _bounds!: LatLngBounds;


    constructor(options?: Options) {
        super();
        L.Util.setOptions(this, options);
    }


    onAdd(map: Map) {
        this._map = map;

        this.redraw();
        this._map.on('viewreset ' + this.options.redraw, this.redraw, this);

        this.eachLayer(map.addLayer, map);

        return this;
    }

    onRemove(map: Map) {
        map.off('viewreset '+ this.options.redraw, this.redraw, this);
        this.eachLayer(this.removeLayer, this);
        return this;
    }

    redraw() {
        this._bounds = this._map.getBounds().pad(0.5);

        this.clearLayers();

        this.constructLines();

        return this;
    }

    constructLines() {
        const bounds = this._map.getBounds();
        const zoom = this._map.getZoom();

        // Fix drawing of lines outside of bounds
        this._bounds = bboxIntersect(bounds, [[-85, -180], [85, 180]]);

        // Fix drawing of labels outside of bounds
        const getBoundsBkp = this._map.getBounds;
        try {
            this._map.getBounds = function() {
                return bboxIntersect(getBoundsBkp.apply(this), [[-85, -180], [85, 180]])
            };

            // Longitude
            const center = this._map.project(bounds.getCenter(), zoom);
            const dist = niceRound(round(this._map.unproject(center.add([ this.options.minDistance / 2, 0 ]), zoom).lng - this._map.unproject(center.subtract([ this.options.minDistance / 2, 0 ]), zoom).lng, 12), false);
            const west = Math.max(bounds.getWest(), -180);
            const east = Math.min(bounds.getEast(), 180);
            for (let lng = Math.ceil(round(west/dist, 12))*dist; lng <= east; lng+=dist) {
                this.addLayer(this.buildXLine(lng));
                this.addLayer(this.buildLabel('gridlabel-horiz', round(lng, 12)));
            }

            // Latitude
            if(bounds.getNorth() > 0) {
                let lat = Math.max(0, bounds.getSouth());
                let first = true;
                while(lat < bounds.getNorth() && lat < 85) {
                    const point = this._map.project([ lat, bounds.getCenter().lng ], zoom);
                    const point2LatLng = this._map.unproject(point.subtract([ 0, this.options.minDistance ]), zoom);

                    const dist = niceRound(round(point2LatLng.lat - lat, 12), true);
                    lat = round(first ? Math.ceil(round(lat/dist, 12))*dist : Math.ceil(round(point2LatLng.lat/dist, 12))*dist, 2);

                    first = false;

                    this.addLayer(this.buildYLine(lat));
                    this.addLayer(this.buildLabel('gridlabel-vert', lat));
                }
            }
            if(bounds.getSouth() < 0) {
                let lat = Math.min(0, bounds.getNorth());
                let first = true;
                while(lat > bounds.getSouth() && lat > -85) {
                    const point = this._map.project([ lat, bounds.getCenter().lng ], zoom);
                    const point2LatLng = this._map.unproject(point.add([ 0, this.options.minDistance ]), zoom);

                    const dist = niceRound(round(lat - point2LatLng.lat, 12), true);
                    lat = round(first ? Math.floor(round(lat/dist, 12))*dist : Math.floor(round(point2LatLng.lat/dist, 12))*dist, 2);

                    first = false;

                    this.addLayer(this.buildYLine(lat));
                    this.addLayer(this.buildLabel('gridlabel-vert', lat));
                }
            }
        } finally {
            this._map.getBounds = getBoundsBkp;
        }
    }

    buildXLine(x: number): L.Polyline {
        const bottomLL = new L.LatLng(this._bounds.getSouth(), x);
        const topLL = new L.LatLng(this._bounds.getNorth(), x);

        return new L.Polyline([bottomLL, topLL], this.lineStyle);
    }

    buildYLine(y: number): L.Polyline {
        const leftLL = new L.LatLng(y, this._bounds.getWest());
        const rightLL = new L.LatLng(y, this._bounds.getEast());

        return new L.Polyline([leftLL, rightLL], this.lineStyle);
    }

    buildLabel(axis: 'gridlabel-horiz' | 'gridlabel-vert', val: number) {
        const bounds = this._map.getBounds().pad(-0.003);
        let latLng: L.LatLng;
        if (axis == 'gridlabel-horiz') {
            latLng = new L.LatLng(bounds.getNorth(), val);
        } else {
            latLng = new L.LatLng(val, bounds.getWest());
        }

        return L.marker(latLng, {
            interactive: false,
            icon: L.divIcon({
                iconSize: [0, 0],
                className: 'leaflet-grid-label',
                html: '<div class="' + axis + '">' + val + '&#8239;°</div>'
            })
        });
    }
}

declare module 'leaflet' {
    function autoGraticule(options?: Options): AutoGraticule;

    class AutoGraticule extends L.LayerGroup {
        constructor(options?: Options);
    }
}

L.AutoGraticule = AutoGraticule;

L.autoGraticule = function autoGraticule(options?: Options) {
    return new L.AutoGraticule(options);
};
