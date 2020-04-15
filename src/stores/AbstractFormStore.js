import { toJS } from "mobx"
import Validator from 'validatorjs'

class AbstractFormStore {

    getFlattenedValues = (valueKey = 'value') => {
        let data = {};
        let form = toJS(this.form).fields;
        Object.keys(form).map(key => {
            data[key] = form[key][valueKey]
        });
        return data
    }

    onFieldChange = (field) => {
        const fieldName = field.target.name
        const fieldValue = field.target.value
        this.form.fields[fieldName].value = fieldValue

        const fieldValidation = new Validator(
            { [fieldName]: fieldValue },
            { [fieldName]: this.form.fields[fieldName].rule }
        )

        this.form.fields[fieldName].touched = true
        this.form.fields[fieldName].invalid = !fieldValidation.passes()
        this.form.fields[fieldName].error = fieldValidation.errors.first(fieldName)

        var validation = new Validator(
            this.getFlattenedValues('value'),
            this.getFlattenedValues('rule')
        )

        this.form.meta.isValid = validation.passes()
    }

}

export default AbstractFormStore