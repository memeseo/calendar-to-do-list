import ReactDOM from 'react-dom/client';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { theme } from 'asset/Common/Theme';
import { CommonStyle } from 'asset/Common/Common';
import rootReducer from 'reducer/index';
import { createStore} from "redux";
import { Provider } from 'react-redux';

export const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CommonStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

