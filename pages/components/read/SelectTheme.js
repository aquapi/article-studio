export default ({ onChange }) =>
    <select id="theme-changer" onChange={onChange}>
        <option id="base16/ocean">Default</option>
        <option id="vs2015">VS Dark</option>
        <option id="vs">VS Light</option>
        <option id="github">Github</option>
        <option id="idea">ItelliJ IDEA</option>
        <option id="androidstudio">Android Studio</option>
        <option id="atom-one-dark">Atom Dark</option>
        <option id="atom-one-light">Atom Light</option>
        <option id="stackoverflow-dark">Stackoverflow Dark</option>
        <option id="stackoverflow-light">Stackoverflow Light</option>
        <option id="xcode">XCode</option>
    </select>