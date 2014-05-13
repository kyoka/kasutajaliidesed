#!/usr/bin/python
import os
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'mydb.db'

print 'Content-type: text/html'
print
try: # Windows needs stdio set for binary mode.
    import msvcrt

    msvcrt.setmode(0, os.O_BINARY) # stdin  = 0
    msvcrt.setmode(1, os.O_BINARY) # stdout = 1
except ImportError:
    pass
try:
    form = cgi.FieldStorage()
    if (form.has_key('full_name')
        and form.has_key('email')
        and form.has_key('password')):
        file = form['photo'] if 'photo' in form else None
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
        # Test if the file was uploaded
        if file is not None and file.filename:
            # strip leading path from file name to avoid directory traversal attacks
            fn = os.path.basename(file.filename)
            open('img/' + fn, 'wb').write(file.file.read())
            query = 'insert into user_photo values (?, ?);'
            cur.execute(query, (id, fn))

        con.commit()
        f = open('index.html', 'r')
        html = f.read()
        f.close()
        html = html.replace('<!--$r-->', '<h4>Registration Successful</h4>')
        html = html.replace('window.location = "/home.html', 'window.location = "../home.html')
        print html
    else:
        print "System error!"

except Exception, e:
    #print e # uncommment for debugging
    print "0"
