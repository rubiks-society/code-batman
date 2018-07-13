import { Component, OnInit,ViewChild, AfterViewInit  } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

declare let ace: any;
import "brace/mode/python";
import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/index";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/crimson_editor";
import "brace/theme/dawn";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/iplastic";
import "brace/theme/solarized_light";
import "brace/theme/textmate";
import "brace/theme/tomorrow";
import "brace/theme/xcode";
import "brace/theme/kuroir";
import "brace/theme/katzenmilch";
import "brace/theme/sqlserver";
import "brace/theme/ambiance";
import "brace/theme/chaos";
import "brace/theme/clouds_midnight";
// import "brace/theme/dracula";
import "brace/theme/cobalt";
import "brace/theme/idle_fingers";
import "brace/theme/kr_theme";
import "brace/theme/merbivore";
import "brace/theme/merbivore_soft";
import "brace/theme/mono_industrial";
import "brace/theme/monokai";
import "brace/theme/pastel_on_dark";
import "brace/theme/solarized_dark";
import "brace/theme/terminal";
import "brace/theme/tomorrow_night_blue";
import "brace/theme/tomorrow_night_bright";
import "brace/theme/tomorrow_night_eighties";
import "brace/theme/twilight";
import "brace/theme/vibrant_ink";

// import 'brace/mode/java';


@Component({
  selector: 'app-smarteditor',
  templateUrl: './smarteditor.component.html',
  styleUrls: ['./smarteditor.component.scss']
})
export class SmarteditorComponent implements AfterViewInit {
  content4 = '<strong>Hi</strong>';
  content1= '#include<stdio.h> \nvoid main(){ \n\tprintf("hello");\n\t}';
  content2= 'class A{ \n\tpublic static void main(String s[]){ \n\t\tprint("hello");\n\t\t} \n}';
  content3= 'print("hello)';
  content5=  '<!--html--> \n<strong>Hi</strong> \n \n//c-programming\n #include<stdio.h> \nvoid main(){ \n\tprintf("hello");\n\t} \n \n//java\nclass A{ \n\tpublic static void main(String s[]){ \n\t\tSystem.out.print("hello");\n\t\t} \n} \n\n #python\n\nprint("hello)'
   value;
   category:any;
  content=this.content5;

  @ViewChild('firstEditor') firstEditor;

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    this.firstEditor.getEditor().session.setOption('useWorker', true);
  }

onThemeChange(searchValue : string ) {  
 this.firstEditor.setTheme(searchValue);
console.log(searchValue);
}

onLanguageChange(searchValue : string ) { 
this.firstEditor.setMode(searchValue);
// //not working yet need a solution
// if(searchValue=="c_cpp")
// console.log("true");
// this.firstEditor.setValue(this.content1);
// this.cotent="dfsdfsdafcf sf"
// if(searchValue=="java")
// this.cotent=this.content2;
// if(searchValue=="python")
// this.cotent=this.content3;
// if(searchValue=="html")
// this.cotent=this.content4;


console.log(searchValue);
}

}
