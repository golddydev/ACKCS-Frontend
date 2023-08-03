import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import Login from "features/auth/Login.js";
import Register from "features/auth/Register.js";
import WalletButton from 'features/wallet/WalletButton'

export default function Auth() {
  return (
    <>
      <Navbar transparent WalletButton={WalletButton}/>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
