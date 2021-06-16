document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.js-form')

  for (let form of forms) {
    const submitButton = form.querySelector('.form-submit')
    const submitCover = form.querySelector('.form-submit-cover')
    const requiredInputLabels = form.querySelectorAll('.js-required')

    const validatePhoneInput = (input, label) => {
      
    }
    
    const validateNameInput = (input, label) => {
      if(input.value.length >= 2) {
        label.classList.add('js-valid')
        label.classList.remove('js-invalid')
        return
      }
      label.classList.add('js-invalid')
      label.classList.remove('js-valid')
    }

    const checkAllValid = () => {
      for (let label of requiredInputLabels) {
        if (!label.querySelector('input').classList.contains('js-valid')) {
          submitButton.disabled = true
          return
        }
      }
      submitButton.disabled = false
    }

    const showHints = () => {
      for(let label of requiredInputLabels) {
        const input = label.querySelector('input')
        const name = input.getAttribute('name')

        label.classList.add('js-validate')
        if(name === 'name') {
          validateNameInput(input, label)
        }
        if(name === 'phone') {
          validatePhoneInput(input, label)
        }
      }

      console.log('show hints')
    }

    submitButton.addEventListener('click', (e) => {
      e.preventDefault()

      console.log('send')

    })

    submitCover.addEventListener('click', (e) => {
      showHints()
    })
  }
})