// Format a day object to the Full Day, Month, Day number then set the text of the current day <p> to that variable
let currentDay = moment().format('dddd, MMMM Do')
let currentDayEl = $('#currentDay').text(currentDay)

let timeBlocks = $('.timeblocks')
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

function createBlocks() {
    // empty the timeblocks, when you clear local storage timeblocks div is empty
    timeBlocks.empty()

    // loop through the hours array and create a timeblock for each hour
    for(let i = 0; i < hours.length; i++) {
        // Create a base day object starting at the beginning of the day and add the hours array items, therfore creating the proper times (9am - 5pm)
        let day = moment().startOf('day').add(hours[i], 'hours')
        // Create a format for the day object (hour am/pm)
        let formattedDay = day.format('h A')
        let isBefore = day.isBefore(moment())

        // Get all the local storage items with the index each time the array loops
        let toDoInput = localStorage.getItem(`todo-${i}`) || ""
        // Create the timeblocks with unique ids and data-to-do
        timeBlocks.append('<div class="row"><p class="col-1 hour"> ' + formattedDay + '</p> <input type="text" id="input' + i + '" class="col-10 timeBlock" name="toDoInput" value="' + toDoInput + '"> <button data-to-do="' + i + '" class="col-1 saveBtn"><i class="far fa-save"></i></button> </div>')

        // Check if the day object = the current hour or is before or after the current hour and change the color accordingly each time a timeblock is created
        if(day.isSame(moment().startOf('hour'))) {
            $(`#input${i}`).css('background-color', 'orangered')
        } else if(isBefore) {
            $(`#input${i}`).css('background-color', 'lightgray')
        } else {
            $(`#input${i}`).css('background-color', 'springgreen')
        }
    }
}

// Call the creatBlocks function
createBlocks()

// Create onClick event on the save buttons in each timeblock
$(document).on('click', '.saveBtn', function () {
    // Get unique data-to-do value of each created button
    let toDoNumber = $(this).attr('data-to-do')
    // Get unique id of each created input and the value of
    let toDoInput = $('#input' + toDoNumber).val()
    // Set the input value to local storage with unique reference
    localStorage.setItem(`todo-${toDoNumber}`, toDoInput)
})

// Create onClick event for clear local storage button
$('#clear').on('click', function () {
    // Clear the local storage
    localStorage.clear()
    // Call function to create the fresh timeblocks
    createBlocks()
})
