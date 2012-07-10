var sixHours       = 6 * 60 * 60 * 1000,
    sixHoursThirty = sixHours + 30 * 60 * 1000;

test('date-part', 16, function () {
    strictEqual(Date.parse('1970-01-01'), Date.UTC(1970, 0, 1, 0, 0, 0, 0), 'Unix epoch');

    strictEqual(Date.parse('2001'),       Date.UTC(2001, 0, 1, 0, 0, 0, 0), '2001');
    strictEqual(Date.parse('2001-02'),    Date.UTC(2001, 1, 1, 0, 0, 0, 0), '2001-02');
    strictEqual(Date.parse('2001-02-03'), Date.UTC(2001, 1, 3, 0, 0, 0, 0), '2001-02-03');

    strictEqual(Date.parse('-002001'),       Date.UTC(-2001, 0, 1, 0, 0, 0, 0), '-002001');
    strictEqual(Date.parse('-002001-02'),    Date.UTC(-2001, 1, 1, 0, 0, 0, 0), '-002001-02');
    strictEqual(Date.parse('-002001-02-03'), Date.UTC(-2001, 1, 3, 0, 0, 0, 0), '-002001-02-03');

    strictEqual(Date.parse('+010000-02'),    Date.UTC(10000, 1, 1, 0, 0, 0, 0), '+010000-02');
    strictEqual(Date.parse('+010000-02-03'), Date.UTC(10000, 1, 3, 0, 0, 0, 0), '+010000-02-03');
    strictEqual(Date.parse('-010000-02'),    Date.UTC(-10000, 1, 1, 0, 0, 0, 0), '-010000-02');
    strictEqual(Date.parse('-010000-02-03'), Date.UTC(-10000, 1, 3, 0, 0, 0, 0), '-010000-02-03');

    // 2 digit years incorrectly parsed as though they were prefixed with 19
    /* disabled, since no native implementations get this right either
     strictEqual(Date.parse('0099-12-31'), +new Date(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31');
     strictEqual(Date.parse('0099-12-31T00:00Z'), Date.UTC(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31T00:00Z');
    */

    ok(isNaN(Date.parse('asdf')), 'invalid YYYY (non-digits)');
    ok(isNaN(Date.parse('1970-as-df')), 'invalid YYYY-MM-DD (non-digits)');
    ok(isNaN(Date.parse('1970-01-')), 'invalid YYYY-MM- (extra hyphen)');
    ok(isNaN(Date.parse('19700101')), 'invalid YYYY-MM-DD (missing hyphens)');
    ok(isNaN(Date.parse('197001')), 'ambiguous YYYY-MM/YYYYYY (missing plus/minus or hyphen)');

    // TODO: Test for invalid YYYYMM and invalid YYYYY?
});

test('date-time', 31, function () {
    strictEqual(Date.parse('2001-02-03T04:05'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05');
    strictEqual(Date.parse('2001-02-03T04:05:06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');

    strictEqual(Date.parse('2001-02-03T04:05Z'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05Z');
    strictEqual(Date.parse('2001-02-03T04:05:06Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06Z');
    strictEqual(Date.parse('2001-02-03T04:05:06.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007Z');

    strictEqual(Date.parse('2001-02-03T04:05-00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06-00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007-00:00');

    strictEqual(Date.parse('2001-02-03T04:05+00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06+00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007+00:00');

    strictEqual(Date.parse('2001-02-03T04:05-06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHoursThirty, '2001-02-03T04:05-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06-06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHoursThirty, '2001-02-03T04:05:06-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');

    strictEqual(Date.parse('2001-02-03T04:05+06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHoursThirty, '2001-02-03T04:05+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06+06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHoursThirty, '2001-02-03T04:05:06+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03T04:05:06.007+06:30');

    strictEqual(Date.parse('2001T04:05:06.007'),             Date.UTC(2001, 0, 1, 4, 5, 6, 7), '2001T04:05:06.007');
    strictEqual(Date.parse('2001-02T04:05:06.007'),          Date.UTC(2001, 1, 1, 4, 5, 6, 7), '2001-02T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'),       Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');

    strictEqual(Date.parse('-010000T04:05'),       Date.UTC(-10000, 0, 1, 4, 5, 0, 0), '-010000T04:05');
    strictEqual(Date.parse('-010000-02T04:05'),    Date.UTC(-10000, 1, 1, 4, 5, 0, 0), '-010000-02T04:05');
    strictEqual(Date.parse('-010000-02-03T04:05'), Date.UTC(-10000, 1, 3, 4, 5, 0, 0), '-010000-02-03T04:05');

    ok(isNaN(Date.parse('1970-01-01 00:00:00')), 'invalid date-time (missing T)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00.000000')), 'invalid date-time (too many characters in millisecond part)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00,000')), 'invalid date-time (comma instead of dot)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00+0630')), 'invalid date-time (missing colon in timezone part)');
    ok(isNaN(Date.parse('1970-01-01T0000')), 'invalid date-time (missing colon in time part)');
    ok(isNaN(Date.parse('1970-01-01T00:00.000')), 'invalid date-time (msec with missing seconds)');

    // TODO: DRY
});


test('createUTC', 7, function () {
    strictEqual(Date.createUTC(2010,8,2,23,19,38).getTime(), Date.UTC(2010,8,2,23,19,38));
    strictEqual(Date.createUTC(2010,8,2,23,19).getTime(), Date.UTC(2010,8,2,23,19,0));
    strictEqual(Date.createUTC(2010,8,2,23).getTime(), Date.UTC(2010,8,2,23,0,0));
    strictEqual(Date.createUTC(2010,1,1).getTime(), Date.UTC(2010,1,1,0,0,0));
    strictEqual(Date.createUTC(2010,11).getTime(), Date.UTC(2010,11,1,0,0,0));
    strictEqual(Date.createUTC(2010).getTime(), Date.UTC(2010,0,1,0,0,0));
    strictEqual(Date.createUTC().getTime(), Date.UTC(1970,0,1,0,0,0));
});

test('toISOString', 2, function () {
    strictEqual(Date.createUTC(2010,8,2,23,19,38).toISOString(), '2010-09-02T23:19:38.000Z');
    strictEqual(Date.createUTC(2012,0,12,0,1,59).toISOString(), '2012-01-12T00:01:59.000Z');
});


test('parseToDate', 5, function () {
	strictEqual( Date.parseToDate('2007-02-04T15:02:12.000Z').getTime(), Date.UTC(2007,2-1,4,15,2,12) );
	strictEqual( Date.parseToDate('2007-01-01T00:01:03.000Z').getTime(), Date.UTC(2007,1-1,1,0,1,3) );

	ok( isNaN(Date.parseToDate('2007-01-01T0:01:03.000Z')) );
	ok( isNaN(Date.parseToDate('2007-01-01T00:1:03.000Z')) );
	ok( isNaN(Date.parseToDate('2007-01-01T00:01:3.000Z')) );
});


test('integration', 4, function () {
    var now = new Date();
    var nowIso = now.toISOString();
    var nowIsoDate = Date.parseToDate(nowIso);
    strictEqual( nowIsoDate.getTime(), now.getTime() );
    strictEqual( nowIsoDate.toISOString(), nowIso );


    var dt = Date.createUTC(2012, 7-1, 10, 8, 33, 12);
    var dtIso = dt.toISOString();
    var dtIsoTime = Date.parse(dtIso);
    strictEqual( dtIsoTime, dt.getTime() );
    strictEqual( dtIso, '2012-07-10T08:33:12.000Z' );
});
