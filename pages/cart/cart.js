document.addEventListener('DOMContentLoaded', () => {

  const data = {  // must be fetched; days count from 1, months count from 0
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
    const buttonWrap = document.querySelector('.cart-side-result__footer')
    const nextStageButton = buttonWrap.querySelector('.cart-side-result__order')
    const fastOrderButton = document.querySelector('.cart-side-result__fast_order')
    const clientCardButton = document.querySelector('.cart-side-client_card')

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

    const controlNextStageButton = () => {
      if (lastStep < 2) {
        // buttonWrap.removeChild(nextStageButton)
        return
      }
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
      controlNextStageButton()
      fastOrderButton.style.display = 'none'
      clientCardButton.style.display = 'none'
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
            accordion.classList.add('point-accordion--active')
            accordion.style.maxHeight = accordion.scrollHeight + 'px'
            return
          }
          setDefaults(accordion)
          accordion.classList.remove('point-accordion--active')
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
      const timeData = ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'] // must be fetched

      putIntervals(timeData)
    }

    const datepicker = new DatePicker({
      'data': data,
      'resultContainerSelector': '.datepicker__result',
      'getResultCallback': getDatepickerResult
    })
  })();

  (addressInputsAction = () => {
    const mainWrap = document.querySelector('.cart-main-point__wrap.address')
    const fields = Array.from(mainWrap.querySelectorAll('.cart-main-point-input.text'))
    const fieldsWithOptions = fields.filter(field => field.classList.contains('with_options'))
    const optionsWraps = Array.from(mainWrap.querySelectorAll('.options__wrap'))
    const cityWrap = optionsWraps.find(wrap => wrap.classList.contains('options_city'))

    /*
    const streetOptionsWrap = optionsWraps.find(wrap => wrap.classList.contains('options_street'))
    const houseOptionsWrap = optionsWraps.find(wrap => wrap.classList.contains('options_house'))
    const cityOptionsWrap = cityWrap.querySelector('.options_city')
    */

    const mainData = {
      'city': [
        {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        {
          'short': 'д. Белое Болото',
          'full': 'Белое Болото, Пригородный сельсовет'
        },
        {
          'short': 'д. Большая Ухолода',
          'full': 'Большая Ухолода, Метченский сельсовет'
        },
        {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        {
          'short': 'г. Борисов',
          'full': 'Борисов'
        },
      ]
    }

    const mappedData = new Map(Object.entries(mainData))

    const usedAdresses = [ // must be fetched
      {
        'city': {
          'short': 'г. Жодино',
          'full': 'Жодино'
        },
        'street': {
          'short': 'ул. Центральная',
          'full': 'Центральная, улица',
        },
        'house': '3',
        'house_building': '1',
        'flat': '110'
      },
      {
        'city': {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        'street': {
          'short': 'пер. Школьный',
          'full': 'Школьный, переулок',
        },
        'house': '3'
      }
    ]

    const addressElem = document.createElement('a')
    addressElem.classList.add('c-link', 'c-p5')
    const usedAddressElem = document.createElement('a')
    usedAddressElem.classList.add('c-link', 'c-p4', 'used_address')

    const buildUsedAddressElem = (address) =>
      (address.city.short ? address.city.short : '') +
      (address.street.short ? ', ' + address.street.short : '') +
      (address.house ? ', д.' + address.house : '') +
      (address.house_building ? ', к.' + address.house_building : '') +
      (address.flat ? ', кв.' + address.flat : '')

    const writeUsedAddress = (address) => {
      fetchStreetData(address.city.full)
      fetchHouseData(address.city.full, address.street.full)
      hideOptions()
      fields.forEach(field => {
        const input = field.querySelector('input')
        if (input.id === 'city') {
          input.value = address.city.full
          return
        }
        if (input.id === 'street') {
          input.value = address.street.full
          return
        }
        if (input.id === 'house') {
          input.value = address.house + (address.house_building ? '/' + address.house_building : '')
        }
        if (input.id === 'flat') {
          input.value = address.flat || ''
        }
      })
    }

    usedAdresses.forEach(address => {
      const clonedAddress = usedAddressElem.cloneNode()
      clonedAddress.innerHTML = buildUsedAddressElem(address)
      clonedAddress.addEventListener('click', () => writeUsedAddress(address))
      cityWrap.prepend(clonedAddress)
    })

    const updateList = (e) => {
      const popup = e.target.parentElement.querySelector('.cart-main-point-input-options')
      const list = e.target.parentElement.querySelector('.options__list')
      const input = e.target
      const dataArr = mappedData.get(input.id)
      let popupVisible = false

      list.innerHTML = ''

      if (input.value.length !== 0 && dataArr) {
        dataArr.forEach((elem) => {
          if (elem.full.toLowerCase().includes(input.value)) {
            const clonedAddress = addressElem.cloneNode()
            clonedAddress.innerHTML = elem.full
            clonedAddress.addEventListener('click', () => {
              input.value = elem.full
              if (input.id === 'city') fetchStreetData(elem.full)
              if (input.id === 'street') fetchHouseData(elem.full)
              hideOptions()
            })
            list.appendChild(clonedAddress)
            popupVisible = true
          }
        })
      }
      if (popupVisible) {
        popup.classList.add('active')
        return
      }
      hideOptions()
    }

    const hideOptions = () => {
      optionsWraps.forEach(wrap => wrap.classList.remove('active'))
    }

    const fetchStreetData = (city) => {
      const streetData = [ // must be fetched
        {
          'short': 'ул. Старая',
          'full': 'Старая, улица',
        },
        {
          'short': 'ул. Столетова',
          'full': 'Столетова, улица',
        },
        {
          'short': 'пр. Столетова',
          'full': 'Столетова, проезд'
        },
        {
          'short': 'ул. Строителей',
          'full': 'Строителей, улица'
        },
        {
          'short': 'пер. Строителей',
          'full': 'Строителей, переулок'
        }
      ]
      mappedData.set('street', streetData)
    }

    const fetchHouseData = (city, street) => {
      const houseData = [ // must be fetched
        {
          'house': '1'
        },
        {
          'house': '11'
        },
        {
          'house': '12'
        },
        {
          'house': '15'
        },
        {
          'house': '15',
          'house_building': '1'
        }
      ]
      const refactoredArr = []

      houseData.forEach(elem => refactoredArr.push({
        'full': elem.house + (elem.house_building ? '/' + elem.house_building : '')
      }))

      mappedData.set('house', refactoredArr)
    }

    fieldsWithOptions.forEach(field => {
      field.addEventListener('keydown', updateList)
      field.addEventListener('keyup', updateList)
    })

    document.addEventListener('click', (e) => {
      e.stopPropagation()
      let close = true
      fieldsWithOptions.forEach(field => {
        if (field.contains(e.target) || field === e.target) {
          close = false
        }
      })
      if (close) {
        hideOptions()
      }
    })
  })();

  (enhanceCommentTextarea = () => {
    const textarea = document.querySelector('.cart-main-point-input__text.textarea')

    const changeHeight = () => {
      textarea.style.height = textarea.scrollHeight + 1 + 'px'
    }

    textarea.addEventListener('keydown', changeHeight)
    textarea.addEventListener('keyup', changeHeight)
  })();

  (fastOrderAction = () => {
    const openPopupButton = document.querySelector('.cart-side-result__fast_order')
    const wrap = document.querySelector('.fast_order__wrap')
    const form = wrap.querySelector('.fast_order')
    const closeButtons = wrap.querySelectorAll('.fast_order__close')
    const success = wrap.querySelector('.fast_order__success')
    const dismissButton = success.querySelector('.fast_order__dismiss')
    const outer = wrap.querySelector('.fast_order__outer')
    const sendButton = form.querySelector('.fast_order__send')
    const inputs = form.querySelectorAll('input')

    const openPopup = (popup) => {
      popup.classList.add('active')
      setTimeout(() => popup.classList.add('fade'), 0)
    }

    const closePopup = (popup) => {
      popup.classList.remove('fade')
      setTimeout(() => popup.classList.remove('active'), 300)
    }

    const setDefault = (e) => {
      closePopup(wrap)
      setTimeout(() => {
        closePopup(success)
        openPopup(form)
      }, 300)
    }

    const sendData = () => {
      const mapData = new Map()
      inputs.forEach(input => {
        mapData.set(input.name, input.value)
      })
      const data = Object.fromEntries(mapData)

      console.log(data) // change to send
    }

    sendButton.addEventListener('click', () => {
      sendData()
      closePopup(form)
      setTimeout(() => openPopup(success), 300)
    })
    outer.addEventListener('click', setDefault)
    closeButtons.forEach(button => {
      button.addEventListener('click', setDefault)
    })
    dismissButton.addEventListener('click', setDefault)
    openPopupButton.addEventListener('click', () => openPopup(wrap))
  })();

  (promoValidation = () => {
    const input = document.querySelector('.cart-side-result__input_promo')
    const result = document.querySelector('.cart-side-result__promo_res')

    const clear = (e) => {
      if (input.value.length === 0) {
        input.classList.remove('promo-valid', 'promo-invalid')
        result.innerHTML = ''
      }
    }

    input.addEventListener('keydown', clear)
    input.addEventListener('keyup', clear)

    input.addEventListener('focusout', () => {
      if (input.value.length === 0) {
        return
      }
      console.log(input.value) // change to fetch
      let responseDiscount = 5 // must be fetched
      if (responseDiscount) {
        input.classList.add('promo-valid')
        result.innerHTML = `Ваша скидка &mdash; ${responseDiscount}%`
        return
      }
      input.classList.add('promo-invalid')
      result.innerHTML = 'Такого номера карты клиента или промокода нет.<br>Проверьте данные и попробуйте ещё раз'
    })
  })();

  (inputValidation = () => {
    const emailInputs = document.querySelectorAll('input[name="email"]')
    const nameInputs = document.querySelectorAll('input[name="name"]')
    const phoneInputs = document.querySelectorAll('input[name="phone"]')
    const termsInputs = document.querySelectorAll('input[name="terms_of_use"]')

    const setValid = (input) => input.classList.add('js-valid')

    const setInvalid = (input) => input.classList.add('js-invalid')

    const clearInput = (input) => input.classList.remove('js-valid', 'js-invalid')

    const setCursorPosition = (position, element) => {
      element.focus();
      if (element.setSelectionRange) {
        element.setSelectionRange(position, position);
      }
      else if (element.createTextRange) {
        const range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select()
      }
    }

    const phoneMasking = (event) => {
      const input = event.target
      const matrix = '+375 (__) ___ __ __'
      const def = matrix.replace(/\D/g, '')
      let value = input.value.replace(/\D/g, '')
      let i = 0

      if (def.length >= value.length) {
        value = def;
      }

      input.value = matrix.replace(/./g, (string) => {
        return /[_\d]/.test(string) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : string
      })

      if (event.type === 'blur') {
        if (input.value.length === 2) input.value = ''
      }
      else {
        setCursorPosition(input.value.length, input)
      }
    }

    const setValidatableOnKey = (e) => e.target.classList.add('js-validate')

    const validateEmail = (e) => {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (e.target.value.length === 0) {
        clearInput(e.target)
        return
      }

      if (regex.test(e.target.value.toLowerCase())) {
        setValid(e.target)
        setValidatableOnKey(e)
        return
      }

      if (e.target.classList.contains('js-validate')) {
        setInvalid(e.target)
      }
    }

    const validateName = (e) => {
      if (e.target.value.length > 0) {
        setValid(e.target)
        setValidatableOnKey(e)
        return
      }
      if (e.target.classList.contains('js-validate')) {
        setInvalid(e.target)
      }
    }

    const validatePhone = (e) => {
      if (e.target.value.length === 19) {
        setValid(e.target)
        setValidatableOnKey(e)
        return
      }
      clearInput(e.target)
      if (e.target.classList.contains('js-validate')) {
        if (e.target.value.length === 0) {
          setInvalid(e.target)
          return
        }
        setInvalid(e.target)
      }
    }

    const validateTerms = (e) => {
      if (!e.target.checked) {
        setInvalid(e.target)
        return
      }
      setValid(e.target)
      setValidatableOnKey(e)
    }

    phoneInputs.forEach(input => {
      input.addEventListener('input', phoneMasking, false);
      input.addEventListener('focus', phoneMasking, false);
      input.addEventListener('blur', phoneMasking, false);
      input.addEventListener('focusout', setValidatableOnKey)
      input.addEventListener('keyup',validatePhone)
      input.addEventListener('keydown',validatePhone)
    })

    emailInputs.forEach(input => {
      input.addEventListener('focusout', setValidatableOnKey)
      input.addEventListener('keydown', validateEmail)
      input.addEventListener('keyup', validateEmail)
    })

    nameInputs.forEach(input => {
      input.addEventListener('focusout', setValidatableOnKey)
      input.addEventListener('keydown', validateName)
      input.addEventListener('keyup', validateName)
    })

    termsInputs.forEach(input => input.addEventListener('change', validateTerms));
  })();

  (mainValidation = () => {
    const inputBlocks = document.querySelectorAll('.cart-main-point')
    const activeTab = document.querySelector('.cart-main__tab')

    const checkAllInputs = () => {
      // todo
    }

    const isBlockActive = (block) => block.classList.contains('point-accordion--active')

    const isBlockValid = (block) => {
      return false
    }

    const setInvalid = (block) => {
      console.log('!')
    }

    inputBlocks.forEach((block, i) => {
      block.addEventListener('mouseover', () => {
        const prevBlock = inputBlocks[i - 1]
        if (i > 0 && isBlockActive(prevBlock) && !isBlockValid(prevBlock)) {
          setInvalid(prevBlock)
        }
      })
    })
  })();
})