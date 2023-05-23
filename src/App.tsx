import RootRouterConfig from "./navigation/RootRouterConfig";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <RootRouterConfig />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
