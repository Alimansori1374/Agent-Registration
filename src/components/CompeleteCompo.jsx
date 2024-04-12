import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  agent_code: Yup.string()
    .required("کد نمایندگی الزامی است")
    .matches(/^[0-9]+$/, "کد نمایندگی باید عددی باشد")
    .min(4, "کد نمایندگی باید 4 رقمی باشد")
    .max(4, "کد نمایندگی باید 4 رقمی باشد"),
  province: Yup.string().required("استان را انتخاب کنید"),
  county: Yup.string().required("شهر را انتخاب کنید"),
  address: Yup.string().required("آدرس را وارد کنید"),
  insurance_branch: Yup.string().required("شعبه بیمه را انتخاب کنید"),
  city_code: Yup.string()
    .required("کد شهر الزامی است")
    .matches(/^[0-9]+$/, "کد شهر باید عددی باشد")
    .min(3, "کد شهر باید 3 رقمی باشد")
    .max(3, "کد شهر باید 3 رقمی باشد"),
  phone: Yup.string()
    .required("تلفن الزامی است")
    .matches(/^[0-9]+$/, "تلفن باید عددی باشد")
    .min(8, "تلفن باید 8 رقمی باشد")
    .max(8, "تلفن باید 8 رقمی باشد"),
  agency_type: Yup.string().required("نوع نمایندگی الزامی است"),
  Name: Yup.string().when("agency_type", (agency_type, schema) => {
    console.log("Agent Type:", agency_type);
    return agency_type === "legal"
      ? schema.required("نام الزامی است")
      : schema.notRequired();
  }),
});

