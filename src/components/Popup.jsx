import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Popup() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    openModal();
  }, []);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80vw",
      maxHeight: "80vh",
      overflow: "auto",
    },
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Popup Message"
        style={modalStyles}
      >
        <h2 className="border-b pb-4 text-3xl">
          Important Message
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-lg text-white float-right"
          >
            x
          </button>
        </h2>
        <p className="font-bold text-lg">
          Welcome to Dijkstra Algorithm Visualizer
        </p>
        <p className=" text-lg">
          It is a visual representation of how this algorithm works
        </p>
        <p className=" text-lg">Steps:</p>
        <li className="my-2">Select Starting Point</li>
        <li className="my-2">Select Finish Point</li>
        <li className="my-2">Add Walls</li>
        <li className="my-2">Start Visualization</li>
        <li className="my-2">Clear board to Restart</li>
        <p
          className="text-red-500 font-bold
        "
        >
          Note:
        </p>
        <li>
          Adding walls before setting starting and ending points will remove the
          walls
        </li>
      </Modal>
    </div>
  );
}
