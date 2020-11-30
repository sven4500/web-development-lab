var cells = [
  ["ФИО", ""],
  ["Курс, группа", ""],
  ["Адрес (по прописке или регистрации)", ""],
  ["Адрес фактического проживания (если отличен)", ""],
  ["Контактные телефоны", ""],
  ["Адрес электронной почты", ""],
  ["Дополнительные возможности передачи информации (телефон родителей, друга с указанием имени и отчества)", ""],
  ["Для работающих\nМесто работы с указанием адреса и телефона организации", ""],
  ["Рабочий телефон", ""],
  ["ФИО научного руководителя", ""]
];

function createDoc() {
  // Создаём файл.
  doc = DocumentApp.create("test_8");
  var body = doc.getBody();
  body.editAsText().setFontFamily("Times New Roman");
  body.editAsText().setFontSize(12);
  {
    var par = body.appendParagraph("Анкета дипломника\n");
    par.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    par.editAsText().setBold(0, 17, true);
    //par.editAsText().setBold(true);
  }
  {
    var table = body.appendTable(cells);
    for(var i = 0; i < table.getNumRows(); ++i) {
      var cell = table.getCell(i, 0);
      if(i == 7) {
        cell.editAsText().setBold(0, 13, true);
      }
      // Если строка нечётная, то меняем её цвет.
      if(i % 2 == 1) {
        for(var j = 0; j < table.getRow(i).getNumCells(); ++j) {
          cell = table.getCell(i, j);
          cell.setBackgroundColor("#DDDDDD");
        }
      }
    }
  }
}
