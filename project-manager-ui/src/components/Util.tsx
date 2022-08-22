import {Circles} from "react-loader-spinner";
import React from "react";
import {Options} from "react-confirm-box/dist/types";
import {translateNo, translateYes} from "../service/LanguageService";

export const displayMessages = (error: string, success?: string) => {
  return (<div>
    {error === "" ? "" : <div className="alert alert-danger" role="alert">
      {error}
    </div>}
    {success === "" || success === undefined ? "" : <div className="alert alert-primary" role="alert">
      {success}
    </div>}
  </div>)
}

export const loader = () => <div className="w-100 h-100 d-flex justify-content-center" style={{background: "#36b9cc"}}>
  <Circles color="#00BFFF" height={500} width={500}/>
</div>

export const yesNoOption: Options = {
  labels: {
    confirmable: translateYes(),
    cancellable: translateNo()
  }
}