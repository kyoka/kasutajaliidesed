#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite
from complaint import fields as complaint_fields
from user import fields as user_fields

databasefile = 'data.db'
fields = complaint_fields + user_fields

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
    if form.has_key('searchword'):
        query = ("select * from user join complaint "
                 "on user.full_name = complaint.user")
        if form.has_key('search_params'):
            where_clause = 'where 1=1 '
            for k, v in form['search_params'].iteritems():
                where_clause += ("and upper(%s) like upper('%%%s%%') "
                                 % (k, v))

        #query = "select * from books"
        #print query
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute(query)

        # --- otsingutulemuste votmine --- by Tammet --- edited
        res = []
        while 1:
            row = cur.fetchone()
            if not row:
                break
            res = res + [row]

        # --- otsingutulemuste vormistamine --- by Tammet --- edited

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
  