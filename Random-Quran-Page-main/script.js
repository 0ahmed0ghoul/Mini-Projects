const quranSurahPages = {
    1: { name: "الفاتحة", pages: 1 },
    2: { name: "البقرة", pages: 48 },
    3: { name: "آل عمران", pages: 26 },
    4: { name: "النساء", pages: 22 },
    5: { name: "المائدة", pages: 20 },
    6: { name: "الأنعام", pages: 22 },
    7: { name: "الأعراف", pages: 24 },
    8: { name: "الأنفال", pages: 10 },
    9: { name: "التوبة", pages: 20 },
    10: { name: "يونس", pages: 11 },
    11: { name: "هود", pages: 10 },
    12: { name: "يوسف", pages: 12 },
    13: { name: "الرعد", pages: 6 },
    14: { name: "إبراهيم", pages: 6 },
    15: { name: "الحجر", pages: 6 },
    16: { name: "النحل", pages: 10 },
    17: { name: "الإسراء", pages: 11 },


    18: { name: "الكهف", pages: 11 },
    19: { name: "مريم", pages: 9 },
    20: { name: "طه", pages: 9 },
    21: { name: "الأنبياء", pages: 7 },
    22: { name: "الحج", pages: 10 },
    23: { name: "المؤمنون", pages: 7 },
    24: { name: "النور", pages: 10 },
    25: { name: "الفرقان", pages: 6 },
    26: { name: "الشعراء", pages: 9 },
    27: { name: "النمل", pages: 8 },
    28: { name: "القصص", pages: 10 },
    29: { name: "العنكبوت", pages: 7 },
    30: { name: "الروم", pages: 6 },
    31: { name: "لقمان", pages: 3 },
    32: { name: "السجدة", pages: 3 },
    33: { name: "الأحزاب", pages: 9 },
    34: { name: "سبأ", pages: 6 },
    35: { name: "فاطر", pages: 5 },
    36: { name: "يس", pages: 5 },
    37: { name: "الصافات", pages: 7 },
    38: { name: "ص", pages: 6 },
    39: { name: "الزمر", pages: 8 },
    40: { name: "غافر", pages: 9 },
    41: { name: "فصلت", pages: 6 },
    42: { name: "الشورى", pages: 6 },
    43: { name: "الزخرف", pages: 7 },
    44: { name: "الدخان", pages: 3 },
    45: { name: "الجاثية", pages: 3 },
    46: { name: "الأحقاف", pages: 4 },
    47: { name: "محمد", pages: 4 },
    48: { name: "الفتح", pages: 4 },
    49: { name: "الحجرات", pages: 3 },
    50: { name: "ق", pages: 3 },
    51: { name: "الذاريات", pages: 3 },
    52: { name: "الطور", pages: 3 },
    53: { name: "النجم", pages: 3 },
    54: { name: "القمر", pages: 3 },
    55: { name: "الرحمن", pages: 3 },
    56: { name: "الواقعة", pages: 4 },
    57: { name: "الحديد", pages: 4 },
    58: { name: "المجادلة", pages: 3 },
    59: { name: "الحشر", pages: 3 },
    60: { name: "الممتحنة", pages: 3 },
    61: { name: "الصف", pages: 2 },
    62: { name: "الجمعة", pages: 2 },
    63: { name: "المنافقون", pages: 2 },
    64: { name: "التغابن", pages: 2 },
    65: { name: "الطلاق", pages: 3 },
    66: { name: "التحريم", pages: 2 },
    67: { name: "الملك", pages: 3 },
    68: { name: "القلم", pages: 4 },
    69: { name: "الحاقة", pages: 3 },
    70: { name: "المعارج", pages: 3 },
    71: { name: "نوح", pages: 2 },
    72: { name: "الجن", pages: 3 },
    73: { name: "المزمل", pages: 2 },
    74: { name: "المدثر", pages: 3 },
    75: { name: "القيامة", pages: 2 },
    76: { name: "الإنسان", pages: 3 },
    77: { name: "المرسلات", pages: 2 },
    78: { name: "النبأ", pages: 2 },
    79: { name: "النازعات", pages: 2 },
    80: { name: "عبس", pages: 2 },
    81: { name: "التكوير", pages: 2 },
    82: { name: "الانفطار", pages: 2 },
    83: { name: "المطففين", pages: 2 },
    84: { name: "الانشقاق", pages: 2 },
    85: { name: "البروج", pages: 2 },
    86: { name: "الطارق", pages: 2 },
    87: { name: "الأعلى", pages: 2 },
    88: { name: "الغاشية", pages: 2 },
    89: { name: "الفجر", pages: 2 },
    90: { name: "البلد", pages: 2 },
    91: { name: "الشمس", pages: 2 },
    92: { name: "الليل", pages: 2 },
    93: { name: "الضحى", pages: 1 },94: { name: "الشرح", pages: 1 },
    95: { name: "التين", pages: 1 }, 96: { name: "العلق", pages: 1 },
    97: { name: "القدر", pages: 1 },98: { name: "البينة", pages: 2 },
    99: { name: "الزلزلة", pages: 1 },100: { name: "العاديات", pages: 1 },
    101: { name: "القارعة", pages: 1 },102: { name: "التكاثر", pages: 1 },
    103: { name: "العصر", pages: 1 },104: { name: "الهمزة", pages: 1 },105: { name: "الفيل", pages: 1 },
    106: { name: "قريش", pages: 1 },107: { name: "الماعون", pages: 1 },108: { name: "الكوثر", pages: 1 },
    109: { name: "الكافرون", pages: 1 },110: { name: "النصر", pages: 1 },111: { name: "المسد", pages: 1 },
    112: { name: "الإخلاص", pages: 1 },113: { name: "الفلق", pages: 1 },114: { name: "الناس", pages: 1 }
  };


  const surahPages = [
    ["الفاتحة", 1, 1],
    ["البقرة", 2, 49],
    ["آل عمران", 50, 76],
    ["النساء", 77, 106],
    ["المائدة", 107, 127],
    ["الأنعام", 128, 150],
    ["الأعراف", 151, 176],
    ["الأنفال", 177, 186],
    ["التوبة", 187, 207],
    ["يونس", 208, 221],
    ["هود", 222, 235],
    ["يوسف", 235, 248],
    ["الرعد", 249, 255],
    ["إبراهيم", 255, 261],
    ["الحجر", 262, 267],
    ["النحل", 267, 281],
    ["الإسراء", 282, 293],
    ["الكهف", 293, 304],
    ["مريم", 305, 312],
    ["طه", 312, 321],
    ["الأنبياء", 322, 331],
    ["الحج", 332, 341],
    ["المؤمنون", 342, 349],
    ["النور", 350, 359],
    ["الفرقان", 359, 366],
    ["الشعراء", 367, 376],
    ["النمل", 377, 385],
    ["القصص", 385, 396],
    ["العنكبوت", 396, 404],
    ["الروم", 404, 410],
    ["لقمان", 411, 414],
    ["السجدة", 415, 417],
    ["الأحزاب", 418, 427],
    ["سبأ", 428, 434],
    ["فاطر", 435, 440],
    ["يس", 440, 445],
    ["الصافات", 446, 452],
    ["ص", 453, 458],
    ["الزمر", 458, 467],
    ["غافر", 467, 477],
    ["فصلت", 477, 482],
    ["الشورى", 483, 489],
    ["الزخرف", 489, 495],
    ["الدخان", 496, 498],
    ["الجاثية", 499, 502],
    ["الأحقاف", 503, 507],
    ["محمد", 507, 510],
    ["الفتح", 511, 515],
    ["الحجرات", 515, 517],
    ["ق", 518, 520],
    ["الذاريات", 521, 523],
    ["الطور", 523, 525],
    ["النجم", 526, 527],
    ["القمر", 528, 531],
    ["الرحمن", 531, 534],
    ["الواقعة", 534, 537],
    ["الحديد", 537, 541],
    ["المجادلة", 542, 545],
    ["الحشر", 545, 549],
    ["الممتحنة", 549, 551],
    ["الصف", 551, 553],
    ["الجمعة", 554, 555],
    ["المنافقون", 555, 556],
    ["التغابن", 556, 558],
    ["الطلاق", 558, 559],
    ["التحريم", 560, 561],
    ["الملك", 562, 564],
    ["القلم", 564, 566],
    ["الحاقة", 566, 568],
    ["المعارج", 568, 570],
    ["نوح", 570, 571],
    ["الجن", 572, 573],
    ["المزمل", 574, 575],
    ["المدثر", 575, 577],
    ["القيامة", 577, 578],
    ["الإنسان", 579, 580],
    ["المرسلات", 580, 582],
    ["النبأ", 582, 583],
    ["النازعات", 583, 584],
    ["عبس", 585, 585],
    ["التكوير", 586, 586],
    ["الانفطار", 587, 587],
    ["المطففين", 587, 589],
    ["الانشقاق", 589, 590],
    ["البروج", 590, 591],
    ["الطارق", 591, 591],
    ["الأعلى", 591, 592],
    ["الغاشية", 593, 593],
    ["الفجر", 594, 595],
    ["البلد", 595, 595],
    ["الشمس", 595, 596],
    ["الليل", 596, 596],
    ["الضحى", 596, 597],
    ["الشرح", 597, 597],
    ["التين", 597, 598],
    ["العلق", 598, 598],
    ["القدر", 598, 599],
    ["البينة", 599, 599],
    ["الزلزلة", 599, 600],
    ["العاديات", 600, 600],
    ["القارعة", 600, 601],
    ["التكاثر", 601, 601],
    ["العصر", 601, 602],
    ["الهمزة", 602, 602],
    ["الفيل", 602, 602],
    ["قريش", 603, 603],
    ["الماعون", 603, 603],
    ["الكوثر", 603, 603],
    ["الكافرون", 603, 604],
    ["النصر", 604, 604],
    ["المسد", 604, 604],
    ["الإخلاص", 604, 604],
    ["الفلق", 604, 604],
    ["الناس", 604, 604]
];



  var selectElement = document.getElementById('sura');
  var selectedValue = selectElement.value;  
  function checkSelection() {
    selectElement = document.getElementById('sura');
    selectedValue = selectElement.value; 
    
    const p = document.createElement('p');
    p.style.color = 'rgb(255,255,204)'; 

    if (selectedValue) {
        const span = document.createElement('span'); 
        span.textContent = quranSurahPages[selectedValue]['name'];
        span.style.fontSize = '30px';
        span.style.color = 'white'; 
        
        p.appendChild(span); 
        document.getElementById('result').innerHTML = 'لقد اخترت سورة: '; 
        document.getElementById('result').appendChild(p);
        
    }

}
function onClick(){
  if (quranSurahPages[selectedValue]) {

      [sura ,start ,end ] = surahPages[selectedValue - 1];

      randomPage = Math.floor(Math.random() * (end - start + 1)) + start
      // console.log(`sura : ${sura}  > page : ${randomPage} `);
      img_safha = document.getElementById('img-safha')
      img_safha.style.display = ' block';
      img_safha.src = `./Quran/${sura}/${randomPage}.png`
      
      title = document.getElementById('title')
      let sp1 = document.createElement('span')

      sp1.setAttribute('id','sp1');

      sp1.textContent = (randomPage-start+1).toString()

      title.textContent =`الصفحة رقم `;
      title.appendChild(sp1)

      let but1 = document.getElementById('before')
      let but2 = document.getElementById('after')
      but2.style.display = 'block';
      but1.style.display = 'block';

      but1.style.backgroundColor ='rgb(255,255,204)';
      but1.disabled = false
      but1.style.cursor = 'pointer';
      but1.style.opacity = '1'
      but1.style.color='black';
      but2.style.backgroundColor ='rgb(255,255,204)';
      but2.disabled = false;
      but2.style.cursor = 'pointer';
      but2.style.opacity = '1'
      but2.style.color='black';


      if (randomPage-start === 0 ) {
        but1.disabled = true
        but1.style.backgroundColor = '#cccccc';
        but1.style.cursor = 'not-allowed';
        but1.style.opacity = '0.6'
        but1.style.color='white';
      }
      if (randomPage ===end) {
        but2.disabled = true
        but2.style.backgroundColor = '#cccccc';
        but2.style.cursor = 'not-allowed';
        but2.style.opacity = '0.6'
        but2.style.color='white';
        }
  }else{
    alert('يرجي اختيار سورة');
  }



        
}

