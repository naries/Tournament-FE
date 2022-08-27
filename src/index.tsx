import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { getPersistor } from "@rematch/persist";
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PersistGate persistor={getPersistor()}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

reportWebVitals();
