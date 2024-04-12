import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(" نام الزامی است")
    .matches(/^[\u0600-\u06FF\s]+$/, " نام باید شامل حروف فارسی باشد")
    .min(2, "بیش از 20 کاراکتر نامعتبر است")
    .max(20, "بیش از 20 کاراکتر نامعتبر است"),

    familyName: Yup.string()
    .required(" نام خانوادگی الزامی است")
    .matches(/^[\u0600-\u06FF\s]+$/, " تام خانوادگی باید شامل حروف فارسی باشد")
    .min(3, "بیش از 20 کاراکتر نامعتبر است")
    .max(20, "بیش از 20 کاراکتر نامعتبر است"),
});
  
  const NameCompo = () => {
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        name: "",
        familyName: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) =>{
        navigate("/CompeleteCompo", { state: { name: values.name, familyName: values.familyName } });
      }
      
    });
  
    return (
      <div className="relative px-5  h-[45vh] bg-customWhite rounded-md ">
        
        <form onSubmit={formik.handleSubmit}>
          
  
          <div className="myFiled    h-[30vh]   flex flex-col justify-between   left-0 right-0 mx-auto mt-8 ">
            <div>
            <input
              className="border border-customGray dir-rtl p-1 focus:outline-none rounded-md"
              type="text"
              name="name"
              placeholder="نام"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div className="mt-0 dir-rtl">
            {formik.touched.name && formik.errors.name ? (
              <p className="text-customRed text-xs">{formik.errors.name}</p>
            ) : null}
            </div>
            </div>
            
            <div>
            <input
              className="border border-customGray dir-rtl p-1 focus:outline-none rounded-md"
              type="text"
              name="familyName"
              placeholder="نام خانوادگی"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.familyName}
            />
            <div className="mt-0 dir-rtl">
            {formik.touched.familyName && formik.errors.familyName ? (
              <p className="text-customRed text-xs">{formik.errors.familyName}</p>
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
  
  export default NameCompo;
  