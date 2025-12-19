/**
 * App Component
 *
 * Main application component that includes the global Navbar
 * and renders routes based on the current URL path.
 */

import Navbar from "./components/Navbar";
import AppRoutes from "./router/routes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
