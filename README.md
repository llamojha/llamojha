# NatalieHub - A resume

[nataliemarleny.github.io](https://nataliemarleny.github.io)<br><br>
A project which forks [Primer CSS](https://github.com/primer/primer-css) to build a Githubbified Resume.<br>
I challenged myself to:
* Write as little of my own CSS as possible 
* Build a screen-agnostic layout
* Create a working heatmap using d3.js
* Draw my own illustrations
<br><br>

## Colophon
The Primer design system is available for use under the MIT [license](https://github.com/primer/primer/blob/master/LICENSE). Copyright Github 2018.<br>
Primer has been created and is maintained by [Github's Design Systems team](https://github.com/orgs/primer/people)<br>
d3.js Calendar Heatmap forked from [Darragh Kirwan's](https://github.com/DKirwan) [Calendar Heatmap](https://github.com/DKirwan/calendar-heatmap)<br>
Illustrations are drawn (by me) and versioned using [Figma](https://www.figma.com/). Source file included.<br><br>

### Goals:

* Show rather than tell my skillset by building a static site resume
* Familiarise myself with the Primer Design System
* Version the process in Git and make the project open source
* Use the visual language and informational structure of a Github profile to tell my story

### Challenges:

#### Semantic HTML
I cross checked what I was building against inspecting source on my Github profile. I wondered if the semantics of the HTML tags would alter with this being a single static site page, with particular reference to span tags used in the timeline section. Applying heading tags where spans were applied on the Github profile page overwrote some of the CSS styling which undermined the challenge of working solely within Primer's CSS system, and made me question if I was using the 'correct' or rather, 'most semantic' tag.

#### Scaling without Jekyll
Regrets started to settle around the time I started constructing the timeline

#### Heatmap Responsiveness
As I wanted to work quickly I forked the heatmap rather than build it from scratch. Adjustments to the padding or layout would cause the tooltip to break; as the tooltip was a crucial source of information I decided to compromise on displaying the heatmap on mobile layouts.

### Post Mortem:

As the priority with this project was to ship rather than reach perfection I worked using the Primer build CSS (core and product) and forked the documentation landing page for the boilerplate HTML. If this resume was to become an frequently updated project I would take the time to refactor using Jekyll as the CMS.
<br><br><br>


![Octonat Logo](https://github.com/nataliemarleny/nataliemarleny.github.io/blob/master/assets/img/Octonat.png)
