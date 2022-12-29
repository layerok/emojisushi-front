import {ChangeEvent, FormEvent} from "react";
import {action, computed, makeObservable, observable, override} from "mobx";

type InputModelOptions = {
  value?: string;
  error?: string;
}

export class InputModel<N extends string = string> {
  error: string;
  name: N;
  value: any;
  constructor(name: N, options: InputModelOptions) {
    makeObservable(this, {
      error: observable,
      name: observable,
      value: observable,
      setError: action,
      handleValidationError: action,
      resetError: action,
      asProps: computed,
      resetValue: action,
    });
    const {
      error = ""
    } = options;

    this.error = error;
    this.name = name;
  }

  setError(error: string) {
    this.error = error;
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

  resetError() {
    this.setError('');
  }

  get asProps() {
    return {
      name: this.name,
      error: this.error
    }
  }

  resetValue() {
    this.value = null;
  }

}


export class TextInputModel<N extends string = string> extends InputModel {
  value: string;

  constructor(name: N, options: InputModelOptions & {
    value?: string;
  } = {}) {
    const {value = '', ...baseOptions} = options;
    super(name, baseOptions);
    this.value = value;
    makeObservable(this, {
      value: override,
      asProps: override,
      onChangeHandler: action,
      setValue: action,
      resetValue: override,
    })
  }

  onChangeHandler(e: FormEvent<HTMLInputElement>) {
    this.resetError();
    this.setValue((e.target as HTMLInputElement).value)
  }

  setValue(value: string) {
    this.value = value;
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

  resetValue() {
    this.setValue('')
  }
}

export class CheckboxInputModel<N extends string = string> extends InputModel {
  value: boolean;

  constructor(name: N, options: InputModelOptions & {
    value?: boolean;
  } = {}) {
    const {value = false, ...baseOptions} = options;
    super(name, baseOptions);
    this.value = value;
    makeObservable(this, {
      value: override,
      asProps: override,
      onChangeHandler: action,
      setChecked: action,
      resetValue: override,
      checked: computed,
    })
  }

  setChecked = (checked: boolean) => {
    this.value = checked;
  }

  onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    this.resetError();
    this.setChecked((e.target as HTMLInputElement).checked)
  }

  get asProps() {
    return {
      name: this.name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        this.onChangeHandler(e)
      },
      checked: this.checked,
      error: this.error
    }
  }

  resetValue() {
    this.value = false;
  }

  get checked() {
    return this.value;
  }
}
