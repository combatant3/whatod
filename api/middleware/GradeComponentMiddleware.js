module.exports = {

    validateNewGradeComponent: async function(componentData) {
        let errors = [];

        if (!componentData.componentName) {
            errors.push('Please enter a category name for the grade component.');
        }

        if (!componentData.gradePercentage) {
            errors.push('Please enter a grade percentage for the grade component.');
        }

        if (componentData.gradePercentage < 1) {
            errors.push('The percentage for your grading categories must be greater than 0.')
        }

        if (componentData.gradePercentage > 100) {
            errors.push('The percentage for your grading categories must not exceed 100.');
        }

        return errors;
    }

};