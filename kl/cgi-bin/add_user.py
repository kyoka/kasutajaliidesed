#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'data.db'

print 'Content-type: text/plain'
print

try:
    form = cgi.FieldStorage()
    if (form.has_key('full_name')
        and form.has_key('birthdate')
        and form.has_key('address')
        and form.has_key('email')
        and form.has_key('sex')
        and form.has_key('password')):
        values = {
            'email': form['email'].value(),
            'password': form['email'].value(),
            'full_name': form['full_name'].value,
            'sex': form['sex'].value,
            'birthdate': form['birthdate'].value,
            'address': form['address'].value,
            'photo': form['photo'].value if form.has_key('photo') else ''}
        columns = []
        vals = []
        for k, v in values.iteritems():
            columns.append(k)
            vals.append(v)

        query = ("insert into user(%s) values (%s)" %
                 (','.join(columns), ','.join(vals)))

        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute(query)
        con.commit()
        print "1"
    else:
        print "0"

except Exception, e:
    #print e # uncommment for debugging
    print "0"
