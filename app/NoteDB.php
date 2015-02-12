<?php

class NoteDB {

	public static function getNoteDB($f3) {
	 	return new DB\SQL\Mapper(NoteDB::getDB($f3),'notes');
	}

	public static function getDB($f3) {
		return new DB\SQL($f3->get('db.host'),$f3->get('db.user'),$f3->get('db.pass'));
	}
}