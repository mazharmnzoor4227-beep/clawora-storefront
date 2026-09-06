let catalog=[],cart=JSON.parse(localStorage.getItem('clawora_cart')||'[]');

const money=n=>new Intl.NumberFormat('en-PK',{
  style:'currency',
  currency:'PKR',
  maximumFractionDigits:0
}).format(n);

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({
  '&':'&amp;',
  '<':'&lt;',
  '>':'&gt;',
  '"':'&quot;',
  "'":'&#39;'
}[m]));

async function init(){
  catalog=await fetch('products.json').then(r=>r.json());
  fillFilters();
  renderProducts();
  renderCart();
}

function fillFilters(){
  vendorFilter.innerHTML=
    '<option value="">All brands</option>'+
    [...new Set(catalog.map(x=>x.vendor))]
      .sort()
      .map(v=>`<option>${esc(v)}</option>`)
      .join('');

  typeFilter.innerHTML=
    '<option value="">All categories</option>'+
    [...new Set(catalog.map(x=>x.type))]
      .sort()
      .map(v=>`<option>${esc(v)}</option>`)
      .join('');
}

function renderProducts(){
  const q=(search.value||'').toLowerCase();
  const v=vendorFilter.value;
  const t=typeFilter.value;

  const list=catalog.filter(p=>
    (!q||(`${p.title} ${p.vendor} ${p.type}`).toLowerCase().includes(q)) &&
    (!v||p.vendor===v) &&
    (!t||p.type===t)
  );

  productCount.textContent=`${list.length} products`;

  products.innerHTML=list.map(p=>`
    <article class="product">
      <div class="media">
        ${p.stock<=0?'<span class="sold">SOLD OUT</span>':''}
        <img src="${p.image}" alt="${esc(p.title)}" loading="lazy">
      </div>

      <div class="pbody">
        <div class="vendor">${esc(p.vendor)}</div>
        <div class="title">${esc(p.title)}</div>
        <div class="price">${money(p.price)}</div>

        <div class="pactions">
          <button
            class="add"
            ${p.stock<=0?'disabled':''}
            onclick="addToCart(${p.id})"
          >
            ${p.stock<=0?'Sold out':'Add to bag'}
          </button>

          <button
            class="view"
            onclick="openProduct(${p.id})"
          >
            View
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function addToCart(id){
  const p=catalog.find(x=>x.id===id);

  if(!p||p.stock<=0)return;

  const i=cart.find(x=>x.id===id);

  if(i){
    i.qty++;
  }else{
    cart.push({id,qty:1});
  }

  saveCart();
  openCart();
}

function saveCart(){
  localStorage.setItem('clawora_cart',JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  cartCount.textContent=cart.reduce((a,b)=>a+b.qty,0);

  cartList.innerHTML=cart.length
    ?cart.map(i=>{
      const p=catalog.find(x=>x.id===i.id);

      if(!p)return '';

      return`
        <div class="cartItem">
          <img src="${p.image}">

          <div>
            <b>${esc(p.title)}</b>
            <span>${money(p.price)} × ${i.qty}</span>
          </div>

          <button
            class="iconbtn"
            onclick="removeItem(${i.id})"
          >
            −
          </button>
        </div>
      `;
    }).join('')
    :'<p style="color:#756f73;font-size:12px">Your bag is empty.</p>';

  const total=cart.reduce((s,i)=>{
    const p=catalog.find(x=>x.id===i.id);
    return s+(p?p.price*i.qty:0);
  },0);

  cartTotal.textContent=money(total);
}

function removeItem(id){
  cart=cart.filter(x=>x.id!==id);
  saveCart();
}

function openCart(){
  drawer.classList.add('open');
}

function closeCart(){
  drawer.classList.remove('open');
}

function openProduct(id){
  const p=catalog.find(x=>x.id===id);

  if(!p)return;

  mImg.src=p.image;
  mVendor.textContent=p.vendor;
  mTitle.textContent=p.title;
  mPrice.textContent=money(p.price);
  mDesc.textContent=p.description;

  mAdd.disabled=p.stock<=0;
  mAdd.textContent=p.stock<=0?'Sold out':'Add to Bag';

  mAdd.onclick=()=>addToCart(id);

  productModal.classList.add('open');
}

function closeModal(){
  productModal.classList.remove('open');
}

function orderText(){
  let txt=`Order from ${STORE_CONFIG.storeName}\n\n`;
  let total=0;

  cart.forEach(i=>{
    const p=catalog.find(x=>x.id===i.id);

    if(p){
      txt+=`${i.qty} × ${p.title} — ${money(p.price*i.qty)}\n`;
      total+=p.price*i.qty;
    }
  });

  return txt+
    `\nTotal: ${money(total)}`+
    `\n\nName:`+
    `\nPhone:`+
    `\nAddress:`+
    `\nCity:`;
}

function checkout(){
  if(!cart.length){
    return alert('Your bag is empty.');
  }

  const n=(STORE_CONFIG.whatsappNumber||'').replace(/\D/g,'');

  if(n){
    location.href=
      `https://wa.me/${n}?text=${encodeURIComponent(orderText())}`;
  }else{
    copyOrder();

    alert(
      'Order text copied. Add your WhatsApp number in store-config.js to enable one-tap WhatsApp checkout.'
    );
  }
}

async function copyOrder(){
  if(cart.length){
    await navigator.clipboard.writeText(orderText());
  }
}

function focusSearch(){
  search.scrollIntoView({
    behavior:'smooth',
    block:'center'
  });

  setTimeout(()=>search.focus(),400);
}

init();
