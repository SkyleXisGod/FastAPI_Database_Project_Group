import React from "react";
import WeaponList from "./components/WeaponList";
import WeaponForm from "./components/WeaponForm";

export default function App(){
  return (
    <div className="container">
      <h1>Weapon DB</h1>
      <WeaponForm />
      <WeaponList />
    </div>
  );
}
