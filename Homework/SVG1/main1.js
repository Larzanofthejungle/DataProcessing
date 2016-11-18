/*
  Lars Overwater
  10800077
  Data Processing
*/

/* use this to test out your function */
window.onload = function() {
    changeColor("gb", "#fa009a"),
    changeColor("est", "#00fa9a"),
    changeColor("den", "#fa9a00"),
    changeColor("gr", "#0fa90a");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;

}
