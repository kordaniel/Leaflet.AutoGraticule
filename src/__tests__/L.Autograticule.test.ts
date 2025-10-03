import { expect, test } from 'vitest'
import AutoGraticule from '../L.AutoGraticule';

test('niceRound', () => {
    expect(AutoGraticule.getGridDivisor(180, false)).toBe(90);
    expect(AutoGraticule.getGridDivisor(90, false)).toBe(90);
    expect(AutoGraticule.getGridDivisor(60.1, false)).toBe(90);
    expect(AutoGraticule.getGridDivisor(60, false)).toBe(60);
    expect(AutoGraticule.getGridDivisor(45.1, false)).toBe(60);
    expect(AutoGraticule.getGridDivisor(45, false)).toBe(45);
    expect(AutoGraticule.getGridDivisor(30.1, false)).toBe(45);
    expect(AutoGraticule.getGridDivisor(30, false)).toBe(30);
    expect(AutoGraticule.getGridDivisor(10.1, false)).toBe(30);

    expect(AutoGraticule.getGridDivisor(10, false)).toBe(10);
    expect(AutoGraticule.getGridDivisor(5.1, false)).toBe(10);
    expect(AutoGraticule.getGridDivisor(5, false)).toBe(5);
    expect(AutoGraticule.getGridDivisor(2.1, false)).toBe(5);
    expect(AutoGraticule.getGridDivisor(2, false)).toBe(2);
    expect(AutoGraticule.getGridDivisor(1.1, false)).toBe(2);
    expect(AutoGraticule.getGridDivisor(1, false)).toBe(1);
    expect(AutoGraticule.getGridDivisor(0.51, false)).toBe(1);

    expect(AutoGraticule.getGridDivisor(0.5, false)).toBe(0.5);
    expect(AutoGraticule.getGridDivisor(0.21, false)).toBe(0.5);
    expect(AutoGraticule.getGridDivisor(0.2, false)).toBe(0.2);
    expect(AutoGraticule.getGridDivisor(0.11, false)).toBe(0.2);
    expect(AutoGraticule.getGridDivisor(0.1, false)).toBe(0.1);
    expect(AutoGraticule.getGridDivisor(0.051, false)).toBe(0.1);

    expect(AutoGraticule.getGridDivisor(0.05, false)).toBe(0.05);
    expect(AutoGraticule.getGridDivisor(0.021, false)).toBe(0.05);
    expect(AutoGraticule.getGridDivisor(0.02, false)).toBe(0.02);
    expect(AutoGraticule.getGridDivisor(0.011, false)).toBe(0.02);
    expect(AutoGraticule.getGridDivisor(0.01, false)).toBe(0.01);


    expect(AutoGraticule.getGridDivisor(180, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(90, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(60.1, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(60, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(45.1, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(45, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(30.1, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(30, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(10.1, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(10, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(5.1, true)).toBe(5);
    expect(AutoGraticule.getGridDivisor(5, true)).toBe(5);
});

test('decimalLatLngToDMSStr', () => {
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -180.00)).toBe("180°00'00.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -100.00)).toBe("100°00'00.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -13.37331)).toBe("13°22'23.92''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -13.37)).toBe("13°22'12.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -5.00)).toBe("05°00'00.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -1.00)).toBe("01°00'00.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -0.10)).toBe("00°06'00.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -0.01)).toBe("00°00'36.00''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', -0.001)).toBe("00°00'03.60''W");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 0.00)).toBe("00°00'00.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 0.001)).toBe("00°00'03.60''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 0.01)).toBe("00°00'36.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 0.10)).toBe("00°06'00.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 1.00)).toBe("01°00'00.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 5.00)).toBe("05°00'00.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 13.37)).toBe("13°22'12.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 13.37331)).toBe("13°22'23.92''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 100.00)).toBe("100°00'00.00''E");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-horiz', 180.00)).toBe("180°00'00.00''E");

    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', -85.05115)).toBe("85°03'04.14''S");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', -13.020381)).toBe("13°01'13.37''S");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', -10.23456)).toBe("10°14'04.42''S");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', -0.00002)).toBe("00°00'00.07''S");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', 0.00)).toBe("00°00'00.00''N");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', 0.00002)).toBe("00°00'00.07''N");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', 10.23456)).toBe("10°14'04.42''N");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', 13.020381)).toBe("13°01'13.37''N");
    expect(AutoGraticule.decimalLatLngToDMSStr('gridlabel-vert', 85.00)).toBe("85°00'00.00''N");
});
