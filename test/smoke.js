/* Test fonctionnel sans navigateur. Échoue avec un code de sortie non nul. */
const fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const fichier=path.join(__dirname,'..','index.html');
const dom=new JSDOM(fs.readFileSync(fichier,'utf8'),{runScripts:"dangerously",url:"https://exemple.test/",pretendToBeVisual:true,
  beforeParse(w){try{w.localStorage.setItem("langue","fr")}catch(e){}
    w.HTMLCanvasElement.prototype.getContext=()=>({setTransform(){},clearRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},arc(){},fill(){},fillRect(){},fillText(){},measureText:()=>({width:40}),save(){},restore(){}});}});
const {window}=dom,d=window.document,pb=[];
window.addEventListener('error',e=>pb.push('erreur JS : '+e.message));
const q=s=>d.querySelector(s),qa=s=>[...d.querySelectorAll(s)];
function att(cond,msg){if(!cond)pb.push(msg)}

setTimeout(()=>{
  att(qa('.entree button').length===69,'index : 69 entrées attendues');
  const inp=q('#q');
  inp.value='soleil';inp.dispatchEvent(new window.Event('input'));
  const noms=qa('.entree h2').map(e=>e.textContent);
  ['Or','Tiphereth','Le Soleil','Rubedo','Lion'].forEach(x=>att(noms.includes(x),'recherche « soleil » sans '+x));
  inp.value='sulphur';inp.dispatchEvent(new window.Event('input'));
  att(qa('.entree h2')[0].textContent==='Soufre','recherche bilingue cassée');
  inp.value='';inp.dispatchEvent(new window.Event('input'));
  qa('.voie').find(b=>b.getAttribute('data-voie')==='Tarot').click();
  att(qa('.entree button').length===22,'filtre Tarot');
  qa('.voie')[0].click();

  window.location.hash='or';window.dispatchEvent(new window.Event('hashchange'));
  att(q('#fiche h2').textContent==='Or','fiche Or');
  att(qa('#fiche .chip').some(c=>c.textContent.includes('Soleil')),'Or → Soleil');
  window.location.hash='soleil';window.dispatchEvent(new window.Event('hashchange'));
  att(qa('#fiche .chip').some(c=>c.textContent.includes('Or')),'réciprocité Soleil → Or');

  window.location.hash='';window.dispatchEvent(new window.Event('hashchange'));
  q('#ong-theme').click();
  const set=(id,v)=>{const e=d.getElementById(id);e.value=v;e.dispatchEvent(new window.Event('input'));e.dispatchEvent(new window.Event('change'));};
  set('t-date','1977-07-17');set('t-ville','Nantes');
  att(d.getElementById('t-utc').value==='2','décalage auto UTC+2 pour juillet 1977');
  att(d.getElementById('t-lat').value==='47.2184','latitude auto');
  set('t-heure','14:30');
  q('#calculer').click();
  const blocs=qa('#resultat .bloc').map(b=>b.querySelector('h3').textContent+' = '+b.querySelector('.valeur').textContent);
  att(blocs.length===8,'8 blocs attendus, '+blocs.length+' obtenus');
  att(blocs[0]==='Chemin de vie = 3','chemin de vie');
  att(blocs[3].includes('Cancer'),'Soleil en Cancer le 17 juillet');
  att(blocs[6].includes('Balance'),'ascendant Balance');
  blocs.forEach(b=>console.log('  '+b));

  // hiver : le décalage doit retomber à +1
  set('t-date','1977-01-15');
  att(d.getElementById('t-utc').value==='1','décalage auto UTC+1 en janvier');
  set('t-date','1977-07-17');

  // lien partageable
  window.location.hash='theme?d=1955-03-14&h=06:05&u=1&la=48.8566&lo=2.3522&v=Paris';
  window.dispatchEvent(new window.Event('hashchange'));
  att(d.body.getAttribute('data-vue')==='theme','le lien doit ouvrir la vue thème');
  att(qa('#resultat .bloc').length===8,'le lien doit recalculer le thème');
  console.log('  lien → '+qa('#resultat .bloc').map(b=>b.querySelector('.valeur').textContent).join(' | '));

  // graphe
  q('#ong-graphe').click();
  att(d.body.getAttribute('data-vue')==='graphe','vue graphe');
  att(qa('#legende span').length===4,'légende du graphe');

  // bascule de langue
  const sel=d.getElementById('langue');sel.value='en';sel.dispatchEvent(new window.Event('change'));
  att(d.documentElement.lang==='en','attribut lang');
  q('#ong-index').click();
  window.location.hash='or';window.dispatchEvent(new window.Event('hashchange'));
  att(q('#fiche h2').textContent==='Gold','fiche traduite');
  att(q('#fiche .provenance').textContent.includes('Alchemy'),'domaine traduit');

  if(pb.length){console.error('\nÉCHECS :\n- '+pb.join('\n- '));process.exit(1);}
  console.log('\nTOUS LES TESTS PASSENT');
},800);
