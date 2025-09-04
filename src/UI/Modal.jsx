import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";

const modalContext = createContext();

export default function Modal({ children }) {
  const [isModal, setIsModal] = useState(false);

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  return (
    <modalContext.Provider value={{ openModal, isModal, closeModal }}>
      {children}
    </modalContext.Provider>
  );
}

function Button({ children }) {
  const { openModal } = useContext(modalContext);

  return (
    <>
      {Children.map(children, function (child) {
        return cloneElement(child, {
          onClick: openModal,
        });
      })}
    </>
  );
}

function Window({ children, position }) {
  const { isModal, closeModal } = useContext(modalContext);
  let positionStyles = "";

  switch (position) {
    case "center":
      positionStyles =
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      break;
    case "top-left":
      positionStyles = "top-0 left-0";
      break;
    case "top-right":
      positionStyles = "top-0 right-0";
      break;
    case "top-center":
      positionStyles = "top-0 left-1/2 transform -translate-x-1/2";
      break;
    case "bottom-left":
      positionStyles = "bottom-0 left-0";
      break;
    case "bottom-right":
      positionStyles = "bottom-0 right-0";
      break;
    case "bottom-center":
      positionStyles = "bottom-0 left-1/2 transform -translate-x-1/2";
      break;
    case "center-left":
      positionStyles = "left-0 top-1/2 transform -translate-y-1/2";
      break;
    case "center-right":
      positionStyles = "right-0 top-1/2 transform -translate-y-1/2";
      break;
    default:
      positionStyles =
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  }

  return (
    <>
      {isModal ? (
        <>
          <div
            className="fixed inset-0 m-0 flex items-center justify-center bg-black/10 backdrop-blur-xs"
            onClick={closeModal}
          ></div>
          <div className={`fixed z-50 m-1.5 ${positionStyles}`}>
            {cloneElement(children, {
              closeModal,
            })}
          </div>
        </>
      ) : null}
    </>
  );
}

Modal.Button = Button;
Modal.Window = Window;
