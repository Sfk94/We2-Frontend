import React, { Component } from "react";

import "../layout/css/style.css";

import LoginButton from "./LogInOutButtons/LoginButton";

class PublicPage extends Component {

  render() {
    return (
      <div>
        <section id="aboveTheFold">
          <div id="aboveTheFoldContent">
            <h1>Forum</h1>
            <p>für Reiseliebhaber</p>
            <LoginButton />
          </div>
        </section>

        <section id="mainContent">
          <div class="desc">
            <h1>Reise Forum</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
              no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div class="container">
            <div class="row">
              <div onclick="window.location = 'forum_template.html'" class="col-sm game_grid_item classic">
              </div>
              <div class="col-sm game_grid_item tbc">
              </div>
              <div class="col-sm game_grid_item wotlk">
              </div>
            </div>
            <div class="row">
              <div class="col-sm game_grid_item mist">
              </div>
              <div class="col-sm game_grid_item legion">
              </div>
              <div class="col-sm game_grid_item shadow">
              </div>
            </div>
          </div>
        </section>
        <section id="imp_dat">
          <ul>
            <li>Impressum</li>
            <li>Datenschutz</li>
          </ul>
        </section>
      </div>
    )
  }
}

export default PublicPage