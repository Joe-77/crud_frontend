import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleIncrementCustomer = () => {
    if (current < customerData.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  const handleDecrementCustomer = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(customerData.length - 1);
    }
  };

  const handleUpdate = (data: any) => {
    setLoading(true);
    axios
      .put(
        `https://crud-no63.vercel.app/update-customer/${customerData[current]._id}`,
        data
      )
      .then(() => {
        setLoading(false);

        toast.success("Customer updated successfully");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("https://crud-no63.vercel.app/get-customers")
      .then((res) => {
        setCustomerData(res.data);
        setCurrent(0);
      })
      .catch((error) => {
        setCustomerData([]);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    reset(customerData[current]);
  }, [current]);

  return (
    <section>
      {customerData.length === 0 ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          <div>
            <h5 className="text-xl text-center text-red-600 font-bold">
              No data found.
            </h5>
            <Link
              to="/add-branch"
              className="mt-4 bg-blue-600 text-white max-w-40 w-full py-2 rounded-md block text-center"
            >
              Add Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-6">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="grid grid-cols-2 gap-7">
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <span className="text-xs font-bold">Branch</span>

                <div className="outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 cursor-not-allowed select-none">
                  {customerData[current].branch_id}
                </div>
              </div>
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="customer_number" className="text-xs font-bold">
                  Custom No.
                </label>
                <input
                  {...register("customer_number", { required: true })}
                  type="number"
                  id="customer_number"
                  placeholder={customerData[0].customer_number}
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 ${
                    errors.customer_number && "border-red-600"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-8">
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="arabic_name" className="text-xs font-bold">
                  Arabic Name
                </label>
                <input
                  {...register("arabic_name", { required: true })}
                  type="text"
                  id="arabic_name"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 text-end ${
                    errors.arabic_name ? "border-red-600" : ""
                  }`}
                />
              </div>
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="arabic_des" className="text-xs font-bold">
                  Arabic Description
                </label>
                <input
                  {...register("arabic_description", { required: true })}
                  type="text"
                  id="arabic_des"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 text-end ${
                    errors.arabic_description ? "border-red-600" : ""
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-8">
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="english_name" className="text-xs font-bold">
                  English Name
                </label>
                <input
                  {...register("english_name", { required: true })}
                  type="text"
                  id="english_name"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 ${
                    errors.english_name ? "border-red-600" : ""
                  }`}
                />
              </div>
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label
                  htmlFor="english_description"
                  className="text-xs font-bold"
                >
                  English Description
                </label>
                <input
                  {...register("english_description", { required: true })}
                  type="text"
                  id="english_description"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 ${
                    errors.english_description ? "border-red-600" : ""
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-7 mt-8">
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="note" className="text-xs font-bold">
                  Note
                </label>
                <textarea
                  {...register("note", { required: true })}
                  id="note"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 resize-none ${
                    errors.note ? "border-red-600" : ""
                  }`}
                ></textarea>
              </div>
              <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
                <label htmlFor="address" className="text-xs font-bold">
                  Address
                </label>
                <textarea
                  {...register("address", { required: true })}
                  id="address"
                  className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 resize-none ${
                    errors.address ? "border-red-600" : ""
                  }`}
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-3 absolute top-3 right-2 xs:right-10">
              <Link
                to="/add-branch"
                className="text-xl bg-white lg:w-6 lg:h-6 flex items-center justify-center rounded-full text-black"
              >
                <IoAddOutline />
              </Link>
              <button
                disabled={loading}
                className=" text-white text-xl sm:text-2xl flex items-center justify-center z-50 disabled:cursor-not-allowed disabled:text-gray-500  py-2 rounded-md"
              >
                <IoMdSave />
              </button>
            </div>
          </form>

          {customerData?.length > 1 && (
            <div className="absolute top-1/4 -translate-y-1/2 w-full left-0">
              <button
                disabled={loading ? true : false}
                onClick={handleDecrementCustomer}
                className="absolute left-2 sm:left-8 bg-gray-500 shadow-md w-8 h-8 rounded-full flex justify-center items-center text-white disabled:cursor-not-allowed"
              >
                <FaArrowLeft />
              </button>
              <button
                disabled={loading ? true : false}
                onClick={handleIncrementCustomer}
                className="absolute right-2 sm:right-8 bg-gray-500 shadow-md w-8 h-8 rounded-full flex justify-center items-center text-white disabled:cursor-not-allowed"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
