 let mode = "cyclic"; // "cyclic", "current", "range"
    let padaDomList = [];
    let vimData, vimCurrentPath;
    let openState = { dasa:null, puthi:null, anthara:null };

    // Button logic
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById("btn-cyclic").onclick = ()=>{
        mode="cyclic"; setActiveModeBtn('btn-cyclic'); drawChartGrid(); clearAllHighlights();
      };
      document.getElementById("btn-current").onclick = ()=>{
        mode="current"; setActiveModeBtn('btn-current'); drawChartGrid(); renderAll();
      };
      document.getElementById("btn-range").onclick = ()=>{
        mode="range"; setActiveModeBtn('btn-range'); drawChartGrid(); clearAllHighlights();
      };
       document.getElementById("btn-range1").onclick = ()=>{
        mode="range1"; setActiveModeBtn('btn-range1'); drawChartGrid(); clearAllHighlights();
      };
       document.getElementById("btn-range2").onclick = ()=>{
        mode="range2"; setActiveModeBtn('btn-range2'); drawChartGrid(); clearAllHighlights();
      };
       document.getElementById("btn-range3").onclick = ()=>{
        mode="range3"; setActiveModeBtn('btn-range3'); drawChartGrid(); clearAllHighlights();
      };
      function setActiveModeBtn(activeId) {
        document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active-mode'));
        document.getElementById(activeId)?.classList.add('active-mode');
      }
      window.setActiveModeBtn = setActiveModeBtn;
    });

    const rasiData = [
      { name: "மேஷம்", code: "r01", padas: ["அஸ்வினி - பாதம் 1", "அஸ்வினி - பாதம் 2", "அஸ்வினி - பாதம் 3", "அஸ்வினி - பாதம் 4", "பரணி - பாதம் 1", "பரணி - பாதம் 2", "பரணி - பாதம் 3", "பரணி - பாதம் 4", "கிருத்திகை - பாதம் 1"] },
      { name: "ரிஷபம்", code: "r02", padas: ["கிருத்திகை - பாதம் 2", "கிருத்திகை - பாதம் 3", "கிருத்திகை - பாதம் 4", "ரோஹிணி - பாதம் 1", "ரோஹிணி - பாதம் 2", "ரோஹிணி - பாதம் 3", "ரோஹிணி - பாதம் 4", "மிருகசீரிடம் - பாதம் 1", "மிருகசீரிடம் - பாதம் 2"] },
      { name: "மிதுனம்", code: "r03", padas: ["மிருகசீரிடம் - பாதம் 3", "மிருகசீரிடம் - பாதம் 4", "திருவாதிரை - பாதம் 1", "திருவாதிரை - பாதம் 2", "திருவாதிரை - பாதம் 3", "திருவாதிரை - பாதம் 4", "புனர்பூசம் - பாதம் 1", "புனர்பூசம் - பாதம் 2", "புனர்பூசம் - பாதம் 3"] },
      { name: "கடகம்", code: "r04", padas: ["புனர்பூசம் - பாதம் 4", "பூசம் - பாதம் 1", "பூசம் - பாதம் 2", "பூசம் - பாதம் 3", "பூசம் - பாதம் 4", "ஆயில்யம் - பாதம் 1", "ஆயில்யம் - பாதம் 2", "ஆயில்யம் - பாதம் 3", "ஆயில்யம் - பாதம் 4"] },
      { name: "சிம்மம்", code: "r05", padas: ["மகம் - பாதம் 1", "மகம் - பாதம் 2", "மகம் - பாதம் 3", "மகம் - பாதம் 4", "பூரம் - பாதம் 1", "பூரம் - பாதம் 2", "பூரம் - பாதம் 3", "பூரம் - பாதம் 4", "உத்திரம் - பாதம் 1"] },
      { name: "கன்னி", code: "r06", padas: ["உத்திரம் - பாதம் 2", "உத்திரம் - பாதம் 3", "உத்திரம் - பாதம் 4", "ஹஸ்தம் - பாதம் 1", "ஹஸ்தம் - பாதம் 2", "ஹஸ்தம் - பாதம் 3", "ஹஸ்தம் - பாதம் 4", "சித்திரை - பாதம் 1", "சித்திரை - பாதம் 2"] },
      { name: "துலாம்", code: "r07", padas: ["சித்திரை - பாதம் 3", "சித்திரை - பாதம் 4", "சுவாதி - பாதம் 1", "சுவாதி - பாதம் 2", "சுவாதி - பாதம் 3", "சுவாதி - பாதம் 4", "விசாகம் - பாதம் 1", "விசாகம் - பாதம் 2", "விசாகம் - பாதம் 3"] },
      { name: "விருச்சிகம்", code: "r08", padas: ["விசாகம் - பாதம் 4", "அனுஷம் - பாதம் 1", "அனுஷம் - பாதம் 2", "அனுஷம் - பாதம் 3", "அனுஷம் - பாதம் 4", "கேட்டை - பாதம் 1", "கேட்டை - பாதம் 2", "கேட்டை - பாதம் 3", "கேட்டை - பாதம் 4"] },
      { name: "தனுசு", code: "r09", padas: ["மூலம் - பாதம் 1", "மூலம் - பாதம் 2", "மூலம் - பாதம் 3", "மூலம் - பாதம் 4", "பூராடம் - பாதம் 1", "பூராடம் - பாதம் 2", "பூராடம் - பாதம் 3", "பூராடம் - பாதம் 4", "உத்திராடம் - பாதம் 1"] },
      { name: "மகரம்", code: "r10", padas: ["உத்திராடம் - பாதம் 2", "உத்திராடம் - பாதம் 3", "உத்திராடம் - பாதம் 4", "திருவோணம் - பாதம் 1", "திருவோணம் - பாதம் 2", "திருவோணம் - பாதம் 3", "திருவோணம் - பாதம் 4", "அவிட்டம் - பாதம் 1", "அவிட்டம் - பாதம் 2"] },
      { name: "கும்பம்", code: "r11", padas: ["அவிட்டம் - பாதம் 3", "அவிட்டம் - பாதம் 4", "சதயம் - பாதம் 1", "சதயம் - பாதம் 2", "சதயம் - பாதம் 3", "சதயம் - பாதம் 4", "பூரட்டாதி - பாதம் 1", "பூரட்டாதி - பாதம் 2", "பூரட்டாதி - பாதம் 3"] },
      { name: "மீனம்", code: "r12", padas: ["பூரட்டாதி - பாதம் 4", "உத்திரட்டாதி - பாதம் 1", "உத்திரட்டாதி - பாதம் 2", "உத்திரட்டாதி - பாதம் 3", "உத்திரட்டாதி - பாதம் 4", "ரேவதி - பாதம் 1", "ரேவதி - பாதம் 2", "ரேவதி - பாதம் 3", "ரேவதி - பாதம் 4"] }
    ];
    const rasisToReverse = ["ரிஷபம்", "துலாம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"];

