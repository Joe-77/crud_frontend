import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSave } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Add() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleAddNewBranch = (data: any) => {
    setLoading(true);

    const customerData = {
      customer_number: data.customer_number,
      arabic_name: data.arabic_name,
      arabic_description: data.arabic_des,
      english_name: data.english_name,
      english_description: data.english_des,
      note: data.note,
      address: data.address,
    };

    axios
      .post("https://crud-no63.vercel.app/create-customer", customerData)
      .then(() => {
        toast.success("customer created successfully");
        setLoading(false);
        reset();
      })
      .catch((error) => {
        toast.error("Error creating customer:", error.message);
        console.error("Error adding customer:", error);
        setLoading(false);
      });
  };

  return (
    <section>
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-5">
        <form onSubmit={handleSubmit(handleAddNewBranch)}>
          <div className="grid grid-cols-2 gap-7">
            <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
              <label htmlFor="branch" className="text-xs font-bold">
                Branch
              </label>
              <input
                type="number"
                id="branch"
                placeholder="0"
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
                placeholder="0"
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
                placeholder="مباني المؤسسة"
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 text-end ${
                  errors.arabic_name && "border-red-600"
                }`}
              />
            </div>
            <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
              <label htmlFor="arabic_des" className="text-xs font-bold">
                Arabic Description
              </label>
              <input
                {...register("arabic_des", { required: true })}
                type="text"
                id="arabic_des"
                placeholder="w"
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 text-end ${
                  errors.arabic_des && "border-red-600"
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
                placeholder="Company Branches "
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 ${
                  errors.english_name && "border-red-600"
                }`}
              />
            </div>
            <div className="flex lg:items-center lg:gap-10 gap-2 flex-col lg:flex-row w-full justify-between">
              <label htmlFor="english_des" className="text-xs font-bold">
                English Description
              </label>
              <input
                {...register("english_des", { required: true })}
                type="text"
                id="english_des"
                placeholder="this is company description"
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 ${
                  errors.english_des && "border-red-600"
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
                placeholder="Company Branches "
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 resize-none ${
                  errors.note && "border-red-600"
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
                placeholder="KSA"
                className={`outline-none border px-2 py-1 rounded-md w-full lg:w-3/4 resize-none ${
                  errors.address && "border-red-600"
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
              disabled={loading ? true : false}
              className=" text-white text-xl sm:text-2xl flex items-center justify-center z-50 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <IoMdSave />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
