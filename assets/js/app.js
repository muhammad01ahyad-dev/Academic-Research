const seed = {
  progress: [
    {id:1,title:"Set up the research notebook",date:"2026-08-18",tag:"Coding",description:"Created the initial structure for documenting research progress, ideas, simulations, and writing.",link:""},
    {id:2,title:"Review quantum geometry framework",date:"2026-08-17",tag:"Reading",description:"Reviewed the relation between Berry curvature, quantum metric, and optical response.",link:""}
  ],
  notes: [
    {id:3,title:"Quantum Geometry",date:"2026-08-18",tag:"Theory",description:"Notes on Berry connection, Berry curvature, quantum metric, and their role in response functions.",link:""},
    {id:4,title:"Nonlinear Optical Response",date:"2026-08-15",tag:"Theory",description:"Working notes for χ(2), χ(3), SHG, THG, and density-matrix perturbation theory.",link:""}
  ],
  papers: [
    {id:5,title:"Berry-Curvature–Enhanced Second-Harmonic Generation in Two-Band Quantum Materials",date:"2026-08-01",tag:"Writing",description:"Draft manuscript exploring geometric contributions to nonlinear optical response.",link:""},
    {id:6,title:"Nanoscale Organic Contaminant Detection at the Surface Using a Nonlinear Bond Model",date:"2026-07-20",tag:"Publication",description:"Manuscript using bond hyperpolarizability concepts for surface-sensitive nonlinear optical detection.",link:""}
  ],
  scope: [
    {id:7,title:"Nonlinear Optics",date:"",tag:"Research",description:"SHG, THG, RA-SHG, SBHM, MBHM, χ(2), χ(3), and surface nonlinear response.",link:""},
    {id:8,title:"Quantum Geometry",date:"",tag:"Research",description:"Berry curvature, quantum metric, topology, geometric contributions to optical and transport responses.",link:""},
    {id:9,title:"Quantum Materials",date:"",tag:"Research",description:"Graphene, topological insulators, Weyl semimetals, semiconductors, perovskites, and related systems.",link:""},
    {id:10,title:"Computational Physics",date:"",tag:"Methods",description:"Tight-binding, k·p, Wannier functions, DFT, numerical transport, and high-performance computing.",link:""},
    {id:11,title:"Materials & Detection",date:"",tag:"Application",description:"Organic contaminants, nonlinear spectroscopy, interfaces, and nanoscale optical sensing.",link:""},
    {id:12,title:"Scientific Computing",date:"",tag:"Tools",description:"Python, Mathematica, Quantum ESPRESSO, Wannier90, Yambo, OpenMX, and reproducible workflows.",link:""}
  ],
  activity: [
    {id:13,title:"Research Notebook Launched",date:"2026-08-18",tag:"Research",description:"Started a public-facing academic research hub for documenting ongoing work.",link:""},
    {id:14,title:"Research & Teaching",date:"2026-08-01",tag:"Teaching",description:"Academic activity, physics mentoring, lecture preparation, and student development.",link:""}
  ]
};

let data = JSON.parse(localStorage.getItem("academicResearchHub")) || seed;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function save(){ localStorage.setItem("academicResearchHub", JSON.stringify(data)); render(); }
function esc(s=""){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function fmt(d){if(!d)return "No date"; const x=new Date(d+"T00:00:00"); return x.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}
function all(){return Object.values(data).flat().sort((a,b)=>(b.date||"").localeCompare(a.date||""))}

function render(){
  $("#statProgress").textContent=data.progress.length;
  $("#statNotes").textContent=data.notes.length;
  $("#statPapers").textContent=data.papers.length;
  $("#statActivities").textContent=data.activity.length;
  $("#year").textContent=new Date().getFullYear();
  const latest=all()[0]; $("#lastUpdate").textContent=latest?fmt(latest.date):"—";

  $("#recentProgress").innerHTML=data.progress.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4).map(x=>`
    <div class="feed-item"><small>${fmt(x.date)} · ${esc(x.tag)}</small><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div>`).join("") || empty("No progress entries yet.");
  $("#scopePreview").innerHTML=data.scope.slice(0,5).map((x,i)=>`<div class="scope-chip"><b>${String(i+1).padStart(2,"0")} · ${esc(x.title)}</b><span>${esc(x.description)}</span></div>`).join("");

  renderProgress(); renderNotes(); renderPapers(); renderScope(); renderActivities();
}
function empty(t){return `<div class="entry-card"><p>${t}</p></div>`}
function remove(type,id){data[type]=data[type].filter(x=>x.id!==id);save()}
function cardActions(type,id){return `<button class="delete-btn" onclick="remove('${type}',${id})" title="Delete">×</button>`}

