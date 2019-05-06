$(() => {
    // =================
    // EVENT HANDLERS
    // =================
    $('#logout-link').on('click', () => {
        $('#logout-form').submit();
    });
    $('#delete-btn').on('click', () => {
        $('#delete-form').submit();
    });
});
