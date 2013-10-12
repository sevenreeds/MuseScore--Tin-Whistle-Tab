//=============================================================================
//  MuseScore
//  Linux Music Score Editor
//  $Id:$
//
//  Tin Whistle Tab plugin
//
//  Copyright (C)2011 Dean Karres, Dario Escobedo, Werner Schweer and others
//  This is a variation of Werner Schweera's very famous recorder_fingering
//  plugin using Blayne Chastain's "Tin Whistle Tab" font located at: 
//  http://blaynechastain.com/files/for-ye/tin-whistle-tab-font.zip. 
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================

//
// This is ECMAScript code (ECMA-262 aka "Java Script")
//

//
// Fingering "tone" to font glyph translation table.  I am not a ont designeri
// but I know that ASCII has 256 characters available and this font uses less
// than 30.  Why did they have to go into the extended characters for the
// highest note?
//
var fingerings = new Array();
fingerings["62"] = "d";
fingerings["63"] = "i";
fingerings["64"] = "e";
fingerings["65"] = "j";
fingerings["66"] = "f";
fingerings["67"] = "g";
fingerings["68"] = "h";
fingerings["69"] = "a";
fingerings["70"] = "n";
fingerings["71"] = "b";
fingerings["72"] = "m";
fingerings["73"] = "c";
fingerings["74"] = "D";
fingerings["75"] = "I";
fingerings["76"] = "E";
fingerings["77"] = "J";
fingerings["78"] = "F";
fingerings["79"] = "G";
fingerings["80"] = "H";
fingerings["81"] = "A";
fingerings["82"] = "N";
fingerings["83"] = "B";
fingerings["84"] = "M";
fingerings["85"] = "C";
fingerings["86"] = '\u00CE';

//---------------------------------------------------------
//    init
//    this function will be called on startup of mscore
//---------------------------------------------------------

function init() {
	// print("test script init");
}

//-------------------------------------------------------------------
//    run
//    this function will be called when activating the
//    plugin menu entry
//
//    global Variables:
//    pluginPath - contains the plugin path; file separator is "/"
//-------------------------------------------------------------------

function run() {
	// no score open (MuseScore 2.0+, can't happen earlier)
	if (typeof curScore === 'undefined')
		return;
      
	var cursor   = new Cursor(curScore);
	var font;
	var text;

	cursor.staff = 0;
	cursor.voice = 0;
	cursor.rewind();  // set cursor to first chord/rest

	font = new QFont("Tin Whistle", 60);

	while (!cursor.eos()) {
		if (cursor.isChord()) {
			var pitch = cursor.chord().topNote().pitch;
			if (pitch >= 62 && pitch <= 86){ 
				text = new Text(curScore);
				text.text = fingerings[pitch];
				text.defaultFont = font;
				text.yOffset = 6;
				cursor.putStaffText(text);
			}
		}
		cursor.next();
	}
}

//---------------------------------------------------------
//    menu:  defines were the function will be placed
//		in the MuseScore menu structure
//---------------------------------------------------------

var mscorePlugin = {
	menu: 'Plugins.Tin Whistle Tablature',
	init: init,
	run:  run
};

mscorePlugin;

