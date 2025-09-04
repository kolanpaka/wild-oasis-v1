import { useQuery } from "@tanstack/react-query";
import Table from "../../UI/Table";
import { getCabins } from "../../services/cabinAPI";

import Spinner from "../../UI/Spinner";
import CabinRow from "./CabinRow";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import CabinForm from "./CabinForm";
import { useSearchParams } from "react-router-dom";

export default function CabinDataTable() {
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy");

  const { data, status, error } = useQuery({
    queryKey: [
      "cabins",
      {
        discount,
        sortBy,
      },
    ],
    queryFn: () => getCabins(discount, sortBy),
  });

  if (status == "pending") {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <Table className="">
        <Table.Header>
          <Table.Head className="col-span-2"></Table.Head>
          <Table.Head className="col-span-2">cabin</Table.Head>
          <Table.Head className="col-span-3">capacity</Table.Head>
          <Table.Head className="col-span-2">price</Table.Head>
          <Table.Head className="col-span-2">discount</Table.Head>
          <Table.Head className="col-span-1"></Table.Head>
        </Table.Header>
        <Table.Body className="text-slate-700">
          {status === "error" ? (
            <div className="m-auto my-12 w-[50%] space-y-3">
              <p>Something went wrong while fetching the data from API 🙂</p>
              <p className="text-red-400">Reason : {error.message}</p>
            </div>
          ) : data.length == 0 ? (
            <div className="my-16 text-center text-lg text-slate-700">
              <p>No cabins found. Start by adding a new one!!</p>
            </div>
          ) : (
            data?.map((eachRow) => (
              <CabinRow tableRow={eachRow} key={eachRow.id} />
            ))
          )}
        </Table.Body>
      </Table>
      <Modal>
        <Modal.Button>
          <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
            Add new Cabin
          </Button>
        </Modal.Button>

        <Modal.Window>
          <CabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
