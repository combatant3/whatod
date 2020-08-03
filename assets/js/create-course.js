var $ = jQuery;

let numComponents = 1;

$('#addGradeComponent').click(function() {
    var clone = $('.grade-component-row').clone()[0];
    $(clone).find('.input').val('');
    $(clone).find('#componentName')
        .attr('name', 'gradeComponents[' + numComponents + '][componentName]');
    $(clone).find('#gradePercentage')
        .attr('name', 'gradeComponents[' + numComponents + '][gradePercentage]');
    $('#component-table').append(clone);
    numComponents++;
});

$('#remove-last-component').click(function() {
    let row = $('#component-table .grade-component-row');
    if (row.last().index() > 1) {
        row.last().remove();
    }
    numComponents--;
});