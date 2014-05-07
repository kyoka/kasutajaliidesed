#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'mydb.db'

print 'Content-type: text/html'
print

try:
    form = cgi.FieldStorage()
    if (form.has_key('full_name')
        and form.has_key('email')
        and form.has_key('password')):
        bin_str = form['photo'].value if form.has_key('photo') else ''
        values = {
            'email': form['email'].value,
            'password': form['password'].value,
            'name': form['full_name'].value,
            'sex': form['sex'].value,
            'birthdate': form['birthdate'].value,
            'address': form['address'].value}
        query = "insert into user(%s) values (?,?,?,?,?,?)" % ','.join(values.keys())
        con = sqlite.connect(databasefile)
        cur = con.cursor()
        id = cur.execute(query, values.values()).lastrowid
        if bin_str != '':
            query = "insert into user_photo values (?,?)"
            cur.execute(query, [id, sqlite.Binary(bin_str)])
        con.commit()
        f = open('index.html', 'r')
        html = f.read()
        f.close()
        html = html.replace('<!--$r-->', '<h2>Registration Successful</h2>')
        print html
    else:
        print "System error!"

except Exception, e:
    #print e # uncommment for debugging
    print "0"
