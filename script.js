const input = document.getElementById('input');
const add = document.getElementById('add');
const remove = document.getElementById('remove');
const list = document.getElementById('list');
const edit = document.getElementById('edit')
const lastModify = document.getElementById('last-modify');

// add a to-do item
add.addEventListener('click', () => {
    let inputValue = input.value;
    
    if (inputValue === "") {
        input.style.background = "red";
    } else {
        input.style.background = "white";
    }

    let newOption = new Option(inputValue, inputValue);
    list.insertBefore(newOption, list.firstElementChild);

    for (let i = 0; i < list.options.length; i++) {
        list.options[i].text = `${i + 1}. ${list.options[i].value}`;
    }
    input.value = "";
    modify();
    input.addEventListener('input', () => {
        input.style.background = "white";
    });
});


// delete to-do item
remove.addEventListener('click', (e) => {
    e.preventDefault();
    let selectedItem = [];
    for(let i = 0; i < list.options.length; i++){
        selectedItem[i] = list.options[i].selected;
    };
    let index = list.options.length;
    while(index--){
        if(selectedItem[index]){
            list.remove(index);
        }
    }
    for (let i = 0; i < list.options.length; i++) {
        list.options[i].text = `${i + 1}. ${list.options[i].value}`;
    }
    modify();
    updateOptionIndices();
});


// Edit to-do item
edit.addEventListener('click', () => {
    let selectedIndex = list.selectedIndex;

    if (selectedIndex === -1) {
        alert("Please select an item to edit.");
        return;
    }

    let newValue = input.value.trim();
    
    if (newValue === "") {
        input.style.background = "red";
        return;
    } else {
        input.style.background = "white";
    }

    // Update the selected option's value and text
    let optionToEdit = list.options[selectedIndex];
    optionToEdit.value = newValue;
    optionToEdit.text = `${selectedIndex + 1}. ${newValue}`;

    // Update indices for consistency
    modify();
    updateOptionIndices();
    input.value = "";
});

function updateOptionIndices() {
    for (let i = 0; i < list.options.length; i++) {
        list.options[i].text = `${i + 1}. ${list.options[i].value}`;
    }
};

// tracking last modifying time
function getCurrentDate(){
    let now = new Date();
    return now.toLocaleString();
}

function modify(){
    lastModify.textContent = `Last Modified: ${getCurrentDate()}`
}