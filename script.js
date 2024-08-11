let elements_keys_symbol = [];
var elements_dict = null;

const json_file = fetch('./resources/PeriodicTableJSON.json')
.then(x => x.text())
.then(text => {
  const data = JSON.parse(text);
  elements_dict = data.elements;
  for (const e of elements_dict) {
    elements_keys_symbol.push(e.symbol);
  }
  //console.log(elements_keys_symbol);
  fillTable();
})

function showPropertiesElement (elem_symbol, color) {
    const idx_elem = elements_keys_symbol.indexOf(elem_symbol);
    
    //console.log(idx_elem);
    //console.log(elements_dict[idx_elem]);

    if (idx_elem < 0) {
        return;
    }

    const symbol_bg = document.getElementById("symbol-right-id");

    symbol_bg.style.background = "var(--pastel-" + color +")";



    const atomic_nbr_txt = document.getElementById("atomic-nbr-txt-id");
    atomic_nbr_txt.textContent = elements_dict[idx_elem].number;

    const atomic_mass_txt = document.getElementById("atomic-mass-txt-id");
    atomic_mass_txt.textContent = parseFloat(elements_dict[idx_elem].atomic_mass.toFixed(2));

    const symbol_txt = document.getElementById("symbol-txt-id");
    symbol_txt.textContent = elements_dict[idx_elem].symbol;

    const name_txt = document.getElementById("name-txt-id");
    name_txt.textContent = elements_dict[idx_elem].name;

    const summary_txt = document.getElementById("summary-text");
    summary_txt.textContent = elements_dict[idx_elem].summary;



    const atomic_mass = document.getElementById("atomic-mass-id");
    atomic_mass.textContent = elements_dict[idx_elem].atomic_mass;

    const density = document.getElementById("density-id");
    density.textContent = elements_dict[idx_elem].density;

    const melting_point = document.getElementById("melting-point-id");
    melting_point.textContent = elements_dict[idx_elem].melt;

    const boiling_point = document.getElementById("boiling-point-id");
    boiling_point.textContent = elements_dict[idx_elem].boil;

    const discovered = document.getElementById("discovered-by-id");
    discovered.textContent = elements_dict[idx_elem].discovered_by;

    const source = document.getElementById("source-id");
    source.setAttribute("href", elements_dict[idx_elem].source);
    source.textContent = elements_dict[idx_elem].source;
}

const color_dict = {
  "alkaline earth metal": "orange",
  "lanthanide": "red",
  "transition metal": "pink",
  "post-transition metal": "yellow",
  "metalloid": "dark-blue",
  "noble gas": "purple",
  "alkali metal": "blue",
  "actinide": "turquoise",
  "unknown": "grey",
  "diatomic nonmetal": "green",
  "polyatomic nonmetal": "green"
};

function fillTable() {
  
  for (const e of elements_dict) {
    if (e.number > 118) {
      return;
    }

    let posInGrid = "x" + e.xpos + "y" + e.ypos;

    var grid_case = document.getElementById(posInGrid);

    var elem_div = document.createElement("div");
    elem_div.id = e.symbol;
    elem_div.className = "element" + " " + color_dict[e.category];

    var atomic_wrapper = document.createElement("div");
    atomic_wrapper.className = "atomic-wrapper";

    var atomic_nbr = document.createElement("span");
    atomic_nbr.className = "atomic-nbr";
    atomic_nbr.textContent = e.number;

    var atomic_mass = document.createElement("span");
    atomic_mass.className = "atomic-mass";
    atomic_mass.textContent = parseFloat(e.atomic_mass.toFixed(2));

    var atomic_symbol = document.createElement("span");
    atomic_symbol.className = "symbol";
    atomic_symbol.textContent = e.symbol;

    var atomic_name = document.createElement("span");
    atomic_name.className = "element-name";
    atomic_name.textContent = e.name.substring(0,10);

    atomic_wrapper.appendChild(atomic_nbr);
    atomic_wrapper.appendChild(atomic_mass);

    elem_div.appendChild(atomic_wrapper);
    elem_div.appendChild(atomic_symbol);
    elem_div.appendChild(atomic_name);

    grid_case.appendChild(elem_div);
  }
}

document.addEventListener('click', (event) => {
  const elem_symbol = event.target.id;
  console.log(event.target);
  if (elem_symbol.length > 0) {
    showPropertiesElement(elem_symbol, event.target.className.slice(8));
  }
});