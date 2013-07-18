(function(){

    var counter, doc, save;

    // Local Storage
    if(store.enabled) {
        console.log('localstorage available');

        counter = 1;

        save = $('nav #save');
        save.on('click', function(){
            doc = $('#note').val();
            console.log(doc);
            store.set(counter, doc);
            counter++;
        });

    } else {
        console.log('localstorage un-available');
    }


})();