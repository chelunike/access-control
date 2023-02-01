// Generate cards
const HEADER = ['ID', 'Timestamp', 'Name', 'Surname', 'Group'];
const LIST_SHEET = 'LIST'; // List to search
const ROW_COUNT = 400;


function createRegisterSheet() {
  var name = Utilities.formatDate(new Date(), "CEST", "dd-MM-yyyy");
  var created = false;
  while(!created) {
    try {
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);
      created = true;
    } catch (e) {
      name = 'a';
    }
  }
  
  var sheet = SpreadsheetApp.getActiveSheet();

  var i;
  // Insert header
  sheet.getRange(1, 1, 1, HEADER.length).setValues([HEADER]);

  // Create list
  for (i=2; i<ROW_COUNT; i++) {
    var array = [
      `=SI.ERROR(BUSCARV(A${i}; ${LIST_SHEET}!A2:A200; ${LIST_SHEET}!C1:C200); "")`,
      `=SI.ERROR(BUSCARV(A${i}; ${LIST_SHEET}!A2:A200; ${LIST_SHEET}!D1:D200); "")`,
      `=SI.ERROR(BUSCARV(A${i}; ${LIST_SHEET}!A2:A200; ${LIST_SHEET}!B1:B200); "")`
    ];

    var cell = sheet.getRange(i, 3, 1, array2.length);
    cell.setFormulas([array2]);
  }

}

function CHECKBOOK(cell, range) {
  var result = 'ERROR';
  if (Array.isArray(range)) {
    var n = 0;
    for (let i=0; i<range.length; i++) {
      if (range[i] == cell) {
        n++;
      }
    }
    return n%2 != 0? 'OUT': 'IN';
  }
  return result;
}


// Triggers

function onEdit() {
  var dateRegex = /(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}/;
  var s = SpreadsheetApp.getActiveSheet();
  
  if (s.getName().match(dateRegex)) {
    var r = s.getActiveCell();
    if (r.getValue() != '' && r.getColumn() <= 1) {
      var cell = r.offset(0,1);
      cell.setValue(Utilities.formatDate(new Date(), "CEST", "yyyy-MM-dd HH:mm:ss"));
    }
  }
  SpreadsheetApp.flush();
}

function onOpen() {
  // Load UI
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Access Control');
  
  menu.addItem('Generate Sheet', 'createRegisterSheet');
  menu.addItem('Generate Ids', 'generator');

  menu.addToUi();
}