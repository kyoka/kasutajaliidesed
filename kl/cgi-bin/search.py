#!/usr/bin/python
import cgi
import json
import sqlite3 as sqlite
import itertools

fields = ['title', 'tag', 'description', 'name']

databasefile = 'mydb.db'

# import pydevd
# pydevd.settrace('localhost', port=12345, stdoutToServer=True, stderrToServer=True)

print 'Content-type: text/plain'
print
try:
    form = cgi.FieldStorage()
    query = ("select * from user join complaint "
             "on user.id = complaint.user_id")
    if form['type'].value == 'simple' and form.has_key('q'):
        q = form['q'].value
        where_list = []
        for f in fields:
            where_list.append("upper(%s) like upper('%%%s%%')" % (f, q))
        query += ' where %s' % ' or '.join(where_list)
    elif form['type'].value == 'adv':
        where_list = []
        for f in fields:
            if f in form and form[f].value != '':
                where_list.append("upper(%s) like upper('%%%s%%')" % (f, form[f].value))
        query += ' where %s' % ' and '.join(where_list)

    if form.has_key('search_params'):
        where_clause = 'where 1=1 '
        for k, v in form['search_params'].iteritems():
            where_clause += ("and upper(%s) like upper('%%%s%%') "
                             % (k, v))

    con = sqlite.connect(databasefile)
    con.row_factory = sqlite.Row
    con.text_factory = str
    cur = con.cursor()
    cur.execute(query)

    rows = cur.fetchall()
    res = {'data': [dict(itertools.izip(row.keys(), row)) for row in rows]}
    print json.dumps(res)
except Exception, e:
    print e # uncommment for debugging
    print "0"
