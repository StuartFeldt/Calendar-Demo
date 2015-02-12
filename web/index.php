<?php

$f3 = require('../lib/base.php');
$f3->set('AUTOLOAD','../app/');
$f3->config('../config.ini');

error_reporting(E_ALL);
ini_set("display_errors", 1);

/*
 *  Main Route
 */
$f3->route('GET /',
    function($f3) {
        $view = new View;
        echo $view->render('calendar.htm');
    }
);

/*
 *  Create Note Endpoint
 */
$f3->route('POST /note/create',
    function($f3) {
        $note = new Note($f3->get('POST.noteText'), $f3->get('POST.noteDate'), $f3);
        $note->save();
        echo "Saved";
    }
);

/*
 *  Get Notes By Date Endpoint
 */
$f3->route('POST /notes/@noteDate',
    function($f3) {
        print json_encode(NoteDB::getDB($f3)->exec("select * from notes where noteDate='".$f3->get('PARAMS.noteDate')."'"));
    }
);

/*
 *  Delete Note Endpoint
 */
$f3->route('POST /note/delete',
    function($f3) {
        $noteDb = NoteDB::getNoteDB($f3);
        $noteDb->load(array("noteID=?", intval($f3->get('POST.noteId'))));
        $noteDb->erase();
    }
);

$f3->run();