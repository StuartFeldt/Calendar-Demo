<?php

require("../params.php");

class NoteDB {

	public static function getNoteDB() {
	 	return new DB\SQL\Mapper(NoteDB::getDB(),'notes');
	}

	public static function getDB() {
		return new DB\SQL($host,$user,$pass);
	}
}