function renderProgress(){
  const q=($("#progressSearch")?.value||"").toLowerCase(), f=$("#progressFilter")?.value||"all";
  let items=data.progress.filter(x=>(f==="all"||x.tag.toLowerCase()===f)&&(`${x.title} ${x.description} ${x.tag}`.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));
  $("#progressList").innerHTML=items.map(x=>`<article class="entry-card"><div class="date-box">${fmt(x.date)}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="tag">${esc(x.tag)}</span></div><div>${cardActions("progress",x.id)}</div></article>`).join("")||empty("No matching progress.");
}
function renderNotes(){
  $("#notesList").innerHTML=data.notes.map(x=>`<article class="note-card"><div class="note-icon">✎</div><small>${fmt(x.date)} · ${esc(x.tag)}</small><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="tag">${esc(x.tag)}</span><div style="margin-top:12px">${cardActions("notes",x.id)}</div></article>`).join("");
}
function renderPapers(){
  $("#papersList").innerHTML=data.papers.map(x=>`<article class="paper-card"><div><small>${fmt(x.date)}</small><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p>${x.link?`<a href="${esc(x.link)}" target="_blank" class="tag">Open link ↗</a>`:""}</div><div><span class="status">${esc(x.tag)}</span>${cardActions("papers",x.id)}</div></article>`).join("");
}
function renderScope(){
  $("#scopeList").innerHTML=data.scope.map((x,i)=>`<article class="scope-card"><span class="scope-num">${String(i+1).padStart(2,"0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="tag">${esc(x.tag)}</span><div style="margin-top:14px">${cardActions("scope",x.id)}</div></article>`).join("");
}
function renderActivities(){
  $("#activityList").innerHTML=data.activity.sort((a,b)=>b.date.localeCompare(a.date)).map(x=>`<article class="activity-card"><small>${fmt(x.date)} · ${esc(x.tag)}</small><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="tag">${esc(x.tag)}</span><div style="margin-top:12px">${cardActions("activity",x.id)}</div></article>`).join("");
}

function openForm(type){
  $("#entryType").value=type;
  const names={progress:"Daily progress",notes:"Lecture note",papers:"Paper",scope:"Research scope",activity:"Activity"};
  $("#formEyebrow").textContent="NEW "+names[type].toUpperCase();
  $("#formTitle").textContent="Add "+names[type].toLowerCase();
  $("#date").value=new Date().toISOString().slice(0,10);
  $("#tag").value= type==="activity"?"Teaching": type==="scope"?"Research": type==="papers"?"Writing":"Theory";
  $("#modal").classList.remove("hidden");
}
function closeForm(){$("#modal").classList.add("hidden");$("#entryForm").reset()}
$$("[data-open-form]").forEach(b=>b.onclick=()=>openForm(b.dataset.openForm));
$("#closeModal").onclick=closeForm;
$("#modal").onclick=e=>{if(e.target.id==="modal")closeForm()};
$("#entryForm").onsubmit=e=>{
  e.preventDefault();
  const type=$("#entryType").value;
  data[type].push({id:Date.now(),title:$("#title").value.trim(),date:$("#date").value,tag:$("#tag").value,description:$("#description").value.trim(),link:$("#link").value.trim()});
  save();closeForm();
};

function route(){
  const hash=location.hash.replace("#","")||"home";
  $$(".page").forEach(p=>p.classList.toggle("active-page",p.id===hash));
  $$(".nav-link").forEach(n=>n.classList.toggle("active",n.dataset.page===hash));
  $("#pageLabel").textContent=(hash==="home"?"overview":hash).replace("-"," ").toUpperCase();
  window.scrollTo({top:0,behavior:"smooth"});
}
window.addEventListener("hashchange",route);
$("#progressSearch").oninput=renderProgress; $("#progressFilter").onchange=renderProgress;

$("#themeBtn").onclick=()=>{
  const dark=document.documentElement.dataset.theme==="dark";
  document.documentElement.dataset.theme=dark?"":"dark";
  localStorage.setItem("academicTheme",dark?"light":"dark");
};
if(localStorage.getItem("academicTheme")==="dark")document.documentElement.dataset.theme="dark";

$("#menuBtn").onclick=()=>$(".sidebar").classList.toggle("open");
$$(".nav-link").forEach(n=>n.onclick=()=>$(".sidebar").classList.remove("open"));

$("#exportBtn").onclick=()=>{
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="academic-research-data.json";a.click();URL.revokeObjectURL(a.href);
};

render();route();
