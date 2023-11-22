var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
var data = "userDB";
var db;
var opened = false;
const EDIT_USER = "Edit user";
const NEW_USER = "New user";
const ADD_USER = "Add user";

/**
 * Create db
 */
function openCreateDb(onDbCompleted) {
  if (opened) {
    db.close();
    opened = false;
  }
  //We could changing version
  var req = indexedDB.open(database, DB_VERSION);

  //
}
