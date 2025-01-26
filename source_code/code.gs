const NUTRITION="Sheet1";
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NUTRITION);
const doPost = (request={})=>{
  const { postData : {contents, type}={}}=request;
  var data= parseFormData(contents);
  appendToGoogleSheet(data);
  return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.JSON)
};
function parseFormData(postData){
 var data = []
 var parameters = postData.split('&');
 for (var i=0;i<parameters.length;i++){
  var keyvalue=parameters[i].split('=');
  data[keyvalue[0]] = decodeURIComponent(keyvalue[1]);
 }
 return data;


 }
 function appendToGoogleSheet(data){
  var headers =sheet.getRange(1,1,1,sheet.getLastColumn()).getValue()[0];
  var roeData = headers.map(headerFld => data[headerFld]);
  sheet.appendRow(roeData);
 }
