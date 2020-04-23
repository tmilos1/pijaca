import { toJS } from "mobx"
import Validator from 'validatorjs'

class AbstractFormStore {

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

            this.form.meta.isValid = true
            for(let field in this.form.fields) {
                if (this.form.fields[field].invalid === true) {
                    this.form.meta.isValid = false
                }
            }
        }

        const fieldFails = () => {
            this.form.fields[fieldName].invalid = true
            this.form.fields[fieldName].error = fieldValidation.errors.first(fieldName)
            this.form.meta.isValid = false
        }

        fieldValidation.checkAsync(fieldPasses, fieldFails)
    }

}

export default AbstractFormStore
