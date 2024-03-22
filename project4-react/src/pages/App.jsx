import Login from "../components/Forms/Login";
import Header from "../components/Headers/LoginHeader";
import Footer from "../components/Footers/Footer";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage";
import ConfirmMessage from "../components/somemodals/messagesModal/ConfirmMessage";

function App() {
   return (
      <main>
         <Header />
         <Login />
         <Footer />
         <AlertsMessage />
      </main>
   );
}

export default App;
