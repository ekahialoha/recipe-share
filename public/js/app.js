$(() => {
    // =================
    // EVENT HANDLERS
    // =================
    // GLOBAL used in conjunction with authentication
    $('#logout-link').on('click', () => {
        $('#logout-form').submit();
    });

    // Used in view page in conjunction with authentication
    $('#delete-btn').on('click', () => {
        $('#delete-form').submit();
    });

    // Used on create and edit pages. Allows dynamic image fields to appear and disappear
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

    // Used on view page, will create carousel for recipes with multiple images
    let currentImage = 0;
    const $images = $('#images-block').children('img');
    const lastImage = $images.length - 1;
    $('#carousel-prev').on('click', () => {
        console.log('prev');
        // Hide current image
        $images.eq(currentImage).hide();

        // Determine previous image
        currentImage = currentImage > 0 ? currentImage - 1 : lastImage;

        // Show previous image
        $images.eq(currentImage).show();
    });
    $('#carousel-next').on('click', () => {
        console.log('next');
        // Hide current image
        $images.eq(currentImage).hide();

        // Determine next image
        currentImage = currentImage < lastImage ? currentImage + 1 : 0;

        // Show the next image
        $images.eq(currentImage).show();
    });
});
