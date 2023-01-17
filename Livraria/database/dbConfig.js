import sqlite from 'sqlite3';

export const db = new sqlite.Database('./banco.sqlite');

async function createTable() {
    try {
        db.serialize(() => {
            db.run("create table if not exists book (id integer primary key AUTOINCREMENT, title text not null, release_date text not null, id_editor integer not null, foreign key (id_editor) references editor(id))");
            db.run("create table if not exists editor (id integer primary key AUTOINCREMENT, name text not null, id_book integer not null, foreign key (id_book) references book(id))");
            db.run("create table if not exists author (id integer primary key AUTOINCREMENT, fullname text not null)");
            db.run("create table if not exists book_author (id integer primary key AUTOINCREMENT, id_book integer not null, id_author integer not null, foreign key (id_book) references book(id), foreign key (id_author) references author(id))");
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

createTable();