function before() {
  let but1 = document.getElementById('before')
  let but2 = document.getElementById('after')
  randomPage -=1;
  img_safha.src = `./Quran/${sura}/${randomPage}.png` ;
  
  but1.style.backgroundColor ='rgb(255,255,204)';
  but1.disabled = false
  but1.style.cursor = 'pointer';
  but1.style.opacity = '1'
  but1.style.color='black';
  but2.style.backgroundColor ='rgb(255,255,204)';
  but2.disabled = false;
  but2.style.cursor = 'pointer';
  but2.style.opacity = '1'
  but2.style.color='black';

  if (randomPage===start) {
    but1.disabled = true
    but1.style.backgroundColor = '#cccccc';
    but1.style.cursor = 'not-allowed';
    but1.style.opacity = '0.6'
    but1.style.color='white';
  }

  title = document.getElementById('title')
  let sp1 = document.createElement('span')

  sp1.setAttribute('id','sp1');
  sp1.textContent = (randomPage-start+1).toString()
  title.textContent =`الصفحة رقم `;
  title.appendChild(sp1)
  sp1.textContent = ((randomPage-start)+1).toString();

}

function after() {
  let but1 = document.getElementById('before')
  let but2 = document.getElementById('after')
  randomPage +=1;
  img_safha.src =`./Quran/${sura}/${randomPage}.png`;
  
  but1.style.backgroundColor ='rgb(255,255,204)';
  but1.disabled = false
  but1.style.cursor = 'pointer';
  but1.style.opacity = '1'
  but1.style.color='black';
  but2.style.backgroundColor ='rgb(255,255,204)';
  but2.disabled = false;
  but2.style.cursor = 'pointer';
  but2.style.opacity = '1'
  but2.style.color='black';
  
  if (randomPage===end) {
    but2.disabled = true
    but2.style.backgroundColor = '#cccccc';
    but2.style.cursor = 'not-allowed';
    but2.style.opacity = '0.6'
    but2.style.color='white';
  }
  title = document.getElementById('title')
  let sp1 = document.createElement('span')

  sp1.setAttribute('id','sp1');

  sp1.textContent = (randomPage-start+1).toString()

  title.textContent =`الصفحة رقم `;
  title.appendChild(sp1)

}