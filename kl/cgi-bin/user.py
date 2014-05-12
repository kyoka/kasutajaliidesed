#!/usr/bin/python
import json
import sys
import cgi
import sqlite3 as sqlite
import itertools

databasefile = 'mydb.db'
fields = ['id', 'full_name', 'sex', 'birthdate',
          'address', 'photo', 'is_admin', 'email', 'password']

print 'Content-type: text/plain'
print

# TODO POISK VSEH UZEROV
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
    if form.has_key('cmd'):
        if form['cmd'].value == 'profile' and form.has_key('id'):
            query = "select * from user u left join user_photo up on u.id=up.user_id " \
                    "where u.id = " + form['id'].value
            con = sqlite.connect(databasefile)
            con.row_factory = sqlite.Row
            con.text_factory = str

            cur = con.cursor()
            cur.execute(query)
            user = cur.fetchone()
            res = {'data': dict(itertools.izip(user.keys(), user))}
            print json.dumps(res)
    else:
        print "0"

except Exception, e:
    print e  # uncommment for debugging
    print "0"
