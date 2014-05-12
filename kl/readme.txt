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
email varchar(60),
password varchar(30),
sex varchar(6),
birthdate date,
address varchar(100),
is_admin integer default 0);

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