// Start global pada index from 1 for rasi 1 (மேஷம்)
let globalPadaCounter = 1;

rasiData.forEach(rasi => {
  const isReversed = rasisToReverse.includes(rasi.name);
  if (isReversed) {
    // Reverse the padas array itself
    rasi.padas.reverse();
  }

  // Assign global index mapping within this rasi
  // For reversed rasis, indices go from higher to lower
  rasi.globalPadaIndexes = [];
  for (let i = 0; i < 9; i++) {
    if (isReversed) {
      rasi.globalPadaIndexes.push(globalPadaCounter + 8 - i);
    } else {
      rasi.globalPadaIndexes.push(globalPadaCounter + i);
    }
  }

  globalPadaCounter += 9;
});


    function drawChartGrid() {
      document.getElementById('rasiChart').innerHTML = '';
      padaDomList = [];
      let padaCounter = 1;
      
      rasiData.forEach((rasi, ri) => {
  const box = document.createElement("div");
  box.className = `box ${rasi.code}`;
  box.setAttribute('data-rasi-idx', ri + 1);
  const title = document.createElement("div");
  title.className = "rasi-name";
  title.textContent = rasi.name;
  box.appendChild(title);

  for (let j = 0; j < 9; j++) {
    const line = document.createElement("div");
    line.className = "line";

    // Display number is always 1 to 9 top to bottom
    // But pada label and global index respects reversal:
    line.textContent = `${rasi.padas[j] ? rasi.padas[j] : "-"}`;

    // Use the calculated global index mapping:
    line.setAttribute("data-pada-index", rasi.globalPadaIndexes[j]);

    padaDomList[rasi.globalPadaIndexes[j]] = line; // map global pada to Dom line

    box.appendChild(line);
  }
  document.getElementById('rasiChart').appendChild(box);
});

      for(let i=1; i<=108; i++) {
        if(!padaDomList[i]) continue;
        padaDomList[i].onclick = null;
        padaDomList[i].addEventListener("click", function(evt) {
          if(mode==="cyclic") {
            highlightPadaCyclic(i);
          } else if(mode==="range") {
            highlightPadaRange(i);
          } else if(mode==="range1") {
            highlightPadaRange1(i);
          } else if(mode==="range2") {
            highlightPadaRange2(i);
          } else if(mode==="range3") {
            highlightPadaRange3(i);
          } 
        });
      }
      if(mode==="current") showCurrentDasaPadaHighlight();
    }

    function clearCyclicHighlights() {
      document.querySelectorAll('.line.highlight-pada-interactive').forEach(e=>e.classList.remove('highlight-pada-interactive'));
      document.querySelectorAll('.box.active-rasi-cyclic').forEach(e=>e.classList.remove('active-rasi-cyclic'));
    }
    function clearCurrentDasaHighlights() {
      document.querySelectorAll('.line.highlight-pada-dasa').forEach(e=>e.classList.remove('highlight-pada-dasa'));
      document.querySelectorAll('.line.highlight-pada-puthi').forEach(e=>e.classList.remove('highlight-pada-puthi'));
      document.querySelectorAll('.line.highlight-pada-anthara').forEach(e=>e.classList.remove('highlight-pada-anthara'));
      document.querySelectorAll('.box.active-rasi-current').forEach(e=>e.classList.remove('active-rasi-current'));
      document.querySelectorAll('.tree-active').forEach(e=>e.classList.remove('tree-active'));
    }
    function clearRangeHighlights() {
      document.querySelectorAll('.line.highlight-pada-orange').forEach(e=>e.classList.remove('highlight-pada-orange'));
      document.querySelectorAll('.line.highlight-pada-blue').forEach(e=>e.classList.remove('highlight-pada-blue'));
      document.querySelectorAll('.clicked-pada-special').forEach(e=>e.classList.remove('clicked-pada-special'));
      document.querySelectorAll('.box.active-rasi-cyclic-range').forEach(e=>e.classList.remove('active-rasi-cyclic-range'));
    }
    function clearRange1Highlights() {
      document.querySelectorAll('.line.highlight-pada-interactive').forEach(e=>e.classList.remove('highlight-pada-interactive'));
       }
    function clearRange2Highlights() {
      document.querySelectorAll('.line.highlight-pada-interactive').forEach(e=>e.classList.remove('highlight-pada-interactive'));
      document.querySelectorAll('.box.active-rasi-cyclic-range2').forEach(e=>e.classList.remove('active-rasi-cyclic-range2'));
    }
    function clearRange3Highlights() {
      document.querySelectorAll('.highlight-pada-1').forEach(e=>e.classList.remove('highlight-pada-1'));
      document.querySelectorAll('.highlight-pada-2').forEach(e=>e.classList.remove('highlight-pada-2'));
      document.querySelectorAll('.highlight-pada-3').forEach(e=>e.classList.remove('highlight-pada-3'));
      document.querySelectorAll('.highlight-pada-4').forEach(e=>e.classList.remove('highlight-pada-4'));
      document.querySelectorAll('.highlight-pada-5').forEach(e=>e.classList.remove('highlight-pada-5'));
      document.querySelectorAll('.highlight-pada-6').forEach(e=>e.classList.remove('highlight-pada-6'));
      document.querySelectorAll('.highlight-pada-7').forEach(e=>e.classList.remove('highlight-pada-7'));
      document.querySelectorAll('.highlight-pada-8').forEach(e=>e.classList.remove('highlight-pada-8'));
      document.querySelectorAll('.highlight-pada-9').forEach(e=>e.classList.remove('highlight-pada-9'));
      document.querySelectorAll('.highlight-pada-10').forEach(e=>e.classList.remove('highlight-pada-10'));
      document.querySelectorAll('.highlight-pada-11').forEach(e=>e.classList.remove('highlight-pada-11'));
      document.querySelectorAll('.highlight-pada-12').forEach(e=>e.classList.remove('highlight-pada-12'));
      document.querySelectorAll('.clicked-pada-1').forEach(e=>e.classList.remove('clicked-pada-1'));
      document.querySelectorAll('.box.active-rasi-cyclic-range3').forEach(e=>e.classList.remove('active-rasi-cyclic-range3'));
    }
    
    function clearAllHighlights() {
      clearCyclicHighlights(); clearCurrentDasaHighlights(); clearRangeHighlights(); clearRange1Highlights();clearRange2Highlights();clearRange3Highlights();
      ['highlight-dasa','highlight-puthi','highlight-anth'].forEach(cls =>
        document.querySelectorAll(`.line.${cls}`).forEach(e => e.classList.remove(cls))
      );
      document.querySelectorAll('.box.active-rasi').forEach(e=>e.classList.remove('active-rasi'));
    }

    // ---- Mode 1: Cyclic Pada 37/73 ----
    function highlightPadaCyclic(padaIndex) {
      clearAllHighlights();
      [0,36,72].forEach(offset=>{
        let idx=((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-interactive');
      });
      let rasiIdx=Math.ceil(padaIndex/9); // 1..12
      document.querySelector(`.box[data-rasi-idx="${rasiIdx}"]`)?.classList.add('active-rasi-cyclic');
      let rasi5=((rasiIdx+4-1)%12)+1;
      let rasi9=((rasiIdx+8-1)%12)+1;
      document.querySelector(`.box[data-rasi-idx="${rasi5}"]`)?.classList.add('active-rasi-cyclic');
      document.querySelector(`.box[data-rasi-idx="${rasi9}"]`)?.classList.add('active-rasi-cyclic');
    }
    // ---- Mode 2: Chart Current Dasa Pada (Green) ----
    function showCurrentDasaPadaHighlight(dpi) {
      clearAllHighlights();
      if(!vimData || !vimCurrentPath) return;
      let now = new Date();
      if (document.getElementById("caldate").value) now = new Date(document.getElementById("caldate").value);
      let md = vimData[vimCurrentPath.dasa], pt = md && md.puthis[vimCurrentPath.puthi], at = pt && pt.antharas[vimCurrentPath.anth];
      let mdPada = getCurrentPada(md, now), ptPada = getCurrentPada(pt, now), atPada = getCurrentPada(at, now);
      let idxD = (mdPada.pada>0) ? findPadaIndexByLabel(mdPada.nak, mdPada.pada) : -1;
      let idxP = (ptPada.pada>0) ? findPadaIndexByLabel(ptPada.nak, ptPada.pada) : -1;
      let idxA = (atPada.pada>0) ? findPadaIndexByLabel(atPada.nak, atPada.pada) : -1;
      if(dpi){ if(dpi.dasa!=-1 && pagiCheck(idxD)) padaDomList[idxD].classList.add('highlight-pada-dasa');
        if(dpi.puthi!=-1 && pagiCheck(idxP)) padaDomList[idxP].classList.add('highlight-pada-puthi');
        if(dpi.anthara!=-1 && pagiCheck(idxA)) padaDomList[idxA].classList.add('highlight-pada-anthara');
      } else {
        if(pagiCheck(idxD)) padaDomList[idxD].classList.add('highlight-pada-dasa');
        if(pagiCheck(idxP)) padaDomList[idxP].classList.add('highlight-pada-puthi');
        if(pagiCheck(idxA)) padaDomList[idxA].classList.add('highlight-pada-anthara');
      }
    }
    function pagiCheck(idx){ return idx>0 && idx<=108;}
    function findPadaIndexByLabel(nakName, padaNum) {
      nakName = nakName.trim();
      padaNum = Number(padaNum);
      for(let i=1; i<=108; i++) {
        let label = padaDomList[i].textContent.replace(/^[0-9]+\.\s*/, '').trim();
        if(label.startsWith(nakName) && label.endsWith('பாதம் '+padaNum)) return i;
      }
      return -1;
    }
    // ---- Mode 3: Range Highlight ----
    function highlightPadaRange(padaIndex) {
      clearAllHighlights();showCurrentDasaPadaHighlight();
      if(padaDomList[padaIndex]) padaDomList[padaIndex].classList.add('clicked-pada-special');
      for(let offset=84; offset<=87; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-orange');
      }
      for(let offset=24; offset<=27; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-blue');
      }
    }
    // ---- Mode 4: range1 highlight  ----
    function highlightPadaRange1(padaIndex) {
      clearAllHighlights();
      [0,9,18,27,36,45,54,63,72,81,90,99].forEach(offset=>{
        let idx=((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-interactive');
      });
      
    }
     // ---- Mode 4: range2 highlight  ----
    function highlightPadaRange2(padaIndex) {
      clearAllHighlights();
      [0,54].forEach(offset=>{
        let idx=((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-interactive');
      });
      let rasiIdx=Math.ceil(padaIndex/9); // 1..12
      document.querySelector(`.box[data-rasi-idx="${rasiIdx}"]`)?.classList.add('active-rasi-cyclic');
      let rasi7=((rasiIdx+6-1)%12)+1;
      document.querySelector(`.box[data-rasi-idx="${rasi7}"]`)?.classList.add('active-rasi-cyclic');
  
    }
    // ---- Mode 3: Range3 Highlight ----
    function highlightPadaRange3(padaIndex) {
      clearAllHighlights();showCurrentDasaPadaHighlight();
      if(padaDomList[padaIndex]) padaDomList[padaIndex].classList.add('clicked-pada-1');
      for(let offset=1; offset<=8; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-1');
      }
      for(let offset=9; offset<=17; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-2');
      }
      for(let offset=18; offset<=26; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-3');
      }
      for(let offset=27; offset<=35; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-4');
      }
      for(let offset=36; offset<=44; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-5');
      }
      for(let offset=45; offset<=53; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-6');
      }
      for(let offset=54; offset<=62; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-7');
      }
      for(let offset=63; offset<=71; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-8');
      }
      for(let offset=72; offset<=80; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-9');
      }
      for(let offset=81; offset<=89; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-10');
      }
      for(let offset=90; offset<=98; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-11');
      }
      for(let offset=99; offset<=107; offset++) {
        let idx = ((padaIndex-1+offset)%108)+1;
        if(padaDomList[idx]) padaDomList[idx].classList.add('highlight-pada-12');
      }
    }

    

    // ---------- DASA TREE RENDER with Date & Neat Indent, and CLICK-TO-HIGHLIGHT ----------
    function highlightPada(padaLabel, cls) {
      document.querySelectorAll(`.line.${cls}`).forEach(e => e.classList.remove(cls));
      for(let i=1; i<=108; i++) {
        if(!padaDomList[i]) continue;
        let plabel = padaDomList[i].textContent.replace(/^[0-9]+\.\s*/, '').trim();
        if(plabel === padaLabel.trim()) {
          padaDomList[i].classList.add(cls);
        }
      }
    }

    function renderTree(arr, curr, openState) {
      function dasaUl() {
        let html = "<ul class='tree-ul'>";
        arr.forEach((md, mi) => {
          let cl = ""; if(curr.dasa === mi) cl += " tree-active";
          html += `<li class="tree-li">`
          html += `<button class="expand-btn${openState.dasa===mi?" expanded":""}" onclick="expandDasa(${mi});event.stopPropagation();">${openState.dasa===mi?"▾":"▸"}</button>`;
          html += `<span class='tree-highlight-dasa' onclick="treeClickDasa(${mi});event.stopPropagation();">${md.lord.replace("ன்","ன்")} (${md.nak})</span>`;
          html += `<span class="tree-period">${formatDate(md.start)} - ${formatDate(md.end)}</span>`;
          if(openState.dasa === mi) html += puthiUl(md,mi);
          html += "</li>";
        });
        html += "</ul>"; return html;
      }
      function puthiUl(md, mdi){
        let html = "<ul class='tree-ul'>";
        md.puthis.forEach((pt, pi) => {
          let cl = ""; if(curr.dasa === mdi && curr.puthi === pi) cl += " tree-active";
          html += `<li class="tree-li">`
          html += `<button class="expand-btn${openState.puthi===pi?" expanded":""}" onclick="expandPuthi(${pi});event.stopPropagation();">${openState.puthi===pi?"▾":"▸"}</button>`;
          html += `<span class='tree-highlight-puthi' onclick="treeClickPuthi(${mdi},${pi});event.stopPropagation();">${pt.lord} (${pt.nak})</span>`;
          html += `<span class="tree-period">${formatDate(pt.start)} - ${formatDate(pt.end)}</span>`;
          if(openState.puthi === pi) html += antharaUl(pt,mdi,pi);
          html += "</li>";
        });
        html += "</ul>"; return html;
      }
      function antharaUl(pt,mdi,pi){
        let html = "<ul class='tree-ul'>";
        pt.antharas.forEach((at, ai) => {
          let cl = ""; if(curr.dasa === mdi && curr.puthi === pi && curr.anth === ai) cl += " tree-active";
          html += `<li class="tree-li">`
            + `<span class='tree-highlight-anthara' onclick="treeClickAnthara(${mdi},${pi},${ai});event.stopPropagation();">${at.lord} (${at.nak})</span>`
            + `<span class="tree-period">${formatDate(at.start)} - ${formatDate(at.end)}</span></li>`;
        }); html += "</ul>"; return html;
      }
      document.getElementById('dasatree').innerHTML = dasaUl();
    }

    // CLICK on TREE = Only highlight pada for that period (NO rasis), nothing else highlighted
    window.treeClickDasa = function(di){
      clearAllHighlights();
      let md = vimData[di];
      let mdPada = getCurrentPada(md, new Date());
      if(mdPada.pada>0) {
        let idxD = findPadaIndexByLabel(mdPada.nak, mdPada.pada);
        if(pagiCheck(idxD)) padaDomList[idxD].classList.add('highlight-pada-dasa');
      }
    }
    window.treeClickPuthi = function(di, pi){
      clearAllHighlights();
      let pt = vimData[di].puthis[pi];
      let ptPada = getCurrentPada(pt, new Date());
      if(ptPada.pada>0) {
        let idxP = findPadaIndexByLabel(ptPada.nak, ptPada.pada);
        if(pagiCheck(idxP)) padaDomList[idxP].classList.add('highlight-pada-puthi');
      }
    }
    window.treeClickAnthara = function(di,pi,ai){
      clearAllHighlights();
      let at = vimData[di].puthis[pi].antharas[ai];
      let atPada = getCurrentPada(at, new Date());
      if(atPada.pada>0) {
        let idxA = findPadaIndexByLabel(atPada.nak, atPada.pada);
        if(pagiCheck(idxA)) padaDomList[idxA].classList.add('highlight-pada-anthara');
      }
    }

    window.expandDasa = function(idx) {
      openState.dasa = (openState.dasa === idx ? null : idx);
      openState.puthi = null; openState.anthara = null; renderAll();
    };
    window.expandPuthi = function(idx) {
      openState.puthi = (openState.puthi === idx ? null : idx);
      openState.anthara = null; renderAll();
    };

    function renderSummary(md, mdPada, pt, ptPada, at, atPada) {
      let html = `<div class="currentbox" style="margin-bottom:24px;text-align:left;">
        <div><span style="color:#17671a;font-weight:bold;">தசை</span>: <b>${md ? md.lord:"-"}</b> (${mdPada && mdPada.pada ? mdPada.nak : ""} - பாதம் ${mdPada && mdPada.pada ? mdPada.pada : '-'}) 
        <div></div><span class="dates">${mdPada && mdPada.from ? formatDate(mdPada.from) + ' - ' + formatDate(mdPada.to) : ''}</span></div>
        <div><span style="color:#40be4a;font-weight:bold;">புக்தி</span>: <b>${pt ? pt.lord:"-"}</b> (${ptPada && ptPada.pada ? ptPada.nak : ""} - பாதம் ${ptPada && ptPada.pada ? ptPada.pada : '-'})
        <div></div><span class="dates">${ptPada && ptPada.from ? formatDate(ptPada.from) + ' - ' + formatDate(ptPada.to) : ''}</span></div>
        <div><span style="color:#40be4a;font-weight:bold;">அந்தரம்</span>: <b>${at ? at.lord:"-"}</b> (${atPada && atPada.pada ? atPada.nak : ""} - பாதம் ${atPada && atPada.pada ? atPada.pada : '-'})
        <div></div><span class="dates">${atPada && atPada.from ? formatDate(atPada.from) + ' - ' + formatDate(atPada.to) : ''}</span></div>
        </div>`;
      document.getElementById("current").innerHTML = html;
    }

    function renderPadaSplit(arr, lab) {
      document.getElementById("padasplit").innerHTML =
        '<div class="padasplit"><b>தசை,புக்தி பிரித்து kattapadam :</b><br>' + lab + arr.map(pd =>
          `<div>${pd.nak} - பாதம் ${pd.pada}  <span class="dates">${formatDate(pd.start)} - ${formatDate(pd.end)}</span></div>`
        ).join("") + '</div>';
    }

    function renderAll(nowParam) {
      clearAllHighlights();
      let now = nowParam || new Date();
      let md = vimData && vimData[vimCurrentPath.dasa], pt = md && md.puthis[vimCurrentPath.puthi], at = pt && pt.antharas[vimCurrentPath.anth];
      let mdPada = getCurrentPada(md, now), ptPada = getCurrentPada(pt, now), atPada = getCurrentPada(at, now);
      if(mode==="current") showCurrentDasaPadaHighlight();
      renderSummary(md, mdPada, pt, ptPada, at, atPada);
      renderTree(vimData, vimCurrentPath, openState);
      let target, lab = "";
      if(openState.anthara != null) {
        target = vimData[openState.dasa].puthis[openState.puthi].antharas[openState.anthara];
        lab = `<u>அந்தரம் (${target.nak} ${target.lord}):</u>`;
      }
      else if(openState.puthi != null) {
        target = vimData[openState.dasa].puthis[openState.puthi];
        lab = `<u>புக்தி (${target.nak} ${target.lord}):</u>`;
      }
      else if(openState.dasa != null) {
        target = vimData[openState.dasa];
        lab = `<u>தசை (${target.nak} ${target.lord}):</u>`;
      }
      else target = null;
      let arr = target ? currentPadaSplit(target) : [];
      renderPadaSplit(arr, lab);
    }

    const PLANETS = ["கேது","சுக்ரன்","சூரியன்","சந்திரன்","செவ்வாய்","ராகு","குரு","சனி","புதன்"];
    const DASA_YEARS = {"கேது":7,"சுக்ரன்":20,"சூரியன்":6,"சந்திரன்":10,"செவ்வாய்":7,"ராகு":18,"குரு":16,"சனி":19,"புதன்":17};
    const NAKS = [
      {name:'அஸ்வினி',lord:'கேது'},
      {name:'பரணி',lord:'சுக்ரன்'},
      {name:'கிருத்திகை',lord:'சூரியன்'},
      {name:'ரோஹிணி',lord:'சந்திரன்'},
      {name:'மிருகசீரிடம்',lord:'செவ்வாய்'},
      {name:'திருவாதிரை',lord:'ராகு'},
      {name:'புனர்பூசம்',lord:'குரு'},
      {name:'பூசம்',lord:'சனி'},
      {name:'ஆயில்யம்',lord:'புதன்'},
      {name:'மகம்',lord:'கேது'},
      {name:'பூரம்',lord:'சுக்ரன்'},
      {name:'உத்திரம்',lord:'சூரியன்'},
      {name:'ஹஸ்தம்',lord:'சந்திரன்'},
      {name:'சித்திரை',lord:'செவ்வாய்'},
      {name:'சுவாதி',lord:'ராகு'},
      {name:'விசாகம்',lord:'குரு'},
      {name:'அனுஷம்',lord:'சனி'},
      {name:'கேட்டை',lord:'புதன்'},
      {name:'மூலம்',lord:'கேது'},
      {name:'பூராடம்',lord:'சுக்ரன்'},
      {name:'உத்திராடம்',lord:'சூரியன்'},
      {name:'திருவோணம்',lord:'சந்திரன்'},
      {name:'அவிட்டம்',lord:'செவ்வாய்'},
      {name:'சதயம்',lord:'ராகு'},
      {name:'பூரட்டாதி',lord:'குரு'},
      {name:'உத்திரட்டாதி',lord:'சனி'},
      {name:'ரேவதி',lord:'புதன்'}
    ];
    function addYears(date, years) {
      let d = new Date(date), y = Math.floor(years), m = (years - y) * 12;
      d.setFullYear(d.getFullYear() + y);
      d.setMonth(d.getMonth() + Math.floor(m));
      d.setDate(d.getDate() + Math.round((m - Math.floor(m)) * 30));
      return d;
    }
    function formatDate(dt) { return dt.toISOString().slice(0,10); }
    function cycle9Nakshatras(start) { return Array(9).fill(0).map((_,j) => (start+j)%27); }
    function getDasaLordsAndNames(moon) {
      const nakLen = 13 + 20/60; // 13°20'
      const nakIdx = Math.floor(moon / nakLen);
      const startLord = NAKS[nakIdx].lord;
      const planetOrder = PLANETS;
      const startIdx = planetOrder.indexOf(startLord);
      const dasaLords = planetOrder.slice(startIdx).concat(planetOrder.slice(0,startIdx));
      const dasaNakIdxs = Array(9).fill(0).map((_,j) => (nakIdx + j) % 27);
      const dasaNakNames = dasaNakIdxs.map(idx => NAKS[idx].name);
      return {dasaLords, dasaNakIdxs, dasaNakNames, nakIdx};
    }
    function dasaTree(moon, dob, now) {
      const nakLen = 13 + 20/60; // 13.333333... deg per nakshatra
      const {dasaLords, dasaNakIdxs, dasaNakNames, nakIdx} = getDasaLordsAndNames(moon);
      const offsetDeg = moon - nakIdx * nakLen;
      let balance = 1 - (offsetDeg / nakLen);
      let mdStarts = [], cursor = addYears(dob, -(DASA_YEARS[dasaLords[0]] * (1 - balance)));
      for(let i=0; i<9; i++) {
        mdStarts[i] = new Date(cursor);
        let span = DASA_YEARS[dasaLords[i]];
        cursor = addYears(cursor, span);
      }
      let arr = dasaLords.map((lord,i) => ({
        index: i,
        lord: lord,
        nak: dasaNakNames[i],
        nakIdx: dasaNakIdxs[i],
        start: mdStarts[i],
        end: mdStarts[i+1] || cursor,
        current: now >= mdStarts[i] && now < (mdStarts[i+1]||cursor),
        puthis: []
      }));
      arr.forEach((md, mdi) => {
        let puthiNakIdxs = cycle9Nakshatras(md.nakIdx);
        let puthiLords = puthiNakIdxs.map(idx => NAKS[idx].lord);
        let puthiNakNames = puthiNakIdxs.map(idx => NAKS[idx].name);
        let duration = (md.end - md.start) / (1000*60*60*24*365.2425);
        let antarStarts = [], cursorP = new Date(md.start);
        for(let j=0; j<9; j++) {
          antarStarts[j] = new Date(cursorP);
          let antardur = duration * (DASA_YEARS[puthiLords[j]] / 120);
          cursorP = addYears(cursorP, antardur);
        }
        md.puthis = puthiLords.map((plord,pi) => ({
          index: pi,
          lord: plord,
          nak: puthiNakNames[pi],
          nakIdx: puthiNakIdxs[pi],
          start: antarStarts[pi],
          end: antarStarts[pi+1] || cursorP,
          current: now >= antarStarts[pi] && now < (antarStarts[pi+1] || cursorP),
          antharas: []
        }));
        md.puthis.forEach((pt, pk) => {
          let anthNakIdxs = cycle9Nakshatras(pt.nakIdx);
          let anthLords = anthNakIdxs.map(idx => NAKS[idx].lord);
          let anthNakNames = anthNakIdxs.map(idx => NAKS[idx].name);
          let dur = (pt.end - pt.start) / (1000*60*60*24*365.2425);
          let anthStarts = [], cursorA = new Date(pt.start);
          for(let k=0; k<9; k++) {
            anthStarts[k] = new Date(cursorA);
            let ahDur = dur * (DASA_YEARS[anthLords[k]] / 120);
            cursorA = addYears(cursorA, ahDur);
          }
          pt.antharas = anthLords.map((alord, ai) => ({
            index: ai,
            lord: alord,
            nak: anthNakNames[ai],
            nakIdx: anthNakIdxs[ai],
            start: anthStarts[ai],
            end: anthStarts[ai+1] || cursorA,
            current: now >= anthStarts[ai] && now < (anthStarts[ai+1] || cursorA)
          }));
        });
      });
      return arr;
    }
    function currentPadaSplit(period) {
      if(!period) return [];
      let nakIdx = period.nakIdx;
      let cursor = new Date(period.start);
      let len = (period.end - period.start) / (1000*60*60*24*365.2425) / 4;
      let arr = [];
      for(let i=0; i<4; i++) {
        let padaEnd = addYears(cursor, len);
        arr.push({ nak: NAKS[nakIdx].name, pada: i+1, lord: NAKS[nakIdx].lord, start: new Date(cursor), end: padaEnd });
        cursor = padaEnd;
      }
      return arr;
    }
    function findCurrentPath(tree) {
      for(let i=0; i<tree.length; i++) {
        let md = tree[i];
        if(md.current) {
          let dI = i, pI = -1, aI = -1;
          for(let j=0; j<md.puthis.length; j++) {
            let pt = md.puthis[j];
            if(pt.current) {
              pI = j;
              for(let k=0; k<pt.antharas.length; k++) {
                if(pt.antharas[k].current) { aI = k; }
              }
            }
          }
          return { dasa: dI, puthi: pI, anth: aI };
        }
      }
      return { dasa:-1, puthi:-1, anth:-1 };
    }
    function getCurrentPada(period, now) {
      if(!period) return {padaIdx:-1, pada:null, from:null, to:null, nak:null};
      let cursor = new Date(period.start);
      let len = (period.end - period.start) / (1000*60*60*24*365.2425) / 4;
      for(let i=0; i<4; i++) {
        let padaEnd = addYears(cursor, len);
        if(now >= cursor && now < padaEnd) return {
          padaIdx: i,
          pada: i + 1,
          from: new Date(cursor),
          to: new Date(padaEnd),
          nak: NAKS[period.nakIdx].name
        };
        cursor = padaEnd;
      }
      return {padaIdx:-1,pada:null,nak:null};
    }

    // Tree expand/collapse
    window.expandDasa = function(idx) {
      openState.dasa = (openState.dasa === idx ? null : idx);
      openState.puthi = null; openState.anthara = null; renderAll();
    };
    window.expandPuthi = function(idx) {
      openState.puthi = (openState.puthi === idx ? null : idx);
      openState.anthara = null; renderAll();
    };
    

    function run() {
      mode = "current";
      setActiveModeBtn('btn-current');
      let dobStr = document.getElementById("dob").value;
      let mdeg = parseInt(document.getElementById("moon_deg").value) || 0;
      let mmin = parseInt(document.getElementById("moon_min").value) || 0;
      let msec = parseInt(document.getElementById("moon_sec").value) || 0;
      let moon = mdeg + mmin / 60 + msec / 3600;
      if(isNaN(moon) || moon < 0 || moon >= 360) {
        alert("சந்திரன் நீளம் சரிபார்க்கவும்.");
        return;
      }
      let dob = new Date(dobStr);
      if(isNaN(dob.getTime())) {
        alert("பிறந்த தேதி சரிபார்க்கவும்.");
        return;
      }
      let caldateStr = document.getElementById("caldate").value;
      let now = caldateStr ? new Date(caldateStr) : new Date();
      vimData = dasaTree(moon, dob, now);
      vimCurrentPath = findCurrentPath(vimData);
      drawChartGrid();
      
      openState = {dasa: vimCurrentPath.dasa, puthi: vimCurrentPath.puthi, anthara: vimCurrentPath.anth};
      renderAll(now);
    }
    
    drawChartGrid();
