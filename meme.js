import "//hashsan.github.io/use/use.js";

function clearurl(url){  
 const {origin,pathname} = new URL(url)
 return origin + pathname  
}
function getGhp(){
  var d = "ghp_"
  /**/
  + "9ah8c3yojjO"
  + "EsWBOP6CSiMAMj"
  + "mcDcF1UGrhv"    
  return d;
}
function isGithub(url){
  return /\.github\.io/.test(url)
}
function getUrl(){
  const def ='https://hashsan.github.io/outputs/cache.html'
  var u = clearurl(location.href)
  u = isGithub(u)?u:def 
  u=u.replace(/.html$/,'.txt')
  return u
}


export async function editorU(file){
  const ed = document.querySelector('[contenteditable]')
  if(!ed){    
    return console.log('contenteditable not found') 
  }
  
  var url = getUrl()
  if(file){
    url = fn.tailchange(url,file)
  }
  const ghp = getGhp()  
  const {Octo} = await import('https://hashsan.github.io/Octo/Octo.js');
  const api = new Octo(url,ghp)
  const img = await api.auth()
  if(!img){
    console.log(url,ghp)
    throw new Error('Octo error')
  }
  
  console.log('boot editorU',ed,url)
  ed.dataset.url = url
  ed.innerText = await api.load()
  
  
  const {Bar} = await import('https://hashsan.github.io/Bar/Bar.js')
  var bar = new Bar()
  ed.addEventListener('keydown',async(e)=>{
    if(e.ctrlKey && e.which===83){
      e.preventDefault()
      bar.go(30)     
      await api.save(ed.innerText)
      bar.go(100)
      return
    }
    bar.go(10)
  })
}


//const file = fn.URL.get().file ||'editorU.txt'
//editorU(file) ///////////////////////////////////////////////////////////////


export class IndexSite{
  constructor(query){
    this.query = query
    this.target = fn.q(query)||document.body
    this.init()
  }
  async init(){
    const url = getUrl()    
    const ghp = getGhp()   
    this.list = await fn.getIndexInfo(url,ghp)
    this.render();
  }
  render(){
    this.list
      .filter(d=>this.isText(d.path))
      .map(d=>this._render(d))
      .map(el=>this.target.append(el))
  }
  _render(data){
    var el = document.createElement('a')
    Object.assign(el.dataset,data)
    el.style.order = data.order
    el.href =`editor.html?file=${data.path}`
    return el
  }
  isText(file){
    return /\.txt/.test(file)
  }
}

//new IndexSite('.wrap')
