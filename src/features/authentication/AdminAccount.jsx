import UpdateAccountDetails from "./UpdateAccountDetails";
import UpdateAccountPassword from "./UpdateAccountPaasword";

export default function AdminAccount() {
  return (
    <div>
      <h1 className="heading">Update your account</h1>
      <UpdateAccountDetails />
      <UpdateAccountPassword />
    </div>
  );
}
