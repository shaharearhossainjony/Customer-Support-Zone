import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import TicketContainer from "./Components/TicketContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ticketsData from "../public/ticketsData.json";

function App() {
  const [allTickets] = useState(ticketsData);

  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

  const startWorking = (ticket) => {
    if (inProgress.find((t) => t.id === ticket.id)) {
      toast.info("Already in progress!");
      return;
    }
    setInProgress([...inProgress, ticket]);
    toast.success(`"${ticket.title}" added to In Progress`);
  };

  const completeTicket = (ticketId) => {
    const ticket = inProgress.find((t) => t.id === ticketId);
    if (!ticket) return;

    setInProgress(inProgress.filter((t) => t.id !== ticketId));
    setResolved([...resolved, ticket]);
    toast.success(`"${ticket.title}" marked as Resolved!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <Hero
        inProgressCount={inProgress.length}
        resolvedCount={resolved.length}
      ></Hero>
      <TicketContainer
        allTickets={allTickets}
        inProgress={inProgress}
        resolved={resolved}
        startWorking={startWorking}
        completeTicket={completeTicket}
      ></TicketContainer>
      <Footer></Footer>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
