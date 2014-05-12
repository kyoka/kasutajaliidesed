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
time datetime default (DATETIME('NOW')),
location varchar(100));


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



insert into complaint(title,user_id, tag, description, time, location) values('complaint #1',1, 'mytag',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat pellentesque purus non suscipit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque vehicula, velit non tempus hendrerit, ipsum massa dictum nulla, in laoreet risus odio eget lectus. Morbi id porta libero, et facilisis lacus. Aliquam congue at elit id semper. Mauris semper erat sem. Etiam lacinia pellentesque urna sit amet consectetur. Integer nunc est, condimentum ut leo sit amet, laoreet varius magna. Nam interdum risus eu augue consectetur faucibus. Suspendisse suscipit sit amet velit ac lobortis.');

insert into complaint(title,user_id, tag, description, time, location) values('complaint #2',1, 'junk',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat pellentesque purus non suscipit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque vehicula, velit non tempus hendrerit, ipsum massa dictum nulla, in laoreet risus odio eget lectus. Morbi id porta libero, et facilisis lacus. Aliquam congue at elit id semper. Mauris semper erat sem. Etiam lacinia pellentesque urna sit amet consectetur. Integer nunc est, condimentum ut leo sit amet, laoreet varius magna. Nam interdum risus eu augue consectetur faucibus. Suspendisse suscipit sit amet velit ac lobortis.');

insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');
insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');
insert into complaint(title, tag, description) values('Title 1', 'mytag', 'desc');
