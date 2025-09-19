import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "token portfolio",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#a9e851",
                accentColorForeground: "black",
                borderRadius: "small",
                fontStack: "rounded",
                overlayBlur: "small",
              })}
            >
              <App />
            </RainbowKitProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
