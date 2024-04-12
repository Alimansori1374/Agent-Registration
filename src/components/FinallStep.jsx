import React from "react";

const FinallStep = () => {
  return (
    <div className="flex flex-col justify-between bottom-0 dir-rtl bg-customWhite w-{100vw} p-2 h-[30vh] rounded-t-[25px]">
      <div className="title text-xs"> نماینده محترم :</div>
      <div className="myText text-xs">
        درخواست ثبت نام شما در حال بررسی است . در صورت تایید اطلاعات اپلیکیشن
        مورد نظر فعال خواهد شد.
      </div>

      <div className="w-full">
      <button
        type="submit"
        className="bg-customBlue w-full h-9 text-customWhite text-xs rounded-md font-thin "
      >
        ورود به حساب کاربری دیگر
      </button>
      </div>
    </div>
  );
};

export default FinallStep;