const CompleteCompo = () => {
  const [provinces, setProvinces] = useState([]);
  const [counties, setCounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDisabled, setSearchDisabled] = useState(true);


  const [insuranceBranches, setInsuranceBranches] = useState([]);


  const location = useLocation();
  const first_name = location.state?.name;
  const last_name = location.state?.familyName;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      agent_code: "",
      province: "",
      county: "",
      address: "",
      insurance_branch: "2",
      city_code: "",
      phone: "",
      agency_type: "real",
      Name: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const response = await fetch(
          "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values, 
              first_name ,
              last_name

              
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send OTP. Please try again later.");
        }

        const responseData = await response.json();

        const accessToken = responseData.access;

        localStorage.setItem("access_token", accessToken);

        console.log("OTP sent successfully!");
      } catch (error) {
        console.error("Error sending OTP:", error.message);
      } finally {
        navigate("/FinallStep");
      }
    },
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://stage-api.sanaap.co/base/provinces_wop/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProvinces(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleAgentCodeChange = async (e) => {
    const agentCode = e.target.value;
    formik.setFieldValue("agent_code", agentCode);
    try {
      const response = await fetch(
        `https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/${agentCode}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error checking agent code:", error);
    }
  };

  const handleProvinceChange = async (e) => {
    const selectedProvinceId = e.target.value;
    formik.setFieldValue("province", selectedProvinceId);
    try {
      const response = await fetch(
        `https://stage-api.sanaap.co/base/counties_wop/?province=${selectedProvinceId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCounties(data);
      setSearchDisabled(false);
    } catch (error) {
      console.error("Error fetching counties:", error);
    }
  };

  useEffect(() => {
    const fetchInsuranceBranches = async () => {
      try {
        const response = await fetch(
          `https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/?name=73&insurance=DEY&province=8`        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInsuranceBranches(data.response);
      } catch (error) {
        console.error("Error fetching insurance branches:", error);
      }
    };

    fetchInsuranceBranches();
  }, []);

  



  const handleAgentTypeChange = (event) => {
    const selectedAgentType = event.target.value;
    formik.setFieldValue("agency_type", selectedAgentType);

    console.log("Selected Agent chheck Type:", selectedAgentType);
  };

  return (
    <div className="relative  px-2 h-[80vh] bg-customWhite rounded-md ">
      <form onSubmit={formik.handleSubmit}>
        <div className="myFiled h-[27vh] mt-8 flex flex-col justify-between left-0 right-0 mx-auto ">
          <div>
            <input
              className="border w-full border-customGray dir-rtl p-1 focus:outline-none rounded-md"
              type="text"
              name="agent_code"
              placeholder="کد نمایندگی"
              onChange={handleAgentCodeChange}
              onBlur={formik.handleBlur}
              value={formik.values.agent_code}
            />
            {formik.touched.agent_code && formik.errors.agent_code ? (
              <p className="text-customRed text-xs dir-rtl">
                {formik.errors.agent_code}
              </p>
            ) : null}
          </div>

          <div className="mt-2">
            <select
              className="border w-full border-customGray dir-rtl text-textGray p-1 focus:outline-none rounded-md"
              name="province"
              placeholder="استان"
              onChange={handleProvinceChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
            >
              <option value="">استان</option>
              {loading ? (
                <option value="">Loading...</option>
              ) : (
                provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))
              )}
            </select>
            {formik.touched.province && formik.errors.province ? (
              <p className="text-customRed text-xs dir-rtl">
                {formik.errors.province}
              </p>
            ) : null}
          </div>

          <div className="mt-2">
            <select
              className={`border w-full ${
                provinces.length === 0 ? "bg-customGray" : null
              }  border-customGray text-textGray dir-rtl p-1 focus:outline-none rounded-md`}
              name="county"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.county}
              disabled={provinces.length === 0 ? true : false}
            >
              <option value="">شهر ها</option>
              {counties.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            {formik.touched.county && formik.errors.county ? (
              <p className="text-customRed text-xs dir-rtl">
                {formik.errors.county}
              </p>
            ) : null}
          </div>

          <div className="mt-2">
            <textarea
              className="border w-full border-customGray dir-rtl p-1 focus:outline-none rounded-md"
              type="text-a"
              name="address"
              placeholder="آدرس"
              onChange={formik.handleChange}
              rows="5"
              cols="25"
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-customRed text-xs dir-rtl">
                {formik.errors.address}
              </p>
            ) : null}
          </div>

          <div>
              <select
                className="border w-full border-customGray text-textGray dir-rtl p-1 focus:outline-none rounded-md"
                name="insurance_branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.insurance_branch}
              >
                <option value="">شعبه بیمه</option>
                {insuranceBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              {formik.touched.insurance_branch &&
                formik.errors.insurance_branch && (
                  <p className="text-customRed text-xs dir-rtl">
                    {formik.errors.insurance_branch}
                  </p>
                )}
            </div>

          <div className="flex mt-2">
            <div className="relative ">
              <label
                className="absolute text-xs h-1 leading-3 text-customGray bg-customWhite top-[-2px] left-2 px-2 py-1  text-gray-500"
                htmlFor="city_code"
              >
                کد تلفن
              </label>
              <input
                className="border h-[2rem] w-16 mr-2 px-2 border-customGray dir-rtl focus:outline-none rounded-md"
                type="text"
                name="city_code"
                id="city_code"
                // placeholder="کد تلفن"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city_code}
              />
              {formik.touched.city_code && formik.errors.city_code ? (
                <p className="text-customRed text-xs dir-rtl">
                  {formik.errors.city_code}
                </p>
              ) : null}
            </div>

            <div>
              <input
                className="border border-customGray dir-rtl p-1 focus:outline-none rounded-md"
                type="text"
                name="phone"
                placeholder="تلفن ثابت"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-customRed text-xs dir-rtl">
                  {formik.errors.phone}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col  mt-2 ">
            <div className="filedContainer flex justify-around">
              <div className="myRadios  flex justify-between w-[12rem]">
                <label className="text-xs flex justify-center items-center">
                  حقوقی
                  <input
                    className="border ml-1 border-customGray dir-rtl p-1 focus:outline-none rounded-md"
                    type="radio"
                    name="agency_type"
                    onChange={handleAgentTypeChange}
                    onBlur={formik.handleBlur}
                    value="legal"
                    checked={formik.values.agency_type === "legal"}
                  />
                </label>
                <label className="text-xs flex justify-center items-center">
                  حقیفی
                  <input
                    className="border ml-1 border-customGray dir-rtl p-1 focus:outline-none rounded-md "
                    type="radio"
                    name="agency_type"
                    onChange={handleAgentTypeChange}
                    onBlur={formik.handleBlur}
                    value="real"
                    checked={formik.values.agency_type === "real"}
                  />
                </label>
              </div>
              <span className="text-md text-textGray">: نوع نمایندگی</span>
            </div>
            
          </div>

          {formik.values.agency_type === "legal" ? (
            <div className="relative   mt-2 ">
              <label
                className="absolute text-xs text-customGray bg-customWhite top-[-6px] right-2 px-2 py-1  text-gray-500"
                htmlFor="agent_code"
              >
                نام نمایندگی
              </label>
              <input
                className="border h-[2rem] w-full mr-2 px-2 border-customGray dir-rtl focus:outline-none rounded-md"
                type="text"
                name="Name"
                id="Name"
                // placeholder="کد تلفن"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
              />
              {formik.touched.Name && formik.errors.Name ? (
                <p className="text-customRed text-xs dir-rtl">
                  {formik.errors.Name}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="">
            <button
              type="submit"
              className="bg-customBlue w-full mt-10 h-9 text-customWhite text-xs rounded-md font-thin"
            >
              ثبت نام
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompleteCompo;
