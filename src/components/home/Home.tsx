import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
  const [customerData, setCustomerData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://crud-no63.vercel.app/get-customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((error) => {
        setCustomerData([]);
        console.log(error);
      });
  }, []);

  const handlerDeleteCustomer = (id: string) => {
    axios
      .delete(`https://crud-no63.vercel.app/delete-customer/${id}`)
      .then(() => {
        setCustomerData(customerData.filter((c) => c._id !== id));
        toast.success("Customer deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="overflow-x-auto">
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-10">
        <table className="table-auto w-full min-w-max border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center border-r">Branch ID</th>
              <th className="px-4 py-2 text-center border-r">Customer NO</th>
              <th className="px-4 py-2 text-center border-r">Arabic Name</th>
              <th className="px-4 py-2 text-center border-r">
                Arabic Description
              </th>
              <th className="px-4 py-2 text-center border-r">English Name</th>
              <th className="px-4 py-2 text-center border-r">
                English Description
              </th>
              <th className="px-4 py-2 text-center border-r">Note</th>
              <th className="px-4 py-2 text-center border-r">Address</th>
              <th className="px-4 py-2 text-center border-r">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer, index) => (
              <tr className="border-t" key={index}>
                <td className="px-4 py-2 text-center border-r">
                  {customer.branch_id}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.customer_number}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.arabic_name}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.arabic_description}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.english_name}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.english_description}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.note}
                </td>
                <td className="px-4 py-2 text-center border-r">
                  {customer.address}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <button className="text-blue-500 text-lg">
                    <Link
                      to={`/update-customer`}
                      state={{
                        id: customer?._id,
                      }}
                    >
                      <CiEdit />
                    </Link>
                  </button>
                  <button
                    onClick={() => handlerDeleteCustomer(customer._id)}
                    className="text-red-500 text-lg"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
