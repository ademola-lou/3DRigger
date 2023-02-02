export function toggleColor(ev){
    if(!ev.target.state){
        ev.target.state = {
            toggleOff: false
        }
    }
    ev.target.state.toggleOff = !ev.target.state.toggleOff;

    ev.target.style.color = ev.target.state.toggleOff ? "red" : "white";
}