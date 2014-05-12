#!/usr/bin/python
import json
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'mydb.db'

print 'Content-type: text/plain'
print

try:
    form = cgi.FieldStorage()
    if (form.has_key('email')
        and form.has_key('password')):

        query = "select id from user where email='%s' and password ='%s'" \
                % (form['email'].value, form['password'].value)
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute(query)
        user_id = cur.fetchone()[0]
        if not user_id:
            print json.dumps({'error': 'Incorrect email or password'})
        else:
            print json.dumps({'id': user_id, 'email': form['email'].value})
    else:
        print json.dumps({'error': 'Fill both email and password fields'})


except Exception, e:
    #print e # uncommment for debugging
    print "0"
