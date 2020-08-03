module.exports = {

    validateNewGradeComponent: async function(componentData) {
        let errors = [];

        if (!componentData.componentName) {
            errors.push('Please enter a title for the grade component.');
        }

        if (!componentData.gradePercentage) {
            errors.push('Please enter a grade percentage for the grade component.');
        }

        if (!componentData.course) {
            errors.push('Please select a course to assign this grade component to.');
        }

        return errors;
    }

};