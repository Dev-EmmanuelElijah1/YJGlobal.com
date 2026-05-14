// YJ-Global static site — interactions
(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Active nav highlight
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === here) a.classList.add('active');
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('[data-counter]');
  const cio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const to = parseInt(el.dataset.counter,10);
      const start = performance.now(); const dur = 1500;
      const tick = (t)=>{
        const p = Math.min(1,(t-start)/dur);
        const eased = 1-Math.pow(1-p,3);
        el.textContent = Math.floor(to*eased).toLocaleString()+'+';
        if(p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  },{threshold:0.4});
  counters.forEach(c=>cio.observe(c));

  // Quote form validation + toast
  const form = document.querySelector('form.quote-form');
  if(form){
    const showError = (name,msg)=>{
      const err = form.querySelector(`[data-error="${name}"]`);
      if(err) err.textContent = msg || '';
    };
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      let valid = true;
      const data = Object.fromEntries(new FormData(form).entries());
      ['name','email','phone','service'].forEach(n=>showError(n,''));
      if(!data.name || data.name.trim().length<2){ showError('name','Please enter your name'); valid=false; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||'')){ showError('email','Enter a valid email'); valid=false; }
      if(!/^[+\d\s\-()]{7,}$/.test(data.phone||'')){ showError('phone','Enter a valid phone'); valid=false; }
      if(!data.service){ showError('service','Select a service'); valid=false; }
      if(!valid) return;
      showToast('Quote request received','We\'ll get back to you within 24 hours.');
      form.reset();
    });
  }

  function showToast(title,msg){
    let t = document.querySelector('.toast');
    if(!t){
      t = document.createElement('div');
      t.className='toast';
      document.body.appendChild(t);
    }
    t.innerHTML = `<strong>${title}</strong>${msg}`;
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>t.classList.remove('show'),4000);
  }

  // Year in footer
  const y = document.querySelector('[data-year]');
  if(y) y.textContent = new Date().getFullYear();
})();
