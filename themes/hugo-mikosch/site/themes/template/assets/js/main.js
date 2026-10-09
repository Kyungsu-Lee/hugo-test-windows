document.addEventListener('DOMContentLoaded', ()=>{
  const toggles = document.querySelectorAll('[data-toggle]')
  toggles.forEach(t=>t.addEventListener('click', ()=>{
    const target = document.querySelector(t.dataset.toggle)
    if(target) target.classList.toggle('open')
  }))

  const reveal = document.querySelectorAll('[data-reveal]')
  reveal.forEach((el, index)=>{
    const delay = Math.min(index * 120, 480)
    setTimeout(()=>{
      el.classList.add('is-visible')
    }, delay)
  })
})
