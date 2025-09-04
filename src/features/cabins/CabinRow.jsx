import { HiOutlineDotsVertical } from "react-icons/hi";
import Table from "../../UI/Table";
import Menu from "../../UI/Menu";
import VerticalDots from "./VerticalDots";
import CabinDropDown from "./CabinDropDown";

export default function CabinRow({ tableRow }) {
  return (
    <Table.Row>
      <Table.Value>
        <img src={tableRow.cabin_image} alt={`cabin-${tableRow.id}`} />
      </Table.Value>
      <Table.Value className="font-sono font-semibold">
        {String(tableRow.cabin).padStart(3, "0")}
      </Table.Value>
      <Table.Value className="font-light tracking-wide">
        Fits up to {tableRow.capacity} guests
      </Table.Value>
      <Table.Value className="font-sono font-semibold">
        ${tableRow.price}.00
      </Table.Value>
      <Table.Value className="font-sono font-semibold text-green-700">
        {tableRow.Discount ? `$${tableRow.Discount}.00` : "—"}
      </Table.Value>
      <Table.Value>
        <Menu>
          <Menu.Item>
            <VerticalDots />
          </Menu.Item>
          <Menu.List>
            <CabinDropDown tableRow={tableRow} />
          </Menu.List>
        </Menu>
      </Table.Value>
    </Table.Row>
  );
}
