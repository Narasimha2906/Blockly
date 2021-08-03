$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

const date = new Date( );  // 2009-11-10
let month = date.toLocaleString('default', { month: 'long' });
let datenum = date.getDate();    
let year = date.getFullYear(); 
let hrs = date.getHours();
let min = date.getMinutes();
min<9 ? min='0'+min : min;

Blockly.Blocks['bot'] = {
  init: function() {
    this.appendStatementInput("Bot")
        .setCheck(null)
        .appendField("Drop a Question");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['question'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["What is the date Today?","DATE"], ["What is the time now?","TIME"], ["How are you?","HOW"],["what is JavaScript?","JAVASCRIPT"],["What is your name?","NAME"]]), "Questions");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bot');
  // TODO: Assemble JavaScript into code variable.
  
  var code = `
  var value = "${statements_bot}"`;
  return code;
};

Blockly.JavaScript['question'] = function(block) {
  var dropdown_questions = block.getFieldValue('Questions');
  // TODO: Assemble JavaScript into code variable.
 
  /*var code = `
  var value = "${dropdown_questions}"`;*/
  var code = dropdown_questions;
  
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});



function redrawUi(value) {
  if(value === "  DATE"){    
    $("#inputBox").text(datenum + ' ' + month + ' ' + year);
  }
  else if(value === "  TIME"){    
    $("#inputBox").text(hrs + ':' + min);
  }
  else if(value === "  HOW"){
    $("#inputBox").text("I'm good. How are you? ");
  }
  else if(value === "  JAVASCRIPT"){
    $("#inputBox").text('JavaScript is a scripting or programming language that allows you to implement complex features on web pages.')
  }
  else if(value === "  NAME"){
    $("#inputBox").text("Narasimha Prasad");
  } 
  
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi(value);
  //console.log(value);
}

function reset() {
  location.reload();  
}


