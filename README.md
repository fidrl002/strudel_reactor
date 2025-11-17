# Strudel Demo

*Greetings Markers!*

For this project I have kept the website relatively simple in design.

The layout is basically the same as the original project using rows and columns.
The text preprocessing and editor areas are on the left side in their own rows within a column,
with the play buttons, controls to change the song, or save and load a file on the right side.
This seemed to be a good design to keep it looking clean and easy to navigate.
Underneath these columns is a D3 graph ("Visualizer") that spans the width of the page.

The entire website just uses bootstrap components and a bit of custom css.

**NOTE:** if you encounter any issues where the music isn't playing for some reason, usually
stopping and playing again will fix the issue.

## Project Features:

### Play and Stop Buttons
These buttons work as you would expect! And are styled with some basic custom css.

The Play button sends the text in the preprocessing area to get "processed",
spitting out what is seen in the editor panel. This updates the CPM and volume (gain) in
the editor code with any new settings, and creates or removes buttons in the Controls
panel for each "instrument label" that exists in the song text.

Any updates made to the text preprocess area also instantly updates the set CPM and instrument
buttons that are created in the "Instrument Switches" accordion panel.

### Dark Mode
This bootstrap switch toggles a dark mode setting which changes the background to a dark grey
and text to white with some custom css. This doesn't affect the bootstrap cards, accordion or
text areas. Located in the bootstrap accordion labelled "Settings".

### Song Select
A dropdown list of a couple pre-made songs from the Strudel Bakery.
Clicking on one will update both the preprocess and editor code textareas, as well as refresh any
settings to volume or CPM. Located in the bootstrap accordion labelled "Settings".

### Save and Load (JSON)
The Save button will download whatever is in the text preprocess area as a .json file,
titled "strudelsong.json". This file contains the song text, CPM settings and instrument
on/off settings. It should save directly to whatever you have set as your downloads folder.

The Load button will bring up your file explorer, after selecting a .json file it will
update all text with the loaded song code, update the CPM, generate pattern buttons for each
"pattern" in the song text, and generate buttons for each "instrument" that's in the song
(any text that describes a section of music followed by a colon, e.g. *"drums2:"* or *"melody:"*).
It doesn't automatically play to allow you to adjust volume or settings first.

Located in the bootstrap accordion labelled "Settings".

### Visualizer
A D3 graph that dynamically creates new bars based on gain output, wherever there's a 
".log()" in the song text. Sometimes doesn't look so great when there's no variation in
gain. Would have liked to work more on this and get it to display some cooler data.


## Controls

### Master Volume Slider
Changes the volume of all "instruments" or stacks as long as they have a *".gain(x)"*
attached to them in the preprocess area. Does not affect postgain. I would recommend starting
a song with this turned down. : - )

### Set CPM
Buttons to increment or decrement the CPM by 1 and an input field for setting a custom
CPM. This also shouldn't let you set it to 0 or a negative number.

### Instrument Hush
These are dynamically created for each song and are updated whenever a new "instrument label"
is added or removed (e.g. "bassline:"). Clicking these turns the instruments on or off.

Instrument buttons should also configure appropriately to match any saved settings on file load, however
it won't show up in the code editor until the code has been evaluated by hitting the Play button.

### Pattern Selection
Radio buttons to choose between the patterns defined in the song code with "patterns = ["x", "y"]".
Updates "pattern" in the song code with the selected pattern number.

Only supports 1 type of pattern. For example in stranger_tune, the gain_patterns can be the only
type. If another set of patterns were added (a different pattern for melody or similar) it causes some
funky behaviour or just doesn't show up.

### Effects
Sliders to add effects to the song. Includes low-pass filter, delay and room (reverb). Setting the slider
all the way to the left (at 0) will turn the effect off. These add something like *"all(x => x.effect())"*
to the song code.

### --Song Code Used--
- "coastline" by eddyflux
- Untitled ("Friendship") by Felix Roos
- The supplied "stranger_tune" Algorave Dave remix
