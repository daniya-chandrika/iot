
/*
Shared frontend JS for the prototype.
Assumes backend at http://localhost:3000
*/
const API_BASE = 'http://localhost:3000';

window.fetchDoctors = async function() {
  try {
    const res = await fetch(API_BASE + '/api/doctors');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

window.loadDoctors = async function() {
  const container = document.getElementById('doctors');
  if (!container) return;
  const docs = await window.fetchDoctors();
  container.innerHTML = '';
  docs.forEach(d => {
    const div = document.createElement('div');
    div.className = 'doctor-card';
    div.innerHTML = '<div><strong>'+d.name+'</strong><div>'+d.specialization+'</div></div>' +
                    '<div><span class="status-badge">'+d.status+'</span></div>';
    // if on doctor page, add toggle buttons
    if (location.pathname.endsWith('doctor.html')) {
      const btns = document.createElement('div');
      ['available','in_surgery','off'].forEach(s => {
        const b = document.createElement('button');
        b.textContent = s;
        b.style.marginLeft = '6px';
        b.addEventListener('click', async ()=> {
          await fetch(API_BASE + '/api/doctor/'+d.id+'/status', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({status:s})});
          await window.loadDoctors();
        });
        btns.appendChild(b);
      });
      div.appendChild(btns);
    }
    container.appendChild(div);
  });
}

window.loadLogs = async function() {
  const container = document.getElementById('logs');
  if (!container) return;
  try {
    const res = await fetch(API_BASE + '/api/logs');
    const logs = await res.json();
    container.innerHTML = logs.map(l => '<div>'+l.timestamp+' — '+l.doctor_name+' — '+l.status+'</div>').join('');
  } catch (e) {
    container.innerHTML = 'Error loading logs';
  }
}

window.bookAppointment = async function(payload) {
  try {
    const res = await fetch(API_BASE + '/api/appointments', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    return await res.json();
  } catch (e) {
    return {error: e.message};
  }
}

// Simple login form handler (demo)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = { username: fd.get('username'), password: fd.get('password'), role: fd.get('role') };
    const res = await fetch(API_BASE + '/api/login', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    const data = await res.json();
    const msg = document.getElementById('msg');
    if (res.ok) {
      msg.textContent = 'Logged in as ' + data.display_name + ' ('+data.role+'). Use role pages (director/doctor/patient) to continue.';
    } else {
      msg.textContent = 'Login failed: ' + JSON.stringify(data);
    }
  });
});
