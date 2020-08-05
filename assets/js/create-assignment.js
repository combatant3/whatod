var courses = $('#courses').val();
courses = $.parseJSON(courses);
var courseMap = {};
for (var i = 0; i < courses.length; i++) {
    courseMap[courses[i].id] = courses[i];
}

    $('#grade-component-select .component').remove();
    var courseId = parseInt($('#course-select').val());
    // Fill the dropdown
    if (courseId) {
        var gradeComponents = courseMap[courseId].gradeComponents;
        for (var i = 0; i < gradeComponents.length; i += 1) {
            $('#grade-component-select')
                .append('<option class="component" value='+gradeComponents[i].id+'>'+gradeComponents[i].componentName+'</option>');
        }
    }

$('#course-select').change(function() {
    $('#grade-component-select .component').remove();
    var courseId = parseInt($(this).val());
    // Fill the dropdown
    var gradeComponents = courseMap[courseId].gradeComponents;
    for (var i = 0; i < gradeComponents.length; i += 1) {
        $('#grade-component-select')
            .append('<option class="component" value='+gradeComponents[i].id+'>'+gradeComponents[i].componentName+'</option>');
    }
});

var assignmentCount = 1;

$('#js-add-assignment').click(function() {
    var clone = $('.js-assignment-input').first().clone();
    $(clone).find('.input').val('');
    $(clone).find('#js-assignment-title').attr('name', 'assignments['+assignmentCount+'][assignmentTitle]');
    $(clone).find('#js-due-date').attr('name', 'assignments['+assignmentCount+'][dueDate]');
    $('.js-assignment-input').last().after(clone);
    assignmentCount += 1;
});

$('#js-remove-assignment').click(function() {
    if (assignmentCount > 1) {
        $('.js-assignment-input').last().remove();
        assignmentCount -= 1;
    }
});