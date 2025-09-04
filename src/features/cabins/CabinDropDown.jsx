import { HiMiniSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../UI/Modal";
import DeleteCabin from "./DeleteCabin";
import CabinForm from "./CabinForm";
import CloneCabin from "./CloneCabin";

export default function CabinDropDown({ tableRow, closeMenu }) {
  return (
    <div className="rounded-md border-2 border-slate-50 
    bg-white p-0.5 shadow shadow-slate-200 *:cursor-pointer *:rounded-md *:px-7 *:py-1.5">
      <CloneCabin
        className="flex items-center gap-3 hover:bg-[#F9FAFB]"
        tableRow={tableRow}
        closeMenu={closeMenu}
      >
        <HiMiniSquare2Stack /> <p>Duplicate</p>
      </CloneCabin>

      <div className="hover:bg-[#F9FAFB]">
        <Modal>
          <Modal.Button>
            <div className="flex items-center gap-3">
              <HiPencil />
              <p>Edit</p>
            </div>
          </Modal.Button>
          <Modal.Window>
            <CabinForm tableRow={tableRow} closeMenu={closeMenu} />
          </Modal.Window>
        </Modal>
      </div>
      <div className="hover:bg-[#F9FAFB]">
        <Modal>
          <Modal.Button>
            <div className="flex items-center gap-3">
              <HiTrash />
              <p>Delete</p>
            </div>
          </Modal.Button>
          <Modal.Window>
            <DeleteCabin id={tableRow.id} imagePath={tableRow.cabin_image} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
