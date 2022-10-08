// 当前日期时间
function showRealTime() {
  let d = new Date()
  d.setDate(d.getDate() - 30)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  let days = ["日", "一", "二", "三", "四", "五", "六"]
  let day = d.getDay()
  let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours()
  let min = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes()
  let sec = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : d.getSeconds()
  return year + "年" + month + "月" + date + "日&emsp;星期" + days[day] + "&emsp;" + hour + ":" + min + ":" + sec
}

// 动态渲染下拉菜单
function selectRender({id,dataList}) {
  let $select = $('#' + id);
  //重置下拉框
  $select.empty();
  $.each(dataList, function(index, item) {
    if (item.val!==undefined&&item.text!==undefined){
      let $option = $('<option value="' + item.val + '">' + item.text + '</option>');
      $select.append($option);
    }else {
      let $option = $('<option value="' + index + '">' + item + '</option>');
      $select.append($option);
    }
  });
}

// 监测是否为第一次访问
function firstVisited() {
  let first = localStorage.getItem('firstVisited')
  let localDay = localStorage.getItem('localDay')
  let nowDay = new Date().getDate().toString()
  if(!localDay||localDay!==nowDay){
    localStorage.setItem('localDay',nowDay)
    localStorage.setItem('competed', '[]')
  }
  if(!first||first!=='1'){
    $('#side_home').removeClass('layui-this')
    $('#side_disclaimer').addClass('layui-this')
    $("#tsqt-main").load("./pages/author/disclaimer.html")
    $("#firstPrompt").css('display','block')
    let i = 10
    let key = setInterval(() => {
      $("#firstPrompt").html(`请您阅读${i}秒本站免责条款<br/><button disabled>我已阅读</button>`)
      if (i===0) {
      $("#firstPrompt").html(`<button onclick="javascript:localStorage.setItem('firstVisited','1');location.reload();">我已阅读</button>`)
        clearInterval(key)
      }
      i = i-1
    }, 1000);
  }else{
    $('#side_disclaimer').removeClass('layui-this')
    $("#side_home").addClass('layui-this')
    $("#tsqt-main").load("./pages/home/home.html")
  }
}

function intToChinese ( str ) {
  str = str+'';
  let len = str.length-1;
  let idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
  let num = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
  num = ['零','一','二','三','四','五','六','七','八','九'];
  return str.replace(/([1-9]|0+)/g,function( $, $1, idx, full) {
    let pos = 0;
   if( $1[0] !== '0' ){
    pos = len-idx;
    if( idx === 0 && $1[0] === 1 && idxs[len-idx] === '十'){
     return idxs[len-idx];
    }
    return num[$1[0]] + idxs[len-idx];
   } else {
    let left = len - idx;
    let right = len - idx + $1.length;
    if( Math.floor(right/4) - Math.floor(left/4) > 0 ){
     pos = left - left%4;
    }
    if( pos ){
     return idxs[pos] + num[$1[0]];
    } else if( idx + $1.length >= len ){
     return '';
    }else {
     return num[$1[0]]
    }
   }
  });
 }

function decryptText(word) {
  let key = CryptoJS.enc.Utf8.parse(atob('dHNxdA=='))
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}