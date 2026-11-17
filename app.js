const $ = (id) => document.getElementById(id);
const STORAGE_KEY = 'fto-quest-progress-v3';
const PREVIOUS_STORAGE_KEY = 'fto-quest-progress-v2';
const LEGACY_STORAGE_KEY = 'fto-quest-progress-v1';
const THEME_KEY = 'fto-quest-theme';
const lessons = [
  {title:'לקרוא תנועה',subtitle:'הסימון U, R והגרש',tag:'סימון · 2 דקות',kind:'sequence',intro:'אות גדולה מסמנת פאה. גרש מסמן סיבוב בכיוון ההפוך. לחץ על התנועות לפי הסדר והסתכל איך הקובייה משתנה.',sequence:['U',"U'",'R',"R'"],instruction:'בצע את ארבע התנועות המוצגות. שים לב שכל תנועה וההפוכה לה מבטלות זו את זו.',source:'https://nautilusfto.com/Notation/'},
  {title:'המרכז הראשון',subtitle:'בונים משושה עם סדר צבעים נכון',tag:'Bencisco · 5 דקות',kind:'guide',intro:'ב־FTO אין מרכז קבוע שמכתיב את הצבעים. את המרכז הראשון בונים מצלעות ומשולשי מרכז, ובודקים את סדר הצבעים מול פינה או קובייה פתורה.',steps:['בחר צבע אחד, למשל לבן, ואתר את שלושת הקצוות שלו.','הרכב אותם סביב פאה אחת. בדוק בעזרת פינה שסדר הצבעים הסמוכים נכון.','הוסף את שלושת משולשי המרכז של אותה פאה עד שנוצר משושה שלם.'],instruction:'נסה לבצע את המשימה על קוביית FTO פיזית. אפשר לסובב את הקובייה הווירטואלית כדי להכיר את הפאות.',source:'https://www.youtube.com/watch?v=6GIyEJP5FO8'},
  {title:'שתי שלשות',subtitle:'פינה ושני משולשי מרכז',tag:'Bencisco · 5 דקות',kind:'guide',intro:'Triple היא פינה עם שני משולשי המרכז המתאימים לה. בונים שתיים סביב המרכז הראשון — ומשאירים מקום לשלשה האחרונה.',steps:['בחר פינה ששייכת לצבע המרכז שבנית.','מצא את שני משולשי המרכז המתאימים לה לפי צבעי הצד.','חבר והכנס שתי שלשות. השאר את המיקום השלישי פתוח כשטח עבודה להמשך.'],instruction:'עבוד על הקובייה הפיזית; כרגע המשימה הזו נבדקת באישור עצמי.',source:'https://www.youtube.com/watch?v=6JT2tU00ccs'},
  {title:'המרכזים הבאים',subtitle:'שומרים על הבלוק הקיים',tag:'Bencisco · 5 דקות',kind:'guide',intro:'אחרי המרכז הראשון ושתי השלשות, משלימים את המרכזים הגדולים שנותרו. כל פעם שומרים על מה שכבר נבנה.',steps:['החזק את הבלוק הפתור בצד, כך שהחלקים הלא פתורים יהיו נגישים.','בנה מרכז נוסף מחלקים קטנים בלי לפרק את שתי השלשות.','השלם מרכז נוסף; המרכז האחרון נקבע כתוצאה מסידור האחרים.'],instruction:'זו משימת התמצאות לפני תרגול מקרים מדויקים. היעזר בהדגמת המקור אם נתקעת.',source:'https://www.youtube.com/watch?v=6GIyEJP5FO8'},
  {title:'Sledge',subtitle:'טריגר של ארבע תנועות',tag:'טריגרים · 2 דקות',kind:'sequence',intro:'זה אחד הרצפים השימושיים ב־Bencisco. תרגל אותו עד שתוכל לבצע בלי להסתכל על האותיות.',sequence:["R'",'L','R',"L'"],instruction:'בצע את הרצף לפי הסדר. כאן אנו משתמשים באחיזה עם פינה מקדימה (CIF).',source:'https://www.youtube.com/watch?v=6JT2tU00ccs'},
  {title:'Hedge',subtitle:'הטריגר המשלים',tag:'טריגרים · 2 דקות',kind:'sequence',intro:'הרצף השני שמשמש להפיכת שלשות ולבניית הסיום. התבונן בהשפעתו על הקובייה.',sequence:['R',"B'","R'",'B'],instruction:'בצע את הרצף לפי הסדר, באותה אחיזה עם פינה מקדימה.',source:'https://www.youtube.com/watch?v=6JT2tU00ccs'},
  {title:'אתגר פתור קטן',subtitle:'פתור מצב קצר בדרך שלך',tag:'תרגול · 3 דקות',kind:'solve',intro:'הקובייה מתחילה אחרי שתי תנועות. החזר אותה למצב פתור בכל דרך שתבחר.',setup:'U R',instruction:'נסה לחשוב מהו הסדר ההפוך של שתי התנועות שבוצעו.',source:'https://js.cubing.net/cubing/kpuzzle/'},
  {title:'השלשה התחתונה',subtitle:'LBT · סוגרים את המקום שהשארנו פתוח',tag:'Bencisco · שלב הסיום',kind:'guide',intro:'כעת המרכזים ושתי השלשות מוכנים. חזור לפינה הלבנה שהשארת פתוחה וחבר אליה את שני המשולשים המתאימים בלי לפרק את המרכזים.',steps:['החזק צהוב למעלה ולבן למטה. מצא את הפינה הלבנה החסרה ואת שני המשולשים שצבעי הצד שלהם תואמים לה.','היעזר ב־Sledge או Hedge כדי לשחרר ולהצמיד חלקים. סובב U או U′ כדי ליישר אותם ולחזור על המהלך לפי הצורך.','יישר את המקום הפתוח בעזרת D או D′, הכנס את השלשה ובדוק שהמרכזים והשלשות התחתונות נשארו שלמים.'],instruction:'בנה והכנס את השלשה הלבנה האחרונה. פתח את מקור ההדגמה לצפייה במקרי ההכנסה השונים.',source:'https://www.youtube.com/watch?v=6JT2tU00ccs&t=1707s'},
  {title:'צימוד שלוש השלשות',subtitle:'L3T · Pair Formation',tag:'Bencisco · שלב הסיום',kind:'guide',intro:'נשארו שלוש שלשות בשכבה העליונה. תחילה מחברים את המשולשים לפינות הנכונות, גם אם המיקום של השלשות עדיין לא מושלם.',steps:['החזק צהוב למעלה. אתר פינה עליונה ואת המשולשים שצבעי הצד שלהם תואמים לה.','מצא את המקרה המתאים בדף PF המקושר דרך ״מקור והדגמה״. בדוק את האחיזה לפני הביצוע, משום שהמקרים בדף משתמשים גם באחיזת EIF.','בצע את הרצף של המקרה וחזור על הזיהוי עד שכל שלוש הפינות העליונות מצומדות למשולשים שלהן.'],instruction:'השלם את צימוד השלשות העליונות לפי מקרי PF.',source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {title:'השכבה העליונה',subtitle:'L3T · Top Layer',tag:'Bencisco · שלב הסיום',kind:'guide',intro:'אחרי הצימוד מסדרים את שלוש השלשות במקומות הנכונים בשכבה העליונה. המשולשים האחרונים בצדדים יישארו לשלב הבא.',steps:['שמור על צהוב למעלה ובדוק איזו מהשלשות העליונות נמצאת במקומה ואילו דורשות סיבוב או החלפה.','בחר מקרה מתוך TL בדף ההדגמה. ודא אם ההדגמה מתחילה באחיזת CIF או EIF וסובב את הקובייה בהתאם.','בצע את האלגוריתם ובדוק שהפינות והשלשות העליונות מסודרות לפני המעבר לסיום.'],instruction:'פתור את השכבה העליונה בעזרת מקרה TL המתאים.',source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {title:'המשולשים האחרונים',subtitle:'L3T · Last Triangles',tag:'Bencisco · השלמת הפתרון',kind:'guide',intro:'השלשות מסודרות. כעת נשארים משולשי צד אחדים שאינם במקומם. סידורם מסיים את פתרון ה־FTO.',steps:['השווה את צבעי המשולשים בצדדים לצבעי הפאות שכבר בנית. זהה אילו מהם נותרו להחלפה.','בחר אחד משלושת מקרי LT בדף ההדגמה. בדוק את האחיזה ואת סיבובי הקובייה שמופיעים בתחילת האלגוריתם.','בצע את המקרה ובדוק שכל שמונה הפאות של הקובייה פתורות.'],instruction:'השלם את מקרה LT המתאים עד שהקובייה פתורה.',source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {title:'פתרון מלא',subtitle:'ערבוב FTO ופתרון מן ההתחלה עד הסוף',tag:'אתגר מסכם',kind:'solve',fullSolve:true,intro:'בצע את כל המסלול על קוביית FTO אמיתית או פתר את הערבוב שעל המסך. באימון הווירטואלי האפליקציה מזהה מצב פתור.',instruction:'צור ערבוב, פתר לפי שלבי המסלול וסיים כשהקובייה כולה פתורה.',source:'https://www.youtube.com/watch?v=6JT2tU00ccs'}
];
const SLEDGE = "R' L R L'";
const SLEDGE_PRIME = "L R' L' R";
const HEDGE = "R B' R' B";
const HEDGE_PRIME = "B' R B R'";
const trainerStages = [
  {id:'first-center',title:'המרכז הראשון',subtitle:'מתחילים מערבוב מלא',target:'בנה מרכז אחד בצבע שתבחר ובדוק שסדר צבעי הצד נכון.',generator:'scramble',source:'https://www.youtube.com/watch?v=6GIyEJP5FO8'},
  {id:'two-triples',title:'שתי שלשות',subtitle:'מקרים מקומיים סביב המרכז',target:'חבר פינה ושני משולשי מרכז, ואז בנה שלשה נוספת בלי לפרק את הראשונה.',cases:[
    {name:'Sledge מצד ימין',solution:SLEDGE},{name:'Hedge מצד ימין',solution:HEDGE},{name:'Sledge אחרי U',solution:`U ${SLEDGE} U'`},{name:'Hedge אחרי U′',solution:`U' ${HEDGE} U`},{name:'שני טריגרים רצופים',solution:`${SLEDGE} U ${HEDGE} U'`}
  ],source:'https://www.youtube.com/watch?v=6JT2tU00ccs'},
  {id:'centers',title:'המרכזים הבאים',subtitle:'שמירה על הבלוק הקיים',target:'סדר את משולשי המרכז שנפגעו ושמור על החלקים שכבר בנית.',cases:[
    {name:'החלפת מרכזים A',solution:`${SLEDGE} U ${SLEDGE_PRIME} U'`},{name:'החלפת מרכזים B',solution:`${HEDGE} U' ${HEDGE_PRIME} U`},{name:'שילוב Sledge ו־Hedge',solution:`${SLEDGE} F ${HEDGE} F'`},{name:'מקרה הפוך',solution:`${HEDGE_PRIME} U ${SLEDGE_PRIME} U'`}
  ],source:'https://www.youtube.com/watch?v=6GIyEJP5FO8'},
  {id:'lbt',title:'השלשה התחתונה',subtitle:'LBT · הכנסת השלשה האחרונה',target:'בנה והכנס את השלשה התחתונה האחרונה בלי לפרק את המרכזים.',cases:[
    {name:'כניסה עם Sledge',solution:`U ${SLEDGE} U'`},{name:'כניסה עם Hedge',solution:`U' ${HEDGE} U`},{name:'יישור כפול',solution:`D ${SLEDGE} D' U ${HEDGE} U'`},{name:'מקרה הפוך',solution:`D' ${HEDGE_PRIME} D U' ${SLEDGE_PRIME} U`}
  ],source:'https://www.youtube.com/watch?v=6JT2tU00ccs&t=1707s'},
  {id:'pf',title:'צימוד שלוש השלשות',subtitle:'PF · תשעה מקרים',target:'צמד את שלוש הפינות העליונות למשולשים המתאימים להן.',cases:[
    {name:'PF 1',solution:`${SLEDGE} F`},{name:'PF 2',solution:`${SLEDGE_PRIME} F' R U' R' U F`},{name:'PF 3',solution:`${SLEDGE_PRIME} F' ${SLEDGE_PRIME} F`},{name:'PF 4',solution:`${SLEDGE_PRIME} F' ${SLEDGE_PRIME} F'`},{name:'PF 5',solution:`${SLEDGE} F'`},{name:'PF 6',solution:`${SLEDGE_PRIME} F`},{name:'PF 8',solution:`${SLEDGE_PRIME} F'`},{name:'PF 9',solution:`${SLEDGE_PRIME} F' U' R U R' F'`},{name:'PF 10',solution:`${SLEDGE_PRIME} F' ${SLEDGE_PRIME} F' R U' R' U F`}
  ],source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {id:'tl',title:'השכבה העליונה',subtitle:'TL · חמישה מקרים',target:'סדר את שלוש השלשות העליונות והשאר רק את משולשי הצד לסיום.',cases:[
    {name:'TL 1',solution:SLEDGE},{name:'TL 2',solution:"R U' R' U"},{name:'TL 3',solution:`R U' R' U ${SLEDGE}`},{name:'TL 4',solution:`${SLEDGE_PRIME} R U' R' U`},{name:'TL 5',solution:`U' R U R' ${SLEDGE}`}
  ],source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {id:'lt',title:'המשולשים האחרונים',subtitle:'LT · שלושה מקרים',target:'פתור את משולשי הצד האחרונים וסיים את הקובייה.',cases:[
    {name:'LT 1',solution:"r U R' U' R r' U R U' R'"},{name:'LT 2',solution:"U' R U' R' r U R' U' R r' U'"},{name:'LT 3',solution:"U r R' U R U' r' R U R' U"}
  ],source:'https://hcubist.com/learn/algorithms/fto-3-look-l3t/'},
  {id:'full',title:'פתרון מלא',subtitle:'ערבוב FTO חדש בכל פעם',target:'פתור את הקובייה מן ההתחלה ועד הסוף.',generator:'scramble',source:'https://www.youtube.com/watch?v=6JT2tU00ccs'}
];
const usefulDrills = [
  ["R'",'L','R',"L'",'U','R',"B'","R'",'B',"U'"],
  ['R',"B'","R'",'B','U',"R'",'L','R',"L'","U'"],
  ["R'",'L','R',"L'",'F',"L","R'","L'",'R',"F'"],
  ['U',"R'",'L','R',"L'","U'",'R',"B'","R'",'B','U','F']
];
const state = {completed:new Set(),active:0,quiz:0,sequence:0,moves:[],setup:'',mode:'home',timerStart:0,timerInterval:null,randomScramble:'',model:null,player:null,svg:'',svgColors:new Map(),view:'3d',ready:false,feedback:'',feedbackError:false,installPrompt:null,trainerStage:0,trainerCase:-1,trainerView:'stage',hintVisible:false,drillLength:12,drillKind:'useful',drillSequence:[],drillStep:0,drillApplied:false};
try {
  const current=localStorage.getItem(STORAGE_KEY);
  const previous=localStorage.getItem(PREVIOUS_STORAGE_KEY);
  const stored=JSON.parse(current??previous??localStorage.getItem(LEGACY_STORAGE_KEY)??'[]');
  if(Array.isArray(stored)) state.completed=new Set(stored.map(n=>current!==null?n:previous!==null?n:n-1).filter(n=>Number.isInteger(n)&&n>=0&&n<lessons.length));
  if(current===null)localStorage.setItem(STORAGE_KEY,JSON.stringify([...state.completed]));
} catch {}

function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.classList.remove('show'),3000)}
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify([...state.completed]));renderProgress()}
function complete(){if(state.mode==='lesson'&&!state.completed.has(state.active)){state.completed.add(state.active);persist();toast('מעולה! המשימה הושלמה ✦')}renderTask();renderFooter();renderNav()}
function uncomplete(){if(state.mode!=='lesson')return;state.completed.delete(state.active);persist();renderTask();renderFooter();renderNav()}
function renderProgress(){const n=state.completed.size;$('progressText').textContent=`${n} מתוך ${lessons.length} משימות`;$('progressFill').style.width=`${n/lessons.length*100}%`;renderHomeCards()}
function renderHomeCards(){$('homeLessons').innerHTML=lessons.map((l,i)=>`<button class="home-card ${state.completed.has(i)?'done':''}" data-lesson="${i}"><span class="index">${state.completed.has(i)?'✓':String(i+1).padStart(2,'0')}</span><h3>${l.title}</h3><p>${l.subtitle}</p><span class="card-arrow">←</span></button>`).join('')}
function renderNav(){
  const heading=document.querySelector('.sidebar-heading');
  const tip=document.querySelector('.sidebar-tip p');
  if(state.mode==='trainer'){
    heading.textContent='בחר שלב לאימון';
    tip.textContent='כל לחיצה על ״מקרה אחר״ בוחרת מצב שונה באותו שלב.';
    $('lessonNav').innerHTML=`<button class="nav-item ${state.trainerView==='moves'?'active':''}" data-trainer-view="moves"><span class="nav-num">↻</span>רצפים וערבובים</button>${trainerStages.map((s,i)=>`<button class="nav-item ${state.trainerView==='stage'&&state.trainerStage===i?'active':''}" data-trainer-stage="${i}"><span class="nav-num">${i+1}</span>${s.title}</button>`).join('')}`;
    return;
  }
  heading.textContent='המסלול שלי';
  tip.textContent='אפשר לחזור לכל משימה בכל רגע. טעויות הן חלק מהאימון.';
  $('lessonNav').innerHTML=lessons.map((l,i)=>`<button class="nav-item ${state.mode==='lesson'&&state.active===i?'active':''}" data-lesson="${i}"><span class="nav-num">${state.completed.has(i)?'✓':i+1}</span>${l.title}</button>`).join('')
}
function showHome(){state.mode='home';$('homeView').classList.remove('hidden');$('lessonView').classList.add('hidden');location.hash='home';window.scrollTo(0,0);renderProgress()}
function openLesson(index){state.mode='lesson';state.active=index;state.quiz=0;state.sequence=0;state.moves=[];state.feedback='';state.feedbackError=false;state.setup=lessons[index].setup||'';showWorkspace();renderLesson();syncPuzzle();location.hash=`lesson-${index+1}`;if(lessons[index].fullSolve&&state.ready)scramble()}
function openLab(){state.mode='lab';state.moves=[];state.setup='';state.randomScramble='';state.feedback='';stopTimer();showWorkspace();renderLesson();syncPuzzle();location.hash='lab'}
function openTrainer(){state.mode='trainer';state.trainerView='stage';state.moves=[];state.setup='';state.feedback='';state.feedbackError=false;stopTimer();showWorkspace();renderLesson();location.hash='trainer';if(state.ready)newTrainerCase()}
function invertAlg(alg){return alg.trim().split(/\s+/).reverse().map(move=>move.endsWith("'")?move.slice(0,-1):`${move}'`).join(' ')}
function chooseDifferent(length,current){if(length<2)return 0;let next=current;while(next===current)next=Math.floor(Math.random()*length);return next}
async function randomFtoScramble(){const {randomScrambleForEvent}=await import('https://cdn.cubing.net/v0/js/cubing/scramble');return (await randomScrambleForEvent('fto')).toString()}
async function newTrainerCase(){
  if(!state.ready){toast('קוביית FTO עדיין נטענת');return}
  const stage=trainerStages[state.trainerStage];
  state.moves=[];state.feedback='';state.feedbackError=false;state.hintVisible=false;
  try{
    if(stage.generator==='scramble'){
      state.trainerCase=-1;state.setup=await randomFtoScramble();state.randomScramble=state.setup;
    }else{
      state.trainerCase=chooseDifferent(stage.cases.length,state.trainerCase);
      state.setup=invertAlg(stage.cases[state.trainerCase].solution);
    }
    syncPuzzle();renderTask();renderControls();renderLessonVisual();
  }catch(error){console.error('Unable to create trainer case',error);toast('לא ניתן ליצור את המקרה הזה. נסה מקרה אחר.')}
}
function selectTrainerStage(index){state.trainerView='stage';state.trainerStage=index;state.trainerCase=-1;renderNav();renderLesson();if(state.ready)newTrainerCase();location.hash=`trainer-${trainerStages[index].id}`}
function openMoveTrainer(){state.trainerView='moves';state.setup='';state.moves=[];state.feedback='';renderNav();if(state.ready)generateDrill();else{renderLesson();syncPuzzle()}location.hash='trainer-moves'}
function showWorkspace(){$('homeView').classList.add('hidden');$('lessonView').classList.remove('hidden');renderNav();window.scrollTo(0,0);renderPuzzleViews()}
function pieceID(orbit,index,orientation){return `${orbit}-l${index}-o${orientation}`}
function renderFtoNet(){if(!state.svg)return;const host=$('puzzle2d');if(!host.querySelector('svg')){host.innerHTML=state.svg;host.querySelectorAll('[id]').forEach(el=>{const color=el.style.fill||el.getAttribute('fill');if(color)state.svgColors.set(el.id,color)});host.querySelector('svg')?.setAttribute('aria-label','פריסת FTO אינטראקטיבית')}updateFtoNet()}
function updateFtoNet(){if(!state.ready||!state.model||!state.svgColors.size)return;try{const alg=currentAlg();const pattern=state.model.defaultPattern().applyAlg(alg);for(const orbit of pattern.kpuzzle.definition.orbits){const current=pattern.patternData[orbit.orbitName];for(let index=0;index<orbit.numPieces;index++){for(let orientation=0;orientation<orbit.numOrientations;orientation++){const target=$('puzzle2d').querySelector(`#${pieceID(orbit.orbitName,index,orientation)}`);const sourceID=pieceID(orbit.orbitName,current.pieces[index],(orbit.numOrientations-current.orientation[index]+orientation)%orbit.numOrientations);const color=state.svgColors.get(sourceID);if(target&&color)target.style.fill=color}}}}catch(error){console.error('Unable to update FTO net',error)}}
function currentAlg(moves=state.moves){return [state.setup,...moves].filter(Boolean).join(' ')}
function renderPlayer(){if(state.player&&!$('puzzle3d').contains(state.player))$('puzzle3d').append(state.player)}
function renderPuzzleViews(){renderPlayer();renderFtoNet();setPuzzleView(state.view)}
function setPuzzleView(view){state.view=view;$('puzzle3d').classList.toggle('hidden',view!=='3d');$('puzzle2d').classList.toggle('hidden',view!=='2d');document.querySelectorAll('[data-view]').forEach(button=>{const active=button.dataset.view===view;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});if(view==='2d')renderFtoNet();else renderPlayer()}
function setPlayerState(){if(!state.player)return;state.player.pause();state.player.experimentalSetupAlg=currentAlg()||"U U'";state.player.alg="U U'";state.player.jumpToStart({flash:false})}
function animatePlayerMove(move){if(!state.player)return;const before=state.moves.slice(0,-1);state.player.pause();state.player.experimentalSetupAlg=currentAlg(before)||"U U'";state.player.alg=move;requestAnimationFrame(()=>requestAnimationFrame(()=>{state.player.jumpToStart({flash:false});state.player.play()}))}
function applyTheme(theme){document.documentElement.dataset.theme=theme;const dark=theme==='dark';$('themeBtn').textContent=dark?'☀':'☾';$('themeBtn').setAttribute('aria-label',dark?'הפעלת מצב בהיר':'הפעלת מצב כהה');$('themeBtn').title=dark?'מצב בהיר':'מצב כהה';document.querySelector('meta[name="theme-color"]').content=dark?'#0b1220':'#111a2d'}
function initTheme(){const saved=localStorage.getItem(THEME_KEY);applyTheme(saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))}
function toggleTheme(){const next=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem(THEME_KEY,next);applyTheme(next)}
function randomMoveSequence(length){
  const faces=['U','F','R','L','B','D','BL','BR'];const result=[];let previous='';
  while(result.length<length){const face=faces[Math.floor(Math.random()*faces.length)];if(face===previous)continue;result.push(Math.random()<.5?face:`${face}'`);previous=face}
  return result
}
function usefulMoveSequence(length){
  const result=[];
  while(result.length<length){const block=usefulDrills[Math.floor(Math.random()*usefulDrills.length)];if(result.length)result.push(Math.random()<.5?'U':"U'");result.push(...block)}
  return result.slice(0,length)
}
function generateDrill(){state.drillSequence=state.drillKind==='useful'?usefulMoveSequence(state.drillLength):randomMoveSequence(state.drillLength);state.drillStep=0;state.drillApplied=false;state.moves=[];state.setup='';state.feedback='';syncPuzzle();renderTask();renderControls()}
async function generateFullDrill(){try{state.drillKind='full';state.drillSequence=(await randomFtoScramble()).split(/\s+/);state.drillStep=0;state.drillApplied=false;state.moves=[];state.setup='';state.feedback='';syncPuzzle();renderTask();renderControls()}catch(error){console.error(error);toast('יצירת ערבוב מלא אינה זמינה כרגע.')}}
function playDrill(){if(!state.player||!state.drillSequence.length)return;state.player.pause();state.player.experimentalSetupAlg="U U'";state.player.alg=state.drillSequence.join(' ');state.player.jumpToStart({flash:false});state.player.play()}
function applyDrillAsSetup(){state.setup=state.drillSequence.join(' ');state.moves=[];state.drillStep=0;state.drillApplied=true;state.feedback='המצב הוחל. עכשיו נסה להחזיר את הקובייה למצב פתור.';syncPuzzle();renderTask();renderControls()}
function renderLesson(){
  const l=lessons[state.active];
  if(state.mode==='trainer'){
    if(state.trainerView==='moves'){$('chapterTag').textContent='אימון ממוקד';$('lessonCount').textContent=`${state.drillSequence.length||state.drillLength} תנועות`;$('lessonTitle').textContent='רצפים וערבובים';$('lessonIntro').textContent='תרגל רצפים שימושיים, רצפים אקראיים וערבוב FTO מלא. אפשר לבצע לפי הסדר, לצפות בהנפשה או להחיל את הרצף כמצב פתיחה.'}
    else{const stage=trainerStages[state.trainerStage];$('chapterTag').textContent='אימון שלב';$('lessonCount').textContent=`שלב ${state.trainerStage+1} מתוך ${trainerStages.length}`;$('lessonTitle').textContent=stage.title;$('lessonIntro').textContent=`${stage.subtitle}. בכל ניסיון מתקבל מצב פתיחה אחר שמתאים לאותו נושא.`}
  }else{$('chapterTag').textContent=state.mode==='lab'?'מעבדת אימון':l.tag;$('lessonCount').textContent=state.mode==='lab'?'תרגול חופשי':`${state.active+1} / ${lessons.length}`;$('lessonTitle').textContent=state.mode==='lab'?'מעבדת הקובייה':l.title;$('lessonIntro').textContent=state.mode==='lab'?'התנסה בתנועות, צור ערבוב מלא לאימון, או מדוד פתרון על הקובייה שבידך.':l.intro}
  renderTask();renderFooter();renderControls();renderLessonVisual()
}

