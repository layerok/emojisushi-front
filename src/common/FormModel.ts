import { makeAutoObservable } from "mobx";
import { InputModel } from "~common/InputModel";

type ISubmitCallback<Fields = Record<string, InputModel>> = (
  data: Fields,
  done: (clearValues?: boolean) => void,
  error: (e: any) => void
) => void;

export class FormModel<
  Fields extends Record<string, InputModel> = Record<string, InputModel>
> {
  submitting = false;
  fields: Fields;
  onSubmit: ISubmitCallback<Fields>;
  constructor({
    fields,
    onSubmit,
  }: {
    fields: Fields;
    onSubmit: ISubmitCallback<Fields>;
  }) {
    makeAutoObservable(this);
    this.fields = fields;
    this.onSubmit = onSubmit;
  }

  setSubmitting(state: boolean) {
    this.submitting = state;
  }

  get asProps() {
    return {
      onSubmit: (e) => {
        e.preventDefault();
        this.submit();
      },
    };
  }

  submit() {
    if (this.submitting) {
      return;
    }
    this.setSubmitting(true);
    this.clearErrors();

    const done = (clearValues = false) => {
      if (clearValues) {
        this.clearValues();
      }
      this.setSubmitting(false);
    };

    const error = (e) => {
      const { errors } = e.response.data;
      if (errors) {
        this.fieldsAsArray.forEach((field) =>
          field.handleValidationError(errors)
        );
      }
      this.setSubmitting(false);
    };

    this.onSubmit(this.fields, done, error);
  }

  clearErrors() {
    this.fieldsAsArray.forEach((field) => field.resetError());
  }

  clearValues() {
    this.fieldsAsArray.forEach((field) => field.resetValue());
  }

  get asSubmitButtonProps() {
    return {
      loading: this.submitting,
    };
  }

  get fieldsAsArray() {
    return Object.keys(this.fields).map((key) => {
      return this.fields[key];
    });
  }

  get asJson(): {
    [Property in keyof Fields]: string;
  } {
    return this.fieldsAsArray.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.value,
      };
    }, {}) as {
      [Property in keyof Fields]: string;
    };
  }
}
