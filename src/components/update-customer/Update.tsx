import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSave } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Update() {
  const { id } = useLocation().state;
  const [loading, setLoading] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleUpdate = (data: any) => {
    setLoading(true);
    axios
      .put(`https://crud-no63.vercel.app/update-customer/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        toast.success("Customer updated successfully");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`https://crud-no63.vercel.app/get-customer/${id}`)
      .then((res) => {
        setCustomerData(res.data);
        reset(res.data);
      })
      .catch(() => {
        setCustomerData(null);
      });
  }, [id, reset]);

  return (
    <section>
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-5">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-2 gap-7">
            <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
              <label htmlFor="branch" className="text-xs font-bold">
                Branch
              </label>
              <input
                type="number"
                id="branch"
                placeholder={customerData?.branch_id}
                disabled
                className="outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
              <label htmlFor="customer_number" className="text-xs font-bold">
                Custom No.
              </label>
              <input
                {...register("customer_number", { required: true })}
                type="number"
                id="customer_number"
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

          <div className="flex items-center gap-3 absolute top-5 right-5">
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
      </div>
    </section>
  );
}
