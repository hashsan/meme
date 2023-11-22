import "//hashsan.github.io/use/use.js"
import "https://hashsan.github.io/drop/drop.js"

drop(file=>{
  const getstyle=()=>{
    const cls ="drop"
    var el = fn.q('style.drop')
    if(!el){
      el = document.createElement('style')
      el.classList.add(cls)
      document.head.append(el)
    }    
    return el;
  }
    
  fn.earlyload( URL.createObjectURL(file) )
    .then(url=>{
      getstyle().innerHTML=`:root{--background-2:url(${url});}`    
  })
 
})
