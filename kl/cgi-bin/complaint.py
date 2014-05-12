#!/usr/bin/python
import json
import sys
import cgi
import sqlite3 as sqlite
import itertools

databasefile = 'mydb.db'
fields = ['id', 'user_id', 'title', 'description',
          'time', 'tag', 'location', 'photo']
# TODO location as string
print 'Content-type: text/plain'
print


def jsonstr(data):
    if data:
        try:
            data = str(data)
        except Exception, e:
            data = data.encode('UTF-8')
        return "\"" + str(data) + "\""
    else:
        return "\"\""


try:
    form = cgi.FieldStorage()
    query = 'select c.*,  GROUP_CONCAT(file_name) as images from complaint c left join complaint_photo cp on c.id=cp.complaint_id'
    if form.has_key('c') and form.has_key('v'):
        query += " where c.%s = %s" % (form['c'].value, form['v'].value)
    query += " group by complaint_id"
    con = sqlite.connect(databasefile)
    con.row_factory = sqlite.Row
    con.text_factory = str
    cur = con.cursor()
    cur.execute(query)

    rows = cur.fetchall()
    res = {'data': [dict(itertools.izip(row.keys(), row)) for row in rows]}
    print json.dumps(res)
except Exception, e:
    print e  # uncommment for debugging
    print "0"
