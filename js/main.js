// main JS: uses jQuery for DOM interactions
const p = portfolio.find(x=>x.id===id);
if(p){ $('#lightboxImg').attr('src', p.img); const lb = new bootstrap.Modal(document.getElementById('lightbox')); lb.show(); }



// Contact form validation
function validateEmail(email){
const re = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i; return re.test(email);
}
function passwordStrength(pwd){
let score=0; if(pwd.length>=8) score++; if(/[A-Z]/.test(pwd)) score++; if(/[0-9]/.test(pwd)) score++; if(/[^A-Za-z0-9]/.test(pwd)) score++;
if(score<=1) return 'Weak'; if(score===2) return 'Medium'; return 'Strong';
}


$('#cPassword').on('input', function(){ $('#pwdText').text(passwordStrength($(this).val())); });


$('#contactForm').on('submit', function(e){
e.preventDefault();
const name = $('#cName').val().trim(); const email = $('#cEmail').val().trim(); const msg = $('#cMessage').val().trim();
const pwd = $('#cPassword').val(); const pwd2 = $('#cPassword2').val();
if(!name||!email||!msg){ alert('Please complete required fields.'); return; }
if(!validateEmail(email)){ alert('Please enter a valid email.'); return; }
if(pwd!==pwd2){ alert('Passwords do not match.'); return; }
if(passwordStrength(pwd)==='Weak'){ alert('Please choose a stronger password.'); return; }
alert('Form submitted (demo)'); this.reset(); $('#pwdText').text('—');
});


// Login demo: just basic required check
$('#loginForm').on('submit', function(e){ e.preventDefault(); if(!$('#loginEmail').val()||!$('#loginPassword').val()){ alert('Enter credentials'); } else { alert('Login success (demo)'); $('#loginModal').modal('hide'); } });


// Clients table (CRUD) — stored in-memory
let clients = [ {name:'Acme Ltd',email:'acme@example.com',budget:3000}, {name:'Beta Co',email:'beta@example.com',budget:1200} ];
function renderClients(filter){
const $t = $('#clientsTable tbody').empty();
clients.forEach((c,i)=>{
if(filter && !(c.name.toLowerCase().includes(filter)||c.email.toLowerCase().includes(filter))) return;
const $tr = $(`<tr><td>${i+1}</td><td>${c.name}</td><td>${c.email}</td><td>${c.budget}</td><td>
<button class="btn btn-sm btn-primary editClient" data-index="${i}">Edit</button>
<button class="btn btn-sm btn-danger delClient" data-index="${i}">Delete</button>
</td></tr>`);
$t.append($tr);
});
}
renderClients();
$('#clientSearch').on('input', function(){ renderClients($(this).val().toLowerCase()); });
$('#addClientBtn').on('click', function(){ $('#clientForm')[0].reset(); $('#clientIndex').val(''); var cm = new bootstrap.Modal(document.getElementById('clientModal')); cm.show(); });
$('#clientForm').on('submit', function(e){ e.preventDefault(); const idx = $('#clientIndex').val(); const obj = {name:$('#clientName').val(), email:$('#clientEmail').val(), budget:$('#clientBudget').val()};
if(idx===''){ clients.push(obj); } else { clients[+idx]=obj; }
renderClients(); $('#clientModal').modal('hide');
});
$(document).on('click','.editClient', function(){ const i = +$(this).data('index'); $('#clientIndex').val(i); $('#clientName').val(clients[i].name); $('#clientEmail').val(clients[i].email); $('#clientBudget').val(clients[i].budget); new bootstrap.Modal(document.getElementById('clientModal')).show(); });
$(document).on('click','.delClient', function(){ const i=+$(this).data('index'); if(confirm('Delete client?')){ clients.splice(i,1); renderClients(); }
});


// small animation examples: fadeIn, slideUp, add class
$(document).on('click','.editClient, #addClientBtn', function(){ $('.modal-content').hide().fadeIn(300); });