const faceExamples = [
  [
    {label:'שלוש צלעות לבנות', faces:[{edges:'#fff8eb'}]},
    {label:'משושה לבן שלם', faces:[{edges:'#fff8eb', centers:'#fff8eb'}]}
  ],
  [
    {label:'אותה פינה בשתי פאות צד', faces:[{corner:'#f56a5b'}, {corner:'#53a6fc'}]},
    {label:'מוסיפים משולש מרכז בצבע תואם בכל צד', faces:[{corner:'#f56a5b', nearCenter:'#f56a5b'}, {corner:'#53a6fc', nearCenter:'#53a6fc'}]}
  ],
  [
    {label:'שומרים על המרכז שכבר בנינו', faces:[{edges:'#fff8eb', centers:'#fff8eb'}]},
    {label:'בונים משושה נוסף בצבע של הפאה', faces:[{edges:'#53a6fc', centers:'#53a6fc'}]}
  ],
  null,
  null,
  null,
  [
    {label:'השלשה התחתונה חסרה', faces:[{corner:'#fff8eb'}, {nearCenter:'#fff8eb'}]},
    {label:'פינה ושני משולשים תואמים', faces:[{corner:'#fff8eb', nearCenter:'#fff8eb', centers:'#fff8eb'}]}
  ],
  [
    {label:'משולשים לא צמודים לפינה', faces:[{corner:'#f3d84f'}, {nearCenter:'#f3d84f'}]},
    {label:'משולשים צמודים לפינה', faces:[{corner:'#f3d84f', nearCenter:'#f3d84f', centers:'#f3d84f'}]}
  ],
  [
    {label:'שלשות עליונות לפני סידור', faces:[{corner:'#f3d84f'}, {corner:'#f3d84f'}]},
    {label:'שלשות עליונות מסודרות', faces:[{corner:'#f3d84f', nearCenter:'#f3d84f'}, {corner:'#f3d84f', nearCenter:'#f3d84f'}]}
  ],
  [
    {label:'משולשי צד שעדיין אינם תואמים', faces:[{edges:'#536177', nearCenter:'#f56a5b'}]},
    {label:'כל החלקים בצבע הפאה', faces:[{edges:'#f56a5b', centers:'#f56a5b', corner:'#f56a5b'}]}
  ]
];

