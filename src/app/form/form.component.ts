import {Component, OnInit} from '@angular/core';

import {IMaskModule} from "angular-imask";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
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

  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  constructor(private httpClient: HttpClient) {

  }
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
  checkEmptyInput(input: HTMLInputElement, nameInput: string): string {
    let errorMessage = ''
    if (input.value == "") {
      return errorMessage = `Поле ${nameInput} не должно быть пустым`
    } else {
      return errorMessage;
    }
  }
  inputCheckEmail(): string {
    let inputEmail = document.getElementById("inputEmail") as HTMLInputElement;
    let regax =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (inputEmail.value == ""){
      return this.errorEmailMessage = "Поле Email не должно быть пустым";
    }
    if (!regax.test(inputEmail.value)) {
      return this.errorEmailMessage = "Некорректно введен Email"
    }
    return this.errorEmailMessage = "";
  }
  inputCheckPhone(): string {
    let inputPhone = document.getElementById("inputPhone") as HTMLInputElement;
    if (inputPhone.value.length < 18 && inputPhone.value.length >= 1) {
      return this.errorPhoneMessage = "Некорректно введен телефон"
    }
    this.errorPhoneMessage = this.checkEmptyInput(inputPhone, "Телефон")
    return this.errorPhoneMessage;
  }
  inputCheckName(): string {
    let inputName = document.getElementById("inputName") as HTMLInputElement;
    this.errorNameMessage = this.checkEmptyInput(inputName, "Имя")
    return this.errorNameMessage;
  }
  inputCheckText(): string {
    let inputText = document.getElementById("inputText") as HTMLInputElement;
    this.errorTextMessage = this.checkEmptyInput(inputText, "Сообщение")
    return this.errorTextMessage;
  }
  ngOnInit() {
    this.getThemes()
  }
}
