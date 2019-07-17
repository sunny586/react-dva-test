;(function(doc, win) {
  let unitBodyFontsize = ''
  let documentEle = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function() {
    let clientWidth = documentEle.clientWidth
    if (!clientWidth) return
    if (clientWidth <= 750) {
      unitBodyFontsize = 100 * (clientWidth / 750)
      documentEle.style.fontSize = unitBodyFontsize + 'px'
    } else {
      unitBodyFontsize = 100 * (750 / 750)
      documentEle.style.fontSize = unitBodyFontsize + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
})(document, window)
