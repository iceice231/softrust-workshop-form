import {Component, OnInit} from '@angular/core';

import {IMaskModule} from "angular-imask";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, FormBuilder, FormControl, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {HttpClient, HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    IMaskModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  constructor(private httpClient: HttpClient) {

  }

  appealForm = new FormGroup({
    nameUser: new FormControl(""),
    emailUser: new FormControl(""),
    phoneUser: new FormControl(""),
    textUser: new FormControl(""),
  })

  errorEmailMessage: string = "";
  errorPhoneMessage: string = "";
  errorNameMessage: string = "";
  errorTextMessage: string = "";

  response: any;
  getThemes() {
    this.httpClient.get("../../assets/themes.json")
      .subscribe((response) => {
        this.response = response;
      })
  }
  checkEmptyInput(inputValue:string, nameInput: string): string {
    let errorMessage = ''
    if (inputValue.valueOf() == "") {
      return errorMessage = `Поле ${nameInput} не должно быть пустым`
    } else {
      return errorMessage;
    }
  }
  inputCheckEmail(): string {
    let regax =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (this.appealForm.get("emailUser")?.value == ""){
      return this.errorEmailMessage = "Поле Email не должно быть пустым";
    }
    if (!regax.test(<string>this.appealForm.get("emailUser")?.value)) {
      return this.errorEmailMessage = "Некорректно введен Email"
    }
    return this.errorEmailMessage = "";
  }
  inputCheckPhone(): string {
    // @ts-ignore
    if (this.appealForm.get("phoneUser")?.value?.length < 10 && this.appealForm.get("phoneUser")?.value?.length >= 1) {
      return this.errorPhoneMessage = "Некорректно введен телефон"
    }
    this.errorPhoneMessage = this.checkEmptyInput(<string>this.appealForm.get("phoneUser")?.value, "Телефон")
    return this.errorPhoneMessage;
  }
  inputCheckName(): string {
    this.errorNameMessage = this.checkEmptyInput(<string>this.appealForm.get("nameUser")?.value, "Имя")
    return this.errorNameMessage;
  }
  inputCheckText(): string {
    this.errorTextMessage = this.checkEmptyInput(<string>this.appealForm.get("textUser")?.value, "Сообщение")
    return this.errorTextMessage;
  }

  validationForm() {
    this.inputCheckName();
    this.inputCheckPhone();
    this.inputCheckEmail();
    this.inputCheckText();
  }
  ngOnInit() {
    this.getThemes()
  }
}
