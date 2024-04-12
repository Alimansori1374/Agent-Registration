import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    phone_number: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(/^[0-9]+$/, "شماره موبایل باید عددی باشد")
      .min(11, "شماره موبایل باید 11 رقمی باشد")
      .max(11, "شماره موبایل باید 11 رقمی باشد"),
  });
  
  const GetPhone = () => {
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        phone_number: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("values" , values);
        try {
          const response = await fetch("https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: values.phone_number,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to send OTP. Please try again later.");
            
          }
      
          console.log("  successfully!");
          navigate("/CodePhone" , { state: values.phone_number });
        } catch (error) {
          console.error("Error sending OTP:", error.message);
        }
      },
      
    });
  
    return (
      <div className="relative  h-[45vh] bg-customWhite rounded-md px-5">
        <div className="myTitle flex flex-col justify-center items-center mt-5 mb-5 ">
            <h2 className="font-bold">شماره موبایل خود را وارد نمایید</h2>
            <h3 className="text-xs mt-1">کد تایید برای شما ارسال خواهد شد</h3>
          </div>
        <form onSubmit={formik.handleSubmit}>
          
  
          <div className="myFiled   h-[27vh]   flex flex-col justify-between   left-0 right-0 mx-auto ">
            <div>
            <input
              className="border border-customGray dir-rtl p-1 focus:outline-none rounded-md"
              type="text"
              name="phone_number"
              placeholder="تلفن همراه"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
            />
            <div className="mt-0 dir-rtl">
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <p className="text-customRed text-xs">{formik.errors.phone_number}</p>
            ) : null}
            </div>
            </div>
            
            
            <button
              type="submit"
              className="bg-customBlue h-9 text-customWhite text-xs rounded-md font-thin "
            >
              ادامه
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default GetPhone;
  