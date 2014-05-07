--CREATE SQLITE DB--
data -> table books
id	isbn	title	author	pub_year	description	lang	cat	keywords	adder	date	




$sqlite3 data.db

drop table complaint;
create table complaint(
id integer primary key,
user_id integer,
title varchar(50),
tag varchar(50),
description TEXT,
time datetime default (DATETIME('NOW')));
insert into complaint(title,user_id, tag, description) values('Title 1',1, 'mytag', 'desc');

create table user(
id integer primary key,
name varchar(70),
sex varchar(6),
birthdate date,
address varchar(100),
is_admin integer default 1);

create table user_photo(
user_id integer primary key,
photo blob);

create table complaint_photo(
complaint_id integer,
photo blob);



insert into complaint(title,user_id, tag, description) values('Title 1',1, 'mytag', 'desc');
insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');
insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');
insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');

 ['id', 'full_name', 'sex', 'birthdate',
          'address', 'photo', 'is_admin']


create table books(id integer primary key, isbn integer(13), title varchar(50), author varchar(50), pub_year integer(4), description TEXT, lang varchar(2), cat varchar(20), keywords TEXT, adder varchar(15), date datetime default current_timestamp);
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('isbn', 'title', 'author', 'pub_year', 'description', 'lang', 'cat', 'keywords', 'admin');


insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780807036044', 'America and I', 'Joyce Antler', '1990', 'A collection of twentieth-century stories by Jewish women, featuring some of the best short story writers in American fiction. From Anzia Yezierska and Edna Ferber to Cynthia Ozick, Grace Paley, and Susan Fromberg Schaeffer, these writers reveal a rich, vital, and innovative tradition.', 'en', 'Humor', ' america, short stories', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780385090438', 'Black-eyed Susans', 'Mary Helen Washington', '1975', 'Alienation, conflicting relationships, and animosities are dealt with in fiction on being black and a woman in America.', 'en', 'Humor', 'short stories', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780434903702', 'Case studies in international marketing', 'Peter Doyle and Norman A. Hart', 1982', 'International marketing tutorials', 'en', 'Business', 'business, marketing', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780152049775', 'B is for Betsy', 'Carolyn Haywood', '1939', 'In this delightful story you will find out how Betsy learned to love school and how each day brought interesting new experiences and new friends into her life.--Christian Science Monitor', 'en', 'Business', 'business, school', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780415457712', 'Accounting and Empire', 'Chris Poullaos', '2009', 'This book has numerous objectives, including giving historical insight and focus on countries that provide contrasting and variant examples of the uptake of the \"British model\", and broadening the appeal of accounting history and professionalisation as a taught subject in university accounting departments.', 'en', 'Business', 'business, history', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780201619218', '3D games', 'Alan Watt and Fabio Policarpo', '2001', '3D games: real-time rendering and software technology', 'en', 'Computers', 'programming, computers, c++', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780763732387', 'A laboratory course in C++', ' Nell B. Dale', '2005', 'Updated with new lessons and exercises in each chapter, this lab manual teaches the syntax and semantics of C++ constructs in a flexible framework that is perfect for both closed lab settings and independent learning.', 'en', 'Computers', 'programming, computers, c++', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780132272674', 'Ajax', 'Edmond Woychowsky', '2007', 'Using Ajax, you can build Web applications with the sophistication and usability of traditional desktop applications and you can do it using standards and open source software. Now, for the first time, theres an easy, example-driven guide to Ajax for every Web and open source developer, regardless of experience.', 'en', 'Computers', 'programming, computers, ajax', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780130478917', 'Advanced JavaScript', 'Dan Livingston', '2003', 'description', 'en', 'Computers', 'programming, computers, javascript', 'admin');
insert into books(isbn, title, author, pub_year, description, lang, cat, keywords, adder) values('9780201064674', 'A Prolog primer', 'Jean B. Rogers', '1986', 'description', 'en', 'Computers', 'programming, computers, prolog', 'admin');



