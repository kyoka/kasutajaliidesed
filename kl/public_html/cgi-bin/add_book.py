#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite

databasefile = 'data.db'

print 'Content-type: text/plain'
print

try:
    form = cgi.FieldStorage()
    if form.has_key('adder') and form.has_key('author') and form.has_key('title'):
        isbn = ""
        pub_year = ""
        lang = ""
        cat = ""
        description = ""
        keywords = ""

        if form.has_key('isbn'):
            isbn = form['isbn'].value
        if form.has_key('pub_year'):
            pub_year = form['pub_year'].value
        if form.has_key('lang'):
            lang = form['lang'].value
        if form.has_key('cat'):
            cat = form['cat'].value
        if form.has_key('description'):
            description = form['description'].value
        if form.has_key('keywords'):
            keywords = form['keywords'].value

        query = "insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('%(isbn)s', '%(title)s', '%(author)s', '%(pub_year)s', '%(description)s', '%(lang)s', '%(cat)s', '%(keywords)s', '%(adder)s')" % \
                {"isbn": isbn, "title": form['title'].value, "author": form['author'].value, "pub_year": pub_year,
                 "description": description, "lang": lang, "cat": cat, "keywords": keywords,
                 "adder": form['adder'].value}

        con = sqlite.connect(databasefile)
        cur = con.cursor()
        cur.execute(query)
        con.commit()
        print "1"
    else:
        print "0"

except Exception, e:
    #print e # uncommment for debugging
    print "0"
  