const createDatePicker = ({ datePickerContainerSelector, openButtonSelector, data }) => {
  const currentDate = new Date()
  let chosenMonth = currentDate.getUTCMonth()
  let chosenYear = currentDate.getUTCFullYear()

  const getDaysCount = (year, month) => 32 - new Date(year, month, 32).getDate()

  const getPrevMonth = () => {
    chosenMonth -= 1
    if (chosenMonth < 0) {
      chosenMonth = 11
      chosenYear -= 1
    }
  }

  const getNextMonth = () => {
    chosenMonth += 1
    if (chosenMonth > 11) {
      chosenMonth = 0
      chosenYear += 1
    }
  }

  const buildDatePicker = () => {
    const field = document.createElement('div')
    const month = document.createElement('p')
    const arrowsWrap = document.createElement('div')
    field.classList.add('datepicker')
    
  }
}