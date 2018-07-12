import { Component, OnInit,ViewChild, AfterViewInit  } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

declare let ace: any;
import "brace/mode/python";
import "brace/index";

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
  public var value;
  public var category:any;
  public var language:"html";

  @ViewChild('firstEditor') firstEditor;

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    this.firstEditor.getEditor().session.setOption('useWorker', true);
  }

onThemeChange(searchValue : string ) {  
 this.firstEditor.setTheme("Chrome");
console.log(searchValue);
}

onLanguageChange(searchValue : string ) { 
this.firstEditor.setMode(searchValue);
console.log(searchValue);
}

}
