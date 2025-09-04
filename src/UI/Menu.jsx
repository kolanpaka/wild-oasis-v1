import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const menuContext = createContext();

export default function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    function handler(e) {
      if (!e.target.closest(".menuItem")) {
        setIsOpen(false);
      }
    }
    if (isOpen && inputRef.current) {
      document.body.addEventListener("click", handler);
    }

    return function () {
      document.body.removeEventListener("click", handler);
    };
  }, [isOpen]);

  function triggerMenu() {
    setIsOpen((isModal) => !isModal);
  }

  function closeMenu() {
    setIsOpen(false);
  }
  return (
    <menuContext.Provider value={{ isOpen, triggerMenu, closeMenu }}>
      <div className="menuItem relative w-fit" ref={inputRef}>
        {children}
      </div>
    </menuContext.Provider>
  );
}

function Item({ children }) {
  const { triggerMenu, isOpen } = useContext(menuContext);

  return (
    <>
      {Children.map(children, function (child) {
        return cloneElement(child, {
          onClick: triggerMenu,
          isOpen: isOpen,
          
        });
      })}
    </>
  );
}

function List({ children, position }) {
  let listPosition;

  const { isOpen, closeMenu } = useContext(menuContext);

  switch (position) {
    case "bottom-left":
      listPosition = "top-[112%] left-0";
      break;
    case "bottom-right":
      listPosition = "top-[112%] right-0";
      break;
    case "bottom-center":
      listPosition = "top-[112%] left-1/2 -translate-x-1/2";
      break;
    default:
      listPosition = "top-[112%] right-0";
      break;
  }
  return (
    <>
      {isOpen && (
        <div className={`absolute z-[4699] ${listPosition}`}>
          {Children.map(children, function (child) {
            return cloneElement(child, {
              closeMenu,
            });
          })}
        </div>
      )}
    </>
  );
}

Menu.Item = Item;
Menu.List = List;
