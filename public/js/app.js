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
    $('#form-add').on('click', () => {
        const $container = $('#recipe-images');
        $('<input>').attr(
            {
                type: 'text',
                name: 'images[]'
            }
        ).addClass('form-control').appendTo($container);
    });
    $('#form-remove').on('click', () => {
        const $container = $('#recipe-images');
        const numOfFields = $container.children().length;
        if (numOfFields < 2) {
            return;
        } else {
            $($container.children().eq(numOfFields - 1)).remove();
        }
    });
});
