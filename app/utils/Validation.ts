//======================== Phone Number Validation ===============================
export const validateMinMaxLengthForPhone = (phoneNo) => {
  // if (phoneNo.trim().length >= 10 && phoneNo.trim().length <= 13) {
  if (phoneNo.trim().length == 10) {
    return true
  } else {
    return false
  }
}

//======================== Phone Number Validation ===============================
export const validatePhone = (phone) => {
  if (phone.length === 0) {
    return true
  }
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return re.test(phone)
}

//======================== Check Only Alphabets Validation ===========================
export const onlyAlphabets = (value: string) => {
  // value = value.replace(/ /g, '')
  let reg = /^[^-\s][a-zA-Z]+[a-zA-Z ]*[^-\s]$/ ///^[a-zA-Z]+$/
  if (reg.test(value.toString().trim())) {
    return true
  } else {
    return false
  }
}

//================================== Blank Validation ================================
export const isBlank = (value) => {
  if (value.trim().length == 0) {
    return true
  } else {
    return false
  }
}

//================================ Check Valid GST Number =============================
export const isValidGSTNumber = (gstNumber) => {
    let reg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    if (reg.test(gstNumber)) {
        return true
    } else {
        return false
    }
}

//================================ Check GST Number Length ============================
export const isValidGSTLength = (gstNumber) => {
    if (gstNumber.trim().length == 15) {
        return true
    }else{
        return false
    }
}

//============================== Check Numeric Values Only ==============================
export const onlyNumericValue = (value) => {
  let reg = /^(0|[1-9][0-9]*)$/
  if (reg.test(value)) {
    return true
  }else{
    return false
  }
}

//======================== Check Is Valid Vehicle Number Or Not ======================
export const isValidVehicleNumber = (value) => {
  let reg = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
  if (reg.test(value)) {
    return true
  }else{ 
    return false
  }
}