function faceDiagram({edges, centers, corner, nearCenter}) {
  const colors = [corner, edges, nearCenter || centers, edges, null, centers, edges, centers, null];
  const triangles = [];
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < row * 2 + 1; column++) {
      const x = 60 - row * 18 + column * 18;
      const y = 8 + row * 31;
      const points = column % 2 === 0
        ? `${x},${y} ${x - 18},${y + 31} ${x + 18},${y + 31}`
        : `${x - 18},${y} ${x + 18},${y} ${x},${y + 31}`;
      const fill = colors[triangles.length] || '#536177';
      triangles.push(`<polygon points="${points}" fill="${fill}"/>`);
    }
  }
  return `<svg aria-hidden="true" viewBox="0 0 120 108" stroke="#172338" stroke-width="2">${triangles.join('')}</svg>`;
}

function patternPreview(alg) {
  const template = document.createElement('template');
  template.innerHTML = state.svg;
  const svg = template.content.querySelector('svg');
  const pattern = state.model.defaultPattern().applyAlg(alg);
  for (const orbit of pattern.kpuzzle.definition.orbits) {
    const data = pattern.patternData[orbit.orbitName];
    for (let index = 0; index < orbit.numPieces; index++) {
      for (let orientation = 0; orientation < orbit.numOrientations; orientation++) {
        const target = svg.querySelector(`#${pieceID(orbit.orbitName, index, orientation)}`);
        const originalOrientation = (orbit.numOrientations - data.orientation[index] + orientation) % orbit.numOrientations;
        const color = state.svgColors.get(pieceID(orbit.orbitName, data.pieces[index], originalOrientation));
        if (target && color) target.style.fill = color;
      }
    }
  }
  svg.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  svg.setAttribute('aria-hidden', 'true');
  return svg.outerHTML;
}

