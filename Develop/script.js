let currentDay = moment().format('dddd, MMMM Do')
let currentDayEl = $('#currentDay').text(currentDay)
let timeBlocks = $('.timeblocks')
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

function createBlocks() {
    timeBlocks.empty()

    for(let i = 0; i < hours.length; i++) {
        let day = moment().startOf('day').add(hours[i], 'hours')
        let formattedDay = day.format('h A')
        let isBefore = day.isBefore(moment())

        let toDoInput = localStorage.getItem(`todo-${i}`) || ""
        timeBlocks.append('<div class="row"><p class="col-1 hour"> ' + formattedDay + '</p> <input type="text" id="input' + i + '" class="col-10 timeBlock" name="toDoInput" value="' + toDoInput + '"> <button data-to-do="' + i + '" class="col-1 saveBtn"><i class="far fa-save"></i></button> </div>')

        if(day.isSame(moment().startOf('hour'))) {
            $(`#input${i}`).css('background-color', 'orangered')
        } else if(isBefore) {
            $(`#input${i}`).css('background-color', 'lightgray')
        } else {
            $(`#input${i}`).css('background-color', 'springgreen')
        }
    }
}

createBlocks()

$(document).on('click', '.saveBtn', function () {
    let toDoNumber = $(this).attr('data-to-do')
    console.log(toDoNumber)

    let toDoInput = $('#input' + toDoNumber).val()
    console.log(toDoInput)

    localStorage.setItem(`todo-${toDoNumber}`, toDoInput)
    console.log(localStorage)
})

$('#clear').on('click', function () {
    localStorage.clear()
    createBlocks()
})

console.log(localStorage)
