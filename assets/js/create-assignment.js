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
    var clone = $('.js-assignment-input').first().clone(true);
    $(clone).find('.input').val('');
    $(clone).find('#js-assignment-title').attr('name', 'assignments['+assignmentCount+'][assignmentTitle]');
    $(clone).find('#js-due-date').attr('name', 'assignments['+assignmentCount+'][dueDate]');
    $(clone).find('.js-course-is-recurring').attr('name', 'assignments['+assignmentCount+'][isRecurring]');
    let name = $(clone).find('.js-day-select-column .js-recurring-day').attr('name');
    $(clone).find('.js-day-select-column .js-recurring-day').attr('name', name.replace('[0]', '['+assignmentCount+']'));
    assignmentCount += 1;
    $('.js-assignment-input').last().after(clone);
});

$('#js-remove-assignment').click(function() {
    if (assignmentCount > 1) {
        $('.js-assignment-input').last().remove();
        assignmentCount -= 1;
    }
});

$('.js-course-is-recurring').change(function() {
    if (this.checked) {
        $(this).closest('.js-assignment-input').find('.js-due-date-column').addClass('hidden');
        $(this).closest('.js-assignment-input').find('.js-day-select-column').removeClass('hidden');
    } else {
        $(this).closest('.js-assignment-input').find('.js-due-date-column').removeClass('hidden');
        $(this).closest('.js-assignment-input').find('.js-day-select-column').addClass('hidden');
    }
});
