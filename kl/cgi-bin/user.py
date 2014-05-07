#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'data.db'
fields = ['id', 'full_name', 'sex', 'birthdate',
          'address', 'photo', 'is_admin']

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
    if form.has_key('id'):
        query = "select * from user where id = " + form['id'].value
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute(query)

        res = []
        while 1:
            row = cur.fetchone()
            if not row:
                break
            res = res + [row]

        l = len(res)
        i = 0

        print "["
        for row in res:
            print "{",
            counter = 0
            for data in row[0:-1]:
                print "\"" + fields[counter] + "\":", jsonstr(data),
                counter = counter + 1
                print ",",
            print "\"" + fields[counter] + "\":", jsonstr(data),
            print "}",
            if i < l - 1:
                print ","
            i = i + 1

        print
        print "]"
    else:
        print "0"

except Exception, e:
    print e # uncommment for debugging
    print "0"
