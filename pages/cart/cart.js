document.addEventListener('DOMContentLoaded', () => {

  const timeDateData = {};

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
    const openPopupLinks = document.querySelectorAll('.cart-main-point__popup_link')
    const pickupPopup = document.querySelector('.cart-main-point__popup.pickup')

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
        pickupPopup.parentElement.querySelector(':scope > span').click()
      }
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
      switchTab(stepNum)
    }

    for (let i = 0; i < steps.length; i++) {
      steps[i].addEventListener('click', () => {
        jumpToStep(i)
      })
    }

    nextStageButton.addEventListener('click', () => {
      lastStep += 1
      steps[lastStep].classList.add('visited')
      jumpToStep(lastStep)
      switchTab(lastStep)
      steps[lastStep].classList.add('current')
    })
  })();

  createDatePicker({ datePickerSelector: 'selector', openButtonSelector: 'selector', data: timeDateData });
})