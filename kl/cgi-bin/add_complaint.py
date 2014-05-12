#!/usr/bin/python
import os
import cgi
import sqlite3 as sqlite

databasefile = 'mydb.db'

print 'Content-type: text/html'
print

try:
    form = cgi.FieldStorage()
    if (form.has_key('user')
        and form.has_key('title')
        and form.has_key('time')
        and form.has_key('tag')
        and form.has_key('description')
        and form.has_key('location')
    ):
        files = form['photo'] if 'photo' in form else None
        values = {
            'user_id': form['user'].value,
            'title': form['title'].value,
            'tag': form['tag'].value,
            'description': form['description'].value,
            'time': form['time'].value,
            'location': form['location'].value if form.has_key('location') else ''
        }
        # Test if the file was uploaded]
        query = ("insert into complaint(%s) values (?,?,?,?,?,?)" % ','.join(values.keys()))

        con = sqlite.connect(databasefile)
        cur = con.cursor()
        comp_id = cur.execute(query, values.values()).lastrowid

        if files is not None:
            if not isinstance(files, list):
                files = [files]
            for file in files:
                if file.filename:
                # strip leading path from file name to avoid directory traversal attacks
                    fn = os.path.basename(file.filename)
                    open('img/' + fn, 'wb').write(file.file.read())
                    query = 'insert into complaint_photo values (?, ?);'
                    cur.execute(query, (comp_id, fn))
        con.commit()
        f = open('newComp.html', 'r')
        html = f.read()
        f.close()
        html = html.replace('<!--$r-->', '<h4>New complaint successfully added</h4>')
        html = html.replace('window.location = "/home.html', 'window.location = "../home.html')
        print html
    else:
        print "0"

except Exception, e:
#print e # uncommment for debugging
    print "0"
