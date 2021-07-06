document.addEventListener('DOMContentLoaded', () => {

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
  };

  (postcardAction = () => {
    const postcard = document.querySelector('.cart-main-postcard')
    const tabs = postcard.querySelectorAll('.cart-main-postcard__tab')
    const accordion = postcard.querySelector('.cart-main-postcard__accordion')
    const textarea = postcard.querySelector('.cart-main-postcard-own-editor__textarea')
    const symbolsLeft = postcard.querySelector('.cart-main-postcard-own__left span')
    const maxTextareaHeight = 108
    const saveText = postcard.querySelector('#save_wish')
    const editText = postcard.querySelector('.cart-main-postcard-own-editor__change')
    const addOwnToOrder = postcard.querySelector('#add_own_to_order')
    const addPreparedToOrder = postcard.querySelector('#add_prepared_to_order')
    const switchTabButtons = postcard.querySelectorAll('.switch_tab')
    const postcardItem = document.querySelector('.cart-main-goods-item.postcard')
    const deletePostcard = postcardItem.querySelector('.cart-main-goods-item__delete_postcard')

    accordion.addEventListener('click', () => {
      if (postcard.classList.contains('active')) {
        postcard.classList.remove('active')
        postcard.style.maxHeight = null
        return
      }
      postcard.style.maxHeight = postcard.scrollHeight + 'px'
      postcard.classList.add('active')

      const int = setInterval(() => {
        postcard.scrollIntoView({
          block: 'end',
          behavior: 'smooth'
        })
      }, 10)

      setTimeout(() => {
        clearInterval(int)
      }, 300)
    })

    const editPostcard = () => {
      textarea.style.height = textarea.scrollHeight > maxTextareaHeight ? maxTextareaHeight + 'px' : textarea.scrollHeight + 'px'
      if (textarea.scrollHeight > maxTextareaHeight || textarea.value.length > 100) {
        textarea.value = textarea.value.slice(0, 100)
      }
      symbolsLeft.innerHTML = 100 - textarea.value.length
    }

    textarea.addEventListener('keydown', editPostcard)
    textarea.addEventListener('keyup', editPostcard)

    saveText.addEventListener('click', () => {
      addOwnToOrder.disabled = false
      textarea.disabled = true
      editText.classList.add('active')
      saveText.disabled = true
    })

    editText.addEventListener('click', () => {
      textarea.disabled = false
      addOwnToOrder.disabled = true
      textarea.focus()
      editText.classList.remove('active')
      saveText.disabled = false
    })

    new Swiper('.cart-main-postcard-prepared-slider', {
      navigation: {
        nextEl: '.cart-main-postcard-prepared-slider__button.next',
        prevEl: '.cart-main-postcard-prepared-slider__button.prev'
      },
      loop: true
    })

    const switchTabs = () => {
      tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
          tab.classList.remove('fade')
          setTimeout(() => {
            tab.classList.remove('active')
          }, 150)
          return
        }

        setTimeout(() => {
          tab.classList.add('active')
          setTimeout(() => {
            tab.classList.add('fade')
          }, 0)
          postcard.style.maxHeight = postcard.scrollHeight + 'px'
          textarea.focus()
        }, 150)
      })
    }

    deletePostcard.addEventListener('click', () => {
      postcardItem.classList.remove('open')
      postcard.classList.remove('close')
    })

    const addToOrder = () => {
      postcardItem.classList.add('open')
      postcard.classList.add('close')
      postcard.classList.remove('active')
      postcard.style.maxHeight = null
    }

    addOwnToOrder.addEventListener('click', addToOrder)
    addPreparedToOrder.addEventListener('click', addToOrder)
    switchTabButtons.forEach(button => button.addEventListener('click', switchTabs))

  })();

  (itemAction = () => {
    const items = document.querySelectorAll('.cart-main-goods-item:not(.postcard)')
    items.forEach(item => {
      const deleteItemButton = item.querySelector('.cart-main-goods-item__delete')

      const returnItem = () => {
        item.classList.remove('disabled')
        deleteItemButton.innerHTML = 'убрать'
      }

      const deleteItem = () => {
        item.classList.add('disabled')
        deleteItemButton.innerHTML = 'вернуть'
      }

      deleteItemButton.addEventListener('click', () => {
        if (item.classList.contains('disabled')) {
          returnItem()
          return
        }
        deleteItem()
      })
    })
  })();

  (pointSmallPopupAction = () => {
    const openPopupLinks = document.querySelectorAll('.open_popup_link')
    const popups = document.querySelectorAll('.point__small_popup')
    const pickupPopup = document.querySelector('.point__small_popup.pickup')
    const datepickerPopup = document.querySelector('.point__small_popup.datepicker_popup')

    const closePopup = (link) => {
      link.classList.remove('fade')
      setTimeout(() => link.classList.remove('active'), 300)
    }

    openPopupLinks.forEach(elem => {
      const link = elem.querySelector(':scope > span')
      link.addEventListener('click', (e) => {
        if (elem.classList.contains('active')) {
          closePopup(elem)
          return
        }
        elem.classList.add('active')
        setTimeout(() => elem.classList.add('fade'), 0)
      })
    })

    pickupPopup.addEventListener('click', (e) => {
      if (e.target.classList.contains('c-link')) {
        pickupPopup.parentElement.querySelector(':scope > span').innerHTML = e.target.innerHTML
        const temp = pickupPopup.querySelector('p').innerHTML
        pickupPopup.querySelector('p').innerHTML = e.target.innerHTML
        e.target.innerHTML = temp
      }
    })

    popups.forEach(popup => {
      popup.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          popup.parentElement.querySelector(':scope > span').click()
        }
      })
    })
  })();

  (pointTablePopupAction = () => {
    const body = document.querySelector('body')
    const link = document.querySelector('.cart-main-point__table_link')
    const tablePopup = document.querySelector('.cart-main-point__table_popup__wrap')
    const tableOuter = tablePopup.querySelector('.cart-main-point__table_popup__outer')
    const tableClose = tablePopup.querySelector('svg')

    const closeTablePopup = () => {
      tablePopup.classList.remove('fade')
      body.classList.remove('body-fixed')
      setTimeout(() => tablePopup.classList.remove('active'), 300)
    }

    link.addEventListener('click', () => {
      tablePopup.classList.add('active')
      setTimeout(() => tablePopup.classList.add('fade'), 0)
      body.classList.add('body-fixed')
    })

    tableClose.addEventListener('click', closeTablePopup)
    tableOuter.addEventListener('click', closeTablePopup)
  })();

  (stageControl = () => {
    const nextStageButton = document.querySelector('.cart-side-result__order') // temp

    const steps = document.querySelectorAll('.cart-main-steps-item')
    const tabs = document.querySelectorAll('.cart-main__tab')

    let lastStep = 0

    const switchTab = (i) => {
      tabs.forEach(tab => {
        tab.classList.remove('fade')
        setTimeout(() => {
          tab.classList.remove('active')
        }, 300)
      })
      setTimeout(() => {
        tabs[i].classList.add('active')
      }, 300)
      setTimeout(() => {
        tabs[i].classList.add('fade')
      }, 300)
    }

    const jumpToStep = (stepNum) => {
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove('current')
        steps[i].classList.remove('back')
        steps[i].classList.remove('forth')
        if (steps[i].classList.contains('visited')) {
          if (i < stepNum) {
            steps[i].classList.add('back')
          }
          if (i > stepNum) {
            steps[i].classList.add('forth')
          }
        }
      }
      steps[stepNum].classList.add('current')
      switchTab(stepNum)
    }

    for (let i = 0; i < steps.length; i++) {
      steps[i].addEventListener('click', () => {
        jumpToStep(i)
      })
    }

    nextStageButton.addEventListener('click', () => {
      if (lastStep < steps.length - 1) {
        steps[lastStep].classList.add('done')
        lastStep += 1
        steps[lastStep].classList.add('visited')
        jumpToStep(lastStep)
        switchTab(lastStep)
        steps[lastStep].classList.add('current')
      }
    })
  })();

  (radioAccordionsAction = () => {
    const triggers = document.querySelectorAll('.point-accordion_trigger')
    const accordions = document.querySelectorAll('.point-accordion')

    const setDefaults = (accordion) => {
      const inputs = accordion.querySelectorAll('input')
      inputs.forEach(input => {
        /** open default accordions and clear checkboxes */
        if (
          (input.type === 'radio' && input.getAttribute('checked') !== null) ||
          (input.type === 'checkbox' && input.checked === true)
        ) {
          input.click()
          return
        }
        /** clear text fields */
        if (input.type === 'text') {
          input.value = ''
          return
        }
      })
    }

    const switchAccordion = (name, id) => {
      accordions.forEach(accordion => {
        if (accordion.classList.contains(`${name}_slave`)) {
          if (accordion.classList.contains(`${id}_active`)) {
            accordion.classList.add('active')
            accordion.style.maxHeight = accordion.scrollHeight + 'px'
            return
          }
          setDefaults(accordion)
          accordion.classList.remove('active')
          accordion.style.maxHeight = 0
        }
      })
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('change', () => {
        switchAccordion(trigger.name, trigger.id)
      })
    })
  })();

  (checkboxAccordionAction = () => {
    const checkbox = document.querySelector('#not_me')
    const checkboxAccordion = checkbox.parentElement.nextElementSibling
    checkbox.addEventListener('change', () => {
      if (checkbox.checked === true) {
        checkboxAccordion.classList.add('active')
        checkboxAccordion.style.maxHeight = checkboxAccordion.scrollHeight + 'px'
        return
      }
      checkboxAccordion.querySelectorAll('input').forEach(input => input.value = '')
      checkboxAccordion.classList.remove('active')
      checkboxAccordion.style.maxHeight = null
    })
  })();

  (datepickerAction = () => {
    const displayChosenTime = (chosenInterval) => {
      const resultContainer = document.querySelector('.timepicker__result')
      resultContainer.innerHTML = chosenInterval
      console.log('time: ' + chosenInterval) //change to send data
    }

    const putIntervals = (intervals) => {
      const intervalsWrap = document.querySelector('.point__small_popup.intervals')
      const intervalNode = document.createElement('a')
      intervalNode.classList.add('c-link')
      intervalNode.classList.add('c-p3')
      intervalNode.classList.add('time_interval')
      const intervalElems = []
      intervals.forEach(interval => {
        const clonedElem = intervalNode.cloneNode(true)
        clonedElem.innerHTML = interval
        clonedElem.addEventListener('click', () => {
          intervalElems.forEach(elem => elem.classList.remove('active'))
          clonedElem.classList.add('active')
          displayChosenTime(interval)
        })
        intervalElems.push(clonedElem)
      })
      intervalsWrap.innerHTML = ''
      intervalElems.forEach(elem => intervalsWrap.appendChild(elem))
    }

    const getDatepickerResult = (receivedData) => {
      const timepicker = document.querySelector('.cart-main-point-accordion__wrap.time')
      timepicker.classList.remove('disabled')
      timepicker.querySelector(':scope > p').innerHTML = ''

      console.log(receivedData) //change to send data and receive intervals
      const timeData = ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'] //temp, received intervals

      putIntervals(timeData)
    }

    const datepicker = new DatePicker({
      'data': data,
      'resultContainerSelector': '.datepicker__result',
      'getResultCallback': getDatepickerResult
    })
  })();

  (inputOptionsListAction = () => {
    const inputs = document.querySelectorAll('.with_options')
    const optionsWraps = Array.from(document.querySelectorAll('.options__wrap'))
    const cityWrap = optionsWraps.find(wrap => wrap.classList.contains('options_city'))
    const streetOptionsWrap = optionsWraps.find(wrap => wrap.classList.contains('options_street'))
    const houseOptionsWrap = optionsWraps.find(wrap =>  wrap.classList.contains('options_house'))
    const cityOptionsWrap = cityWrap.querySelector('.options_city')

    const cityData = ['Большая тростяница, Веселовский сельсовет', 'Белое Болото, Пригородный сельсовет', 'Большая Ухолода, Метченский сельсовет', 'Борисов'] //temp
    const usedAdresses = [ //temp
      {
        'city_type': 'г.',
        'city': 'Жодино',
        'street_type': 'ул.',
        'street': 'Центральная',
        'house': '3',
        'house_building': '1',
        'flat': '110'
      },
      {
        'city_type': 'д.',
        'city': 'Большая тростяница',
        'street_type': 'пер.',
        'street': 'Школьный',
        'house': '3'
      }
    ]

    const addressElem = document.createElement('a')
    addressElem.classList.add('c-link', 'c-p4', 'used_address')
    const addressElemsArr = []

    const buildUsedAddressElem = (address) =>
      (address.city_type ? address.city_type + ' ' : '') + 
      (address.city ? address.city + ', ' : '') + 
      (address.street_type ? address.street_type + ' ' : '') + 
      (address.street ? address.street + ', ' : '') + 
      (address.house ? 'д.' + address.house + ', ' : '') + 
      (address.house_building ? 'к.' + address.house_building + ', ' : '') + 
      (address.flat ? 'кв.' + address.flat + ', ' : '')
    
    const writeUsedAddress = (address) => {
      hideOptions()
      console.log(address)
    }

    usedAdresses.forEach(address => {
      const clonedAddress = addressElem.cloneNode()
      clonedAddress.innerHTML = buildUsedAddressElem(address)
      clonedAddress.addEventListener('click', () => writeUsedAddress(address))
      cityWrap.prepend(clonedAddress)
    })

    const displayOptions = (e) => {
      const popup = e.target.parentElement.querySelector('.cart-main-point-input-options')
      if (e.target.value.length !== 0) {
        popup.classList.add('active')
        return
      }
      hideOptions()
    }

    const hideOptions = () => {
      optionsWraps.forEach(wrap => wrap.classList.remove('active'))
    }

    const fetchStreetData = (city) => {

    }

    const fetchHouseData = (city, street) => {

    }

    inputs.forEach(input => {
      input.addEventListener('keydown', displayOptions)
      input.addEventListener('keyup', displayOptions)
    })
  })();
})