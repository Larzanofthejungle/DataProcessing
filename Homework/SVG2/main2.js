/*
  Lars Overwater
  10800077
  Data Processing
*/

/* use this to test out your function */

// color gradation (colors[0] is very light blue, colors[9] is dark blue)
var colors = ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b','#041e43'];

// array conisisting of arrays containing country code and an int for color gradation
var data = [["cn", 5], ["in", 3], ["us", 8], ["br", 6], ["jp", 8], ["ru", 7], ["id", 3], ["ng", 4], ["de", 8], ["bd", 3], ["mx", 5], ["gb", 8], ["fr", 8], ["ph", 4], ["eg", 4], ["kr", 8], ["vn", 4], ["tr", 4], ["it", 5], ["pk", 1], ["es", 8], ["ca", 8], ["ar", 5], ["ir", 3], ["pl", 7], ["za", 4], ["co", 5], ["my", 6], ["th", 2], ["tw", 8], ["ua", 6], ["au", 8], ["ma", 5], ["ke", 3], ["sa", 6], ["nl", 9], ["ve", 5], ["pe", 3], ["cl", 6], ["uz", 3], ["ro", 4], ["np", 4], ["kz", 5], ["se", 9], ["be", 8], ["sd", 2], ["cz", 7], ["hu", 7], ["ch", 8], ["pt", 6], ["at", 8], ["gr", 5], ["dz", 1], ["ec", 4], ["sy", 2], ["ug", 1], ["az", 5], ["do", 5], ["il", 7], ["dk", 9], ["hk", 7], ["by", 5], ["ye", 2], ["no", 9], ["fi", 9], ["ae", 8], ["lk", 2], ["tn", 4], ["sk", 7], ["bo", 3], ["sg", 7], ["ie", 7], ["rs", 7], ["bg", 5], ["nz", 8], ["ao", 1], ["gh", 1], ["hr", 6], ["iq", 0], ["lb", 7], ["jo", 4], ["cu", 2], ["gt", 1], ["ba", 7], ["sn", 2], ["pr", 7], ["py", 3], ["zw", 1], ["lt", 6], ["zm", 1], ["cr", 4], ["ge", 4], ["tz", 0], ["om", 6], ["ps", 4], ["kw", 7], ["uy", 5], ["af", 0], ["al", 6], ["et", 0], ["md", 4], ["qa", 8], ["cd", 0], ["lv", 7], ["pa", 4], ["hn", 1], ["si", 7], ["cm", 0], ["am", 4], ["sv", 2], ["mz", 0], ["kg", 2], ["mk", 6], ["tj", 1], ["bh", 9], ["jm", 3], ["ht", 1], ["rw", 0], ["ee", 8], ["ly", 1], ["kh", 0], ["mw", 0], ["ni", 1], ["la", 1], ["bf", 0], ["tt", 6], ["cy", 6], ["mm", 0], ["ci", 0], ["mu", 3], ["mn", 1], ["mg", 0], ["tm", 0], ["bj", 0], ["lu", 9], ["pg", 0], ["mo", 6], ["me", 5], ["ml", 0], ["sz", 2], ["fj", 3], ["tg", 0], ["bw", 1], ["is", 9], ["na", 1], ["cg", 0], ["ne", 0], ["mt", 6], ["bn", 6], ["gm", 1], ["td", 0], ["gy", 3], ["bs", 7], ["bt", 2], ["bb", 7], ["mr", 0], ["sr", 3], ["cv", 3], ["lr", 0], ["cf", 0], ["gn", 0], ["nc", 6], ["mv", 4], ["pf", 5], ["so", 0], ["ga", 0], ["bi", 0], ["gq", 1], ["bz", 3], ["gu", 6], ["ls", 0], ["sl", 0], ["aw", 7], ["ad", 9], ["dj", 0], ["bm", 9], ["lc", 3], ["ag", 6], ["er", 0], ["vc", 5], ["gw", 0], ["km", 0], ["sb", 0], ["sc", 5], ["fo", 9], ["dm", 5], ["st", 2], ["kn", 8], ["ky", 7], ["je", 4], ["gd", 3], ["gl", 6], ["to", 3], ["li", 9], ["vi", 3], ["ws", 1], ["vu", 1], ["fm", 2], ["mc", 9], ["gi", 6], ["sm", 5], ["vg", 4], ["tl", 0], ["ki", 1], ["ai", 6], ["mh", 1], ["tv", 3], ["sh", 3], ["fk", 9], ["ms", 5], ["wf", 0], ["nu", 8], ["sh", 4]];

// changes the color of the involved countrys
window.onload = function() {
    for (var i = 0; i < data.length; i++)
    {
        changeColor(data[i][0], colors[data[i][1]]);
    }
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;

}