function renderLessonVisual() {
  $('lessonVisual')?.remove();
  if (state.mode !== 'lesson') return;
  const lesson = lessons[state.active];
  const examples = lesson.kind === 'guide' ? faceExamples[state.active - 1] : null;
  if (!examples && (!state.svgColors.size || (lesson.fullSolve && !state.setup))) return;
  const previews = examples
    ? examples.map(({label, faces}) => [label, faces.map(faceDiagram).join('')])
    : lesson.kind === 'solve'
      ? [['מצב הפתיחה', patternPreview(state.setup)], ['יעד: כל פאה בצבע אחד', patternPreview('')]]
      : state.active === 0
        ? [['אחרי U', patternPreview('U')], ['אחרי U ואז U′', patternPreview("U U'")]]
        : [['לפני הטריגר', patternPreview('')], ['אחרי הטריגר', patternPreview(lesson.sequence.join(' '))]];
  $('lessonTask').insertAdjacentHTML('afterend', `
    <section id="lessonVisual" class="lesson-visual" aria-label="המחשה למשימה">
      <h3>${examples ? 'מה לחפש על הקובייה' : 'איך זה נראה על הקובייה'}</h3>
      <div class="visual-cards">${previews.map(([label, drawing]) => `
        <figure><div class="visual-drawing">${drawing}</div><figcaption>${label}</figcaption></figure>
      `).join('')}</div>
      ${examples ? '<p>התרשים מדגיש את החלקים הרלוונטיים. הצבעים להמחשה.</p>' : ''}
    </section>`);
}
function renderTask(){const box=$('lessonTask');const l=lessons[state.active];
  if(state.mode==='trainer'){
    if(state.trainerView==='moves'){
      const sequence=state.drillSequence;
      box.innerHTML=`<div class="task-kicker">MOVE TRAINER</div><h3>בחר סוג ואורך</h3><div class="trainer-options"><div class="segmented"><button class="${state.drillKind==='useful'?'active':''}" data-drill-kind="useful">רצפים שימושיים</button><button class="${state.drillKind==='random'?'active':''}" data-drill-kind="random">תנועות אקראיות</button></div><div class="segmented">${[8,12,20].map(n=>`<button class="${state.drillLength===n&&state.drillKind!=='full'?'active':''}" data-drill-length="${n}">${n} תנועות</button>`).join('')}<button class="${state.drillKind==='full'?'active':''}" data-action="drill-full">ערבוב מלא</button></div></div><div class="sequence trainer-sequence">${sequence.map((m,i)=>`<span class="${!state.drillApplied&&i<state.drillStep?'passed':!state.drillApplied&&i===state.drillStep?'current':''}">${m}</span>`).join('')}</div><div class="move-goal"><small>${state.drillApplied?'מצב האימון':'התנועה הבאה'}</small><code>${state.drillApplied?'פתור את הקובייה':sequence[state.drillStep]||'✓ הרצף הושלם'}</code></div><div class="trainer-actions"><button class="next-btn" data-action="drill-new">רצף אחר</button><button class="answer compact" data-action="drill-play">נגן הנפשה ▶</button><button class="answer compact" data-action="drill-apply">החל כמצב פתיחה</button></div><div class="task-feedback ${state.feedbackError?'error':''}" role="status">${state.feedback}</div>`;
      return
    }
    const stage=trainerStages[state.trainerStage];const current=stage.cases?.[state.trainerCase];
    box.innerHTML=`<div class="task-kicker">STAGE TRAINER</div><h3>${stage.target}</h3><p>${stage.generator==='scramble'?'הערבוב משתנה במלואו בכל ניסיון.':'המקרה נבחר מתוך בנק מצבים של השלב. מקרה חדש לא יחזור מיד על הקודם.'}</p><div class="case-badge">${current?.name||'ערבוב מלא'}</div><div class="move-goal trainer-setup"><small>מצב פתיחה</small><code class="scramble-code">${state.setup||'מייצר מצב…'}</code></div>${current?`<button class="hint-toggle" data-action="trainer-hint">${state.hintVisible?`פתרון: ${current.solution}`:'הצג רמז לפתרון'}</button>`:''}<div class="trainer-actions"><button class="next-btn" data-action="trainer-new">מקרה אחר</button><button class="answer compact" data-action="timer">${state.timerStart?'עצור טיימר':'התחל טיימר'}</button></div><div id="timerReadout" class="alg-display trainer-timer">00:00.0</div><div class="task-feedback ${state.feedbackError?'error':''}" role="status">${state.feedback}</div>`;
    return
  }
  if(state.mode==='lab'){box.innerHTML=`<div class="task-kicker">FREE PLAY</div><h3>ניסוי, ערבוב וזמן</h3><p>הקובייה הווירטואלית מגיבה לתנועות בכפתורים. את הערבוב אפשר להחיל גם על קובייה פיזית.</p><div class="move-goal"><small>ערבוב</small><code id="scrambleText" style="font-size:13px;max-width:75%;overflow:auto">${state.randomScramble||'הקובייה פתורה'}</code></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:17px"><button class="next-btn" data-action="scramble">צור ערבוב FTO</button><button class="answer" data-action="timer" style="width:auto">${state.timerStart?'עצור טיימר':'התחל טיימר'}</button></div><div id="timerReadout" class="alg-display" style="margin-top:17px">00:00.0</div>`;return}
  const done=state.completed.has(state.active);let html=`<div class="task-kicker">${done?'✓ הושלם · אפשר לתרגל שוב':'המשימה שלך'}</div>`;
  if(l.kind==='quiz'){const q=l.questions[state.quiz];if(q){html+=`<h3>${q.q}</h3><p>בחר תשובה כדי להתקדם.</p><div class="answer-list">${q.options.map((o,i)=>`<button class="answer" data-answer="${i}">${o}</button>`).join('')}</div>`}else{html+=`<h3>אתה רואה את המבנה!</h3><p>עכשיו אפשר להתחיל להזיז את הקובייה ולקרוא את הסימון שלה.</p>`}}
  if(l.kind==='sequence'){html+=`<h3>${l.instruction}</h3><div class="sequence">${l.sequence.map((m,i)=>`<span class="${i<state.sequence?'passed':i===state.sequence?'current':''}">${m}</span>`).join('')}</div><div class="move-goal"><small>התנועה הבאה</small><code>${l.sequence[state.sequence]||'✓ הושלם'}</code></div>`}
  if(l.kind==='guide'){html+=`<h3>נסה על הקובייה שלך</h3><p>${l.instruction}</p><div class="answer-list">${l.steps.map((s,i)=>`<div class="answer" style="cursor:default">${i+1}. ${s}</div>`).join('')}</div><button class="next-btn" data-action="guide-done" style="margin-top:17px">ביצעתי על הקובייה שלי ✓</button>`}
  if(l.kind==='solve'){html+=`<h3>החזר את הקובייה למצב פתור</h3><p>${l.instruction}</p>${l.fullSolve?'<button class="next-btn" data-action="scramble">צור ערבוב חדש</button>':''}<div class="move-goal"><small>מצב פתיחה</small><code class="scramble-code">${state.setup||'לחץ על יצירת ערבוב'}</code></div><div class="pill-note">אפשר לפתור בכמה דרכים. הכפתורים מימין מסובבים את הקובייה; האפליקציה בודקת את המצב הסופי.</div>${l.fullSolve?'<button class="answer physical-done" data-action="guide-done">פתרתי את הקובייה הפיזית ✓</button>':''}`}
  html+=`<div class="task-feedback ${state.feedbackError?'error':''}" role="status">${state.feedback}</div>`;box.innerHTML=html}
function renderFooter(){
  if(state.mode==='trainer'){const source=state.trainerView==='stage'?trainerStages[state.trainerStage].source:'https://nautilusfto.com/Notation/';$('lessonFooter').innerHTML=`<a class="source-link" href="${source}" target="_blank" rel="noopener noreferrer">מקור והדגמה ↗</a><button class="next-btn" data-action="home">חזרה למסלול →</button>`;return}
  if(state.mode==='lab'){$('lessonFooter').innerHTML='<button class="next-btn" data-action="home">חזרה למסלול →</button>';return}const l=lessons[state.active];const next=state.active<lessons.length-1;const label=next?'למשימה הבאה ←':'למעבדה ←';$('lessonFooter').innerHTML=`<a class="source-link" href="${l.source}" target="_blank" rel="noopener noreferrer">מקור והדגמה ↗</a>${state.completed.has(state.active)?'<button class="source-link" data-action="uncomplete">בטל סימון השלמה</button>':''}<button class="next-btn" data-action="next" ${state.completed.has(state.active)?'':'disabled'}>${label}</button>`}
function renderControls(){const enabled=state.mode==='lab'||state.mode==='trainer'||['sequence','solve'].includes(lessons[state.active].kind);const faces=state.mode==='trainer'&&state.trainerView==='stage'&&trainerStages[state.trainerStage].id==='lt'?['U','F','R','L','B','D','BL','BR','r']:['U','F','R','L','B','D','BL','BR'];$('moveControls').style.opacity=enabled?'1':'.6';$('moveGrid').classList.toggle('advanced',faces.length>8);$('moveGrid').innerHTML=faces.map(face=>`<div class="move-pair"><button type="button" data-move="${face}" ${enabled?'':'disabled'} aria-label="${face}">${face}</button><button type="button" data-move="${face}'" ${enabled?'':'disabled'} aria-label="${face} prime">${face}′</button></div>`).join('');$('undoBtn').disabled=!enabled;$('moveCounter').textContent=`${state.moves.length} תנועות`}
function syncPuzzle({animateMove}={}){if(!state.ready)return;renderFtoNet();updateFtoNet();if(animateMove)animatePlayerMove(animateMove);else setPlayerState();$('moveCounter').textContent=`${state.moves.length} תנועות`}
function say(message,error=false){state.feedback=message;state.feedbackError=error;const el=document.querySelector('.task-feedback');if(el){el.textContent=message;el.classList.toggle('error',error)}else toast(message)}
function applyMove(move){
  const l=lessons[state.active];
  if(state.mode==='trainer'&&state.trainerView==='moves'&&!state.drillApplied){
    const expected=state.drillSequence[state.drillStep];if(!expected)return;
    if(move!==expected){say(`כמעט. התנועה הבאה היא ${expected}`,true);return}
    state.moves.push(move);state.drillStep++;state.feedbackError=false;state.feedback=state.drillStep===state.drillSequence.length?'הרצף הושלם! אפשר לנגן אותו שוב או לקבל רצף אחר.':'יפה, ממשיכים.';syncPuzzle({animateMove:move});renderTask();return
  }
  if(state.mode!=='lab'&&state.mode!=='trainer'&&!['sequence','solve'].includes(l.kind))return;
  if(state.mode==='lesson'&&l.kind==='sequence'&&state.sequence<l.sequence.length&&move!==l.sequence[state.sequence]){say(`כמעט. התנועה הבאה היא ${l.sequence[state.sequence]}`,true);return}
  state.moves.push(move);syncPuzzle({animateMove:move});
  if(state.mode==='lesson'&&l.kind==='sequence'){state.sequence++;state.feedback='יפה! המשך לתנועה הבאה.';state.feedbackError=false;if(state.sequence===l.sequence.length){state.feedback='הרצף הושלם. נסה שוב בלי להביט באותיות!';complete()}else renderTask()}
  else if(state.mode==='lesson'&&l.kind==='solve')checkSolved();
  else if((state.mode==='lab'||state.mode==='trainer')&&state.setup)checkSolved()
}
function checkSolved(){if(!state.model){say('בדיקת מצב הקובייה עדיין נטענת.',true);return}try{const alg=[state.setup,...state.moves].filter(Boolean).join(' ');const pattern=state.model.defaultPattern().applyAlg(alg);const solved=pattern.experimentalIsSolved({ignoreCenterOrientation:true,ignorePuzzleOrientation:true});if(solved&&state.moves.length){if(state.mode==='lesson'){say('פתרת את האתגר בדרך שלך!');complete()}else{say('הקובייה פתורה! מוכן למקרה הבא ✦');stopTimer()}}}catch(e){console.error(e);say('לא ניתן לבדוק את מצב הקובייה כרגע.',true)}}
function undo(){if(!state.moves.length)return;state.moves.pop();if(state.mode==='lesson'&&lessons[state.active].kind==='sequence')state.sequence=Math.max(0,state.sequence-1);if(state.mode==='trainer'&&state.trainerView==='moves'&&!state.drillApplied)state.drillStep=Math.max(0,state.drillStep-1);state.feedback='';syncPuzzle();renderTask()}
function resetPractice(){state.moves=[];state.sequence=0;state.feedback='';if(state.mode==='trainer'&&state.trainerView==='moves'){state.drillStep=0;state.drillApplied=false;state.setup=''}else if(state.mode!=='trainer')state.setup=state.mode==='lab'||lessons[state.active].fullSolve?state.randomScramble:(lessons[state.active].setup||'');syncPuzzle();renderTask();renderControls();renderLessonVisual()}
async function scramble(){if(!state.ready){toast('קוביית FTO עדיין נטענת');return}const button=document.querySelector('[data-action="scramble"]');button.disabled=true;button.textContent='מייצר ערבוב…';try{const {randomScrambleForEvent}=await import('https://cdn.cubing.net/v0/js/cubing/scramble');state.randomScramble=(await randomScrambleForEvent('fto')).toString();state.setup=state.randomScramble;state.moves=[];syncPuzzle();renderTask();renderControls();renderLessonVisual()}catch(e){console.error(e);toast('יצירת ערבוב לא זמינה כרגע. בדוק את החיבור לאינטרנט.');if(button){button.disabled=false;button.textContent='צור ערבוב חדש'}}}
function stopTimer(){if(state.timerInterval){clearInterval(state.timerInterval);state.timerInterval=null}state.timerStart=0}
function toggleTimer(){if(state.timerStart){stopTimer();const btn=document.querySelector('[data-action="timer"]');if(btn)btn.textContent='התחל טיימר';return}state.timerStart=performance.now();const btn=document.querySelector('[data-action="timer"]');if(btn)btn.textContent='עצור טיימר';state.timerInterval=setInterval(()=>{const t=(performance.now()-state.timerStart)/1000;const min=Math.floor(t/60).toString().padStart(2,'0');const sec=(t%60).toFixed(1).padStart(4,'0');const display=$('timerReadout');if(display)display.textContent=`${min}:${sec}`},100)}
function installHelp(){const ios=/iPad|iPhone|iPod/.test(navigator.userAgent);$('installInstructions').innerHTML=ios?'באייפון: פתח את הקישור ב־Safari, לחץ על כפתור השיתוף <strong>□↑</strong> ובחר <strong>״הוסף למסך הבית״</strong>.':'ב־Chrome: פתח את תפריט הדפדפן ובחר <strong>״התקנת אפליקציה״</strong> או <strong>״הוספה למסך הבית״</strong>.';$('installModal').classList.remove('hidden')}
document.addEventListener('click',async e=>{
  const lesson=e.target.closest('[data-lesson]');if(lesson){openLesson(Number(lesson.dataset.lesson));return}
  const trainerStage=e.target.closest('[data-trainer-stage]');if(trainerStage){selectTrainerStage(Number(trainerStage.dataset.trainerStage));return}
  const trainerView=e.target.closest('[data-trainer-view]');if(trainerView){openMoveTrainer();return}
  const drillKind=e.target.closest('[data-drill-kind]');if(drillKind){state.drillKind=drillKind.dataset.drillKind;generateDrill();return}
  const drillLength=e.target.closest('[data-drill-length]');if(drillLength){state.drillLength=Number(drillLength.dataset.drillLength);if(state.drillKind==='full')state.drillKind='useful';generateDrill();return}
  const view=e.target.closest('[data-view]');if(view){setPuzzleView(view.dataset.view);return}
  const move=e.target.closest('[data-move]');if(move){applyMove(move.dataset.move);return}
  const ans=e.target.closest('[data-answer]');if(ans){const l=lessons[state.active],q=l.questions[state.quiz],correct=Number(ans.dataset.answer)===q.answer;ans.classList.add(correct?'correct':'wrong');say(correct?q.why:'נסה שוב — הסתכל על המבנה של הקובייה.',!correct);if(correct){document.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);setTimeout(()=>{state.quiz++;state.feedback='';if(state.quiz>=l.questions.length)complete();else renderTask()},850)}return}
  const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;
  if(action==='guide-done')complete();if(action==='uncomplete')uncomplete();if(action==='next')state.active<lessons.length-1?openLesson(state.active+1):openLab();if(action==='home')showHome();if(action==='scramble')await scramble();if(action==='timer')toggleTimer();if(action==='trainer-new')await newTrainerCase();if(action==='trainer-hint'){state.hintVisible=!state.hintVisible;renderTask()}if(action==='drill-new'){if(state.drillKind==='full')await generateFullDrill();else generateDrill()}if(action==='drill-full')await generateFullDrill();if(action==='drill-play')playDrill();if(action==='drill-apply')applyDrillAsSetup()
});
$('startBtn').addEventListener('click',()=>openLesson(lessons.findIndex((_,i)=>!state.completed.has(i))<0?0:lessons.findIndex((_,i)=>!state.completed.has(i))));$('trainerBtn').addEventListener('click',openTrainer);$('labBtn').addEventListener('click',openLab);$('backBtn').addEventListener('click',showHome);$('undoBtn').addEventListener('click',undo);$('resetBtn').addEventListener('click',resetPractice);$('resetViewBtn').addEventListener('click',resetPractice);$('themeBtn').addEventListener('click',toggleTheme);$('installBtn').addEventListener('click',async()=>{if(state.installPrompt){state.installPrompt.prompt();await state.installPrompt.userChoice;state.installPrompt=null}else installHelp()});$('closeModal').addEventListener('click',()=>$('installModal').classList.add('hidden'));$('modalOk').addEventListener('click',()=>$('installModal').classList.add('hidden'));$('installModal').addEventListener('click',e=>{if(e.target===$('installModal'))$('installModal').classList.add('hidden')});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.installPrompt=e});window.addEventListener('appinstalled',()=>toast('FTO Quest הותקנה במסך הבית!'));
initTheme();renderProgress();renderNav();if(location.hash==='#lab')openLab();else if(location.hash==='#trainer-moves'){openTrainer();openMoveTrainer()}else if(location.hash==='#trainer')openTrainer();else if(location.hash.startsWith('#trainer-')){const stageId=location.hash.slice('#trainer-'.length);const stageIndex=trainerStages.findIndex(stage=>stage.id===stageId);openTrainer();if(stageIndex>=0)selectTrainerStage(stageIndex)}else if(/^#lesson-(\d+)$/.test(location.hash)){const i=Number(location.hash.match(/\d+/)[0])-1;if(i>=0&&i<lessons.length)openLesson(i)}
try{const {puzzles}=await import('https://cdn.cubing.net/v0/js/cubing/puzzles');state.model=await puzzles.fto.kpuzzle();state.svg=await puzzles.fto.svg();try{await import('https://cdn.cubing.net/v0/js/cubing/twisty');state.player=$('ftoPlayer');state.player.tempoScale=1.45;renderPlayer()}catch(playerError){console.error('Animated FTO player unavailable',playerError);state.view='2d';toast('הנגן המונפש לא נטען; מוצגת פריסת 2D.')}state.ready=true;if(state.mode!=='home'){renderPuzzleViews();syncPuzzle();renderLessonVisual();if(state.mode==='trainer'){if(state.trainerView==='moves')generateDrill();else newTrainerCase()}else if(lessons[state.active]?.fullSolve)scramble()}$('loadingCube').classList.add('hidden')}catch(e){console.error('FTO engine unavailable',e);$('loadingCube').textContent='לא ניתן לטעון את הקובייה. בדוק חיבור לאינטרנט ורענן את הדף.'}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
