// 数组求和(兼容字符串)
function listSum(list) {
  let sum = 0
  for (let item of list) {
    if (!isNaN(item)) {
      sum += item
    }
  }
  return sum
}

// 数组放大(兼容字符串)
function listZoom(list, zoom) {
  return list.map(item => isNaN(item) ? "无" : Math.round(item * zoom))
}

//加密
function encrypt(word) {
  let key = CryptoJS.enc.Utf8.parse(atob('dHNxdA=='))
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.DES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

//解密
function decrypt(word) {
  let key = CryptoJS.enc.Utf8.parse(location.hostname.split('.')[0]+atob('LmdpdA=='))
  let decrypt = CryptoJS.DES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

// 获取改造材料
function getRetrofit(equipment) {
  function handle(retrofit) {
    return (retrofit.xuanBing !== 0 ? retrofit.xuanBing + "玄兵<br/>" : "") +
      (retrofit.duanZao !== 0 ? retrofit.duanZao + "锻造法<br/>" : "") +
      (retrofit.moDuan !== 0 ? retrofit.moDuan + "魔锻锭<br/>" : "") +
      (retrofit.moZhu !== 0 ? retrofit.moZhu + "魔铸锭<br/>" : "")
  }

  let retrofitList = []
  let sumRetrofit = {xuanBing: 0, duanZao: 0, moDuan: 0, moZhu: 0}
  for (let i = 0; i < 9; i++) {
    if (i < 3) {
      retrofitList.push(handle(equipment.clothe.retrofit))
      sumRetrofit.xuanBing += equipment.clothe.retrofit.xuanBing
      sumRetrofit.duanZao += equipment.clothe.retrofit.duanZao
      sumRetrofit.moDuan += equipment.clothe.retrofit.moDuan
      sumRetrofit.moZhu += equipment.clothe.retrofit.moZhu
    }
    if (i >= 3 && i < 5) {
      retrofitList.push(handle(equipment.sash.retrofit))
      sumRetrofit.xuanBing += equipment.clothe.retrofit.xuanBing
      sumRetrofit.duanZao += equipment.clothe.retrofit.duanZao
      sumRetrofit.moDuan += equipment.clothe.retrofit.moDuan
      sumRetrofit.moZhu += equipment.clothe.retrofit.moZhu
    }
    if (i === 5) {
      retrofitList.push(handle(equipment.shoulder.retrofit))
      sumRetrofit.xuanBing += equipment.clothe.retrofit.xuanBing
      sumRetrofit.duanZao += equipment.clothe.retrofit.duanZao
      sumRetrofit.moDuan += equipment.clothe.retrofit.moDuan
      sumRetrofit.moZhu += equipment.clothe.retrofit.moZhu
    }
    if (i === 6) {
      retrofitList.push(handle(equipment.cloak.retrofit))
      sumRetrofit.xuanBing += equipment.clothe.retrofit.xuanBing
      sumRetrofit.duanZao += equipment.clothe.retrofit.duanZao
      sumRetrofit.moDuan += equipment.clothe.retrofit.moDuan
      sumRetrofit.moZhu += equipment.clothe.retrofit.moZhu
    }
    if (i === 7) {
      retrofitList.push(handle(equipment.jewelry.retrofit))
      sumRetrofit.xuanBing += equipment.clothe.retrofit.xuanBing
      sumRetrofit.duanZao += equipment.clothe.retrofit.duanZao
      sumRetrofit.moDuan += equipment.clothe.retrofit.moDuan
      sumRetrofit.moZhu += equipment.clothe.retrofit.moZhu
    }
    if (i === 8) {
      retrofitList.push(handle(sumRetrofit))
    }
  }
  return retrofitList
}

// 随机颜色
function getRandomColor() { // 随机颜色
  return '#' + (function (color) {
    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
    && (color.length === 6) ? color : arguments.callee(color)
  })('')
}

// 获取localStorage
function getLocalStorage(key, handle) {
  let val = localStorage.getItem(key)
  if (handle) val = JSON.parse(val)
  return val
}

// 设置 localStorage
function setLocalStorage(key, value, handle) {
  if (handle) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}
