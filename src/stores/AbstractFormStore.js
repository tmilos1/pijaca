// import { toJS } from "mobx"
import Validator from 'validatorjs'

class AbstractFormStore {

    getFields(fieldName, key) {
        let data = {}
        // const keys = Object.keys(this.form.fields)

        for (const field in this.form.fields) {
            // remove other already validated
            if (field !== fieldName && this.form.fields[field].validated) {
                continue
            }
            data[field] = this.form.fields[field][key]
        }

        return data
    }

    onFieldChange = (field) => {
        const fieldName = field.target.name
        const fieldValue = field.target.value
        this.form.fields[fieldName].value = fieldValue
        this.form.fields[fieldName].touched = true
        this.form.fields[fieldName].validated = false

        const fieldValues = this.getFields(fieldName, 'value')
        const rules = this.getFields(fieldName, 'rule')

        const validation = new Validator(
            fieldValues, rules
        )
        
        const passes = () => {
            for (const field in this.form.fields) {
                if (this.form.fields[field].touched === false) {
                    continue;
                }
                    
                this.form.fields[field].invalid = false
                this.form.fields[field].error = ""
            }
            this.form.meta.isValid = true
        }

        const fails = () => {
            for (const field in this.form.fields) {
                if (this.form.fields[field].touched === false) {
                    continue;
                }
                    
                if (validation.errors.get(field).length > 0) {
                    this.form.fields[field].invalid = true
                    this.form.fields[field].error = validation.errors.get(field)
                } else {
                    this.form.fields[field].invalid = false
                    this.form.fields[field].validated = true
                    this.form.fields[field].error = ""
                }
            }
            this.form.meta.isValid = false
        }

        validation.checkAsync(passes, fails)
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
          event.preventDefault()
        }
    }

    onFocus(event) {
        event.target.select()
    }
}

export default AbstractFormStore
