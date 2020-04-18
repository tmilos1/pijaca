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

        const fieldPasses = () => {
            this.form.fields[fieldName].invalid = false
            this.form.fields[fieldName].error = ''
        }

        const fieldFails = () => {
            this.form.fields[fieldName].invalid = true
            this.form.fields[fieldName].error = fieldValidation.errors.first(fieldName)
        }

        fieldValidation.checkAsync(fieldPasses, fieldFails)

        var fullValidation = new Validator(
            this.getFlattenedValues('value'),
            this.getFlattenedValues('rule')
        )

        const fullPasses = () => {
            this.form.meta.isValid = true
        }

        const fullFails = () => {
            this.form.meta.isValid = false
        }

        fullValidation.checkAsync(fullPasses, fullFails)
    }

}

export default AbstractFormStore
