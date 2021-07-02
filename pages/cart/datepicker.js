const createDatePicker = ({resultContainerSelector}) => {

  const data = {  //temporary, days count from 1, months count from 0
    'years': [
      {
        'value': 2020,
        'months': [
          {
            'value': 11,
            'days': [8, 9, 10, 11, 12, 13, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          }
        ]
      },
      {
        'value': 2021,
        'months': [
          {
            'value': 0,
            'days': [1, 2, 3, 4, 5, 7, 8, 9, 10]
          }
        ]
      }
    ]
  }

  const monthNames = new Map([[0, 'Январь'], [1, 'Февраль'], [2, 'Март'], [3, 'Апрель'], [4, 'Май'], [5, 'Июнь'], [6, 'Июль'], [7, 'Август'], [8, 'Сентябрь'], [9, 'Октябрь'], [10, 'Ноябрь'], [11, 'Декабрь']])
  const resultMonthNames = new Map([[0, 'января'], [1, 'февраля'], [2, 'марта'], [3, 'апреля'], [4, 'мая'], [5, 'июня'], [6, 'июля'], [7, 'августа'], [8, 'сентября'], [9, 'октября'], [10, 'ноября'], [11, 'декабря']])

  const datepicker = document.querySelector('.datepicker')
  const monthContainer = datepicker.querySelector('.datepicker__month')
  const prevArrow = datepicker.querySelector('.datepicker__arrow.prev')
  const nextArrow = datepicker.querySelector('.datepicker__arrow.next')
  const resultContainer = document.querySelector(resultContainerSelector)

  let pageNum = 0
  const pages = []
  const monthStrings = []

  const table = document.createElement('div')
  const dayElemDisabled = document.createElement('span')
  const dayElemActive = document.createElement('a')

  dayElemDisabled.classList.add('datepicker__day')
  dayElemActive.classList.add('datepicker__day')
  dayElemActive.classList.add('datepicker__day--active')
  table.classList.add('datepicker-table')
  table.classList.add('datepicker-table__days')

  /** make month string array */
  data.years.forEach(year => {
    year.months.forEach(month => {
      let monthString = monthNames.get(month.value)
      monthString += ' '
      monthString += year.value
      monthStrings.push(monthString)
    })
  })

  /** put result on screen */
  const setResult = (year, month, day) => {
    resultContainer.innerHTML = day + ' ' + resultMonthNames.get(month)

    console.log(`chosen date: ${day}.${month + 1}.${year}`) // change to data send
  }

  /** create pages with days */
  data.years.forEach((year) => {
    year.months.forEach((month) => {
      const clonedTable = table.cloneNode()
      const daysQuantity = 32 - new Date(year.value, month.value, 32).getDate()
      const emptyDays = (new Date(year.value, month.value, 1).getDay() || 7) - 1
      for (let i = 0; i < emptyDays; i++) {
        let emptyDay = dayElemDisabled.cloneNode()
        clonedTable.appendChild(emptyDay)
      }
      for (let i = 1; i <= daysQuantity; i++) {
        let clonedDay
        if (month.days.includes(i)) {
          clonedDay = dayElemActive.cloneNode()
          clonedDay.addEventListener('click', () => {
            setResult(year.value, month.value, i)
          })
        }
        else {
          clonedDay = dayElemDisabled.cloneNode()
        }
        clonedDay.innerHTML = i
        clonedTable.appendChild(clonedDay)
      }
      pages.push({
        'year': year.value,
        'month': month.value,
        'html': clonedTable
      })
    })
  });

  const getMonthFullString = (chosenPage) => monthNames.get(pages[chosenPage].month) + ' ' + pages[chosenPage].year
  
  const setActivePage = (tempNum) => {
    if(pages[tempNum]) {
      pageNum = tempNum
      pages.forEach(page => page.html.classList.remove('active'))
      monthContainer.innerHTML = getMonthFullString(pageNum)
      pages[pageNum].html.classList.add('active')
    }
    
  }

  /** first initialization */
  monthContainer.innerHTML = getMonthFullString(0)
  pages.forEach((page, j) => {
    if (j === 0) {
      page.html.classList.add('active')
    }
    datepicker.appendChild(page.html)
  })
  
  /** arrow actions */
  nextArrow.addEventListener('click', () => {
    const tempNum = pageNum + 1
    setActivePage(tempNum)
  })

  prevArrow.addEventListener('click', () => {
    const tempNum = pageNum - 1
    setActivePage(tempNum)
  })
}