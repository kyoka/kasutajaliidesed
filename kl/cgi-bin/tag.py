#!/usr/bin/python
import cgi
import json
import sqlite3 as sqlite

databasefile = 'mydb.db'
import pydevd

pydevd.settrace('localhost', port=12345, stdoutToServer=True, stderrToServer=True, suspend=False)
print 'Content-type: text/plain'
print
try:
    form = cgi.FieldStorage()
    if form.has_key('cmd') and form['cmd'].value == 'add':
        query = "insert into tag values ('%s')" % form['tag'].value
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        try:
            cur.execute(query)
            con.commit()
            print 'OK'
        except Exception, e:
            print 'NOK'
    elif form.has_key('cmd') and form['cmd'].value == 'get':
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute('SELECT * FROM tag')
        res = {'data': cur.fetchall()}
        print json.dumps(res)
except Exception, e:
#print e # uncommment for debugging
    print "NOK"
