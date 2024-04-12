import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  code1: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
  code2: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
  code3: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
  code4: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
  code5: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
  code1: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "فقط عدد"),
});

const CodePhone = () => {
  const [time, setTime] = useState({ minutes: 2, seconds: 0 });

  const location = useLocation();
  const sentPhoneNumber = location.state;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
    },
    validationSchema: validationSchema,
    
   

    onSubmit: async (values) => {
      try {
        const code = parseInt(Object.values(values).join(''), 10);
        ;

        const response = await fetch(
          "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: code, 
              phone_number: sentPhoneNumber,
            }),
          }
        );

    
        if (!response.ok) {

          throw new Error("Failed to send OTP. Please try again later.");
        }
    
        console.log("successfully!");
        navigate("/nextPage"); 
      } catch (error) {
        console.error("Error sending OTP:", error.message);
      }

      finally{
        navigate("/NameCompo");

      }
    }
    
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(interval);
        alert("Timer completed!");
      } else {
        if (time.seconds === 0) {
          setTime({ minutes: time.minutes - 1, seconds: 59 });
        } else {
          setTime({ ...time, seconds: time.seconds - 1 });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);
  return (
    <div className="h-[55vh] bg-customWhite rounded-md ">
      <div className="firstCodePhone flex flex-col justify-center mt-5">
        <h2 className="text-md font-bold m-auto">
          .کد تایید شده را وارد نمایید
        </h2>
        <div className="flex justify-center items-center">
          <div className="text-sm mt-2 mr-1">{sentPhoneNumber}</div>
          <div className="bg-customBlue h-4 w-4 rounded-lg"></div>
        </div>
      </div>

      <div className="secondCodePhone px-2 mt-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="myFiled   h-[27vh]   flex  justify-between   left-0 right-0 mx-auto ">
            <div className="mr-2 ">
              <input
                className={` ${
                  formik.touched.code1 && formik.errors.code1
                    ? "border-customRed"
                    : "border-customGray"
                }   border w-12 h-12 dir-ltr  dir-rtl p-1 focus:outline-customBlue rounded-md`}
                type="text"
                name="code1"
                maxLength={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code1}
              />
              
            </div>
            <div className="mr-2 ">
              <input
                className={` ${
                  formik.touched.code2 && formik.errors.code2
                    ? "border-customRed"
                    : "border-customGray"
                }   border w-12 h-12 dir-ltr border-customGray dir-rtl p-1 focus:outline-customBlue rounded-md`}
                type="text"
                name="code2"
                maxLength={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code2}
              />
              
            </div>

            <div className="mr-2 ">
              <input
                className={` ${
                  formik.touched.code3 && formik.errors.code3
                    ? "border-customRed"
                    : "border-customGray"
                }   border w-12 h-12 dir-ltr border-customGray dir-rtl p-1 focus:outline-customBlue rounded-md`}
                type="text"
                name="code3"
                maxLength={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code3}
              />
              
            </div>

            <div className="mr-2 ">
              <input
                className={` ${
                  formik.touched.code4 && formik.errors.code4
                    ? "border-customRed"
                    : "border-customGray"
                }   border w-12 h-12 dir-ltr border-customGray dir-rtl p-1 focus:outline-customBlue rounded-md`}
                type="text"
                name="code4"
                maxLength={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code4}
              />
             
            </div>

            <div className="mr-2 ">
              <input
                className={` ${
                  formik.touched.code5 && formik.errors.code5
                    ? "border-customRed"
                    : "border-customGray"
                }   border w-12 h-12 dir-ltr border-customGray dir-rtl p-1 focus:outline-customBlue rounded-md`}
                type="text"
                name="code5"
                maxLength={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code5}
              />
              
            </div>
          </div>

          <div className="w-full  flex justify-center mb-3 ">
            <div>
              {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
              {time.seconds < 10 ? "0" + time.seconds : time.seconds}
            </div>
            <span className="text-sm ml-2"> ارسال مجدد کد</span>
          </div>
          <button
            type="submit"
            className="bg-customBlue h-9 w-full mb-3 text-customWhite text-xs rounded-md font-thin "
          >
            ادامه
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodePhone;
