import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routing";
import { AuthProvider } from "./hooks/use-auth";
import "./tailwind.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routing />
      </Router>
    </AuthProvider>
  );
}

export default App;
