<?php

class Note {

	private $noteDb;
	private $noteDate;
	private $noteText;

	function __construct($noteText = "", $noteDate = "", $f3) {
		$this->noteDb = NoteDB::getNoteDB($f3);
		$this->setNoteText($noteText);
		$this->setNoteDate($noteDate);
	}

	public function setNoteText($noteText) {
		$this->noteText = $noteText;
	}
	
	public function getNoteText() {
		return $this->noteText;
	}

	public function setNoteDate($noteDate) {
		$this->noteDate = $noteDate;
	}

	public function getNoteDate() {
		return $this->noteDate;
	}

	public function save() {
		$this->noteDb->noteText = $this->noteText;
		$this->noteDb->noteDate = $this->noteDate;
		$this->noteDb->save();
	}
}