function generateUsersOptionsFragment(users){
    var fragment = document.createDocumentFragment();

    $.each(users, function () {
        $("<option />").val(this.Id).text(this.Username).appendTo(fragment);
    });

    return fragment;
}

function generatePrioritiesOptionsFragment(priorities){
    var fragment = document.createDocumentFragment();

    $.each(priorities, function () {
        $("<option />").val(this.Id).text(this.Name).appendTo(fragment);
    });

    return fragment;
}

function setSelectedOption(selectedOptionValue, selectElement){
    if(selectedOptionValue && selectElement){
        selectElement.value = selectedOptionValue;
    }else{
        console.log('Selected option or the select element is undefined!');
    }
}



