#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'data.db'

print 'Content-type: text/plain'
print

try:
    form = cgi.FieldStorage()
    if (form.has_key('user')
        and form.has_key('title')
        and form.has_key('time')
        and form.has_key('tag')
        and form.has_key('description')
    ):
        values = {'user': form['user'].value, 'title': form['title'].value,
                  'time': form['time'].value, 'tag': form['tag'].value,
                  'description': form['description'].value,
                  'location': form['location'].value if form.has_key(
                      'location') else '',
                  'photo': form['photo'].value if form.has_key('photo') else ''}
        columns = []
        vals = []
        for k, v in values.iteritems():
            columns.append(k)
            vals.append(v)

        query = ("insert into complaint(%s) values (%s)" %
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
