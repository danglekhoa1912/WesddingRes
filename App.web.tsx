import React from 'react';
import {StyleSheet} from 'react-native';
import LoginPage from './src/web/page/LoginPage';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundPage from './src/web/page/NotFound';
import AdminLayout from './src/web/layout/AdminLayout';
import DishManager from './src/web/page/DishManager';
import {ThemeProvider} from '@mui/material';
import theme from './src/web/themes';
import ServiceManager from './src/web/page/ServiceManager';
import LobbyManager from './src/web/page/LobbyManager';
import {ADMIN_ROUTES} from './src/web/router';
import MainLayout from './src/web/layout/MainLayout';
import ChatPage from './src/web/page/ChatPage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path={'/'} element={<LoginPage />} />
            <Route element={<MainLayout />}>
              <Route path="admin" element={<AdminLayout />}>
                {ADMIN_ROUTES.map(route => (
                  <Route path={route.path} element={route.element} />
                ))}
              </Route>
              <Route path="chat/:userId" element={<ChatPage />} />
              <Route path="chat" element={<ChatPage />} />
            </Route>
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
