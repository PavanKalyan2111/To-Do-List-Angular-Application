import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ITask } from '../task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex !:any;
  isEditEnabled :boolean =false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  addtask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }
  deletetask(i: number){
    this.tasks.splice(i,1)
  }
  Inprogressdeletetask(i:number){
    this.inprogress.splice(i,1)
  }
  donedeletetask(i:number){
    this.done.splice(i,1)
  }

  onEdit(item:ITask, i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updatetask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
