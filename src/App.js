import { Provider } from "react-redux";
import "./App.css";
import Routes from "./routes/routes";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient()
//   {
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 0
//     },
//   }
// }

// function App() {
//   return (
//     // <BrowserRouter>
//     <QueryClientProvider client={queryClient}>
//       <Routes />
//     </QueryClientProvider>
//     // </BrowserRouter>
//   );
// }

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Routes />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
