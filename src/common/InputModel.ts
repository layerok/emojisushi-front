import {makeAutoObservable} from "mobx";
import {FormEvent} from "react";

type InputModelOptions = {
  value?: string;
  error?: string;
  name: string;
}

export class InputModel {
  value: string;
  error: string;
  name: string;
  constructor(options: InputModelOptions) {
    makeAutoObservable(this);
    const {
      name,
      value = "",
      error = ""
    } = options;

    this.value = value;
    this.error = error;
    this.name = name;
  }

  setError(error: string) {
    this.error = error;
  }

  setValue(value: string) {
    this.value = value;
  }

  onChangeHandler(e: FormEvent<HTMLInputElement>) {
    this.clearError();
    this.setValue((e.target as HTMLInputElement).value)
  }

  handleValidationError(errors: {
    [key: string]: [string]
  }[]) {
    Object.keys(errors).forEach((key) => {
      if(key === this.name) {
        this.setError(errors[key][0]);
      }
    })
  }

  get asProps() {
    return {
      name: this.name,
      onChange: (e: FormEvent<HTMLInputElement>) => {
        this.onChangeHandler(e)
      },
      value: this.value,
      error: this.error
    }
  }

  clearError() {
    this.setError('');
  }

  clearValue() {
    this.setValue('')
  }
}
