import { Controller, useFormContext } from "react-hook-form";

function RHFTextArea({ name, placeholder, style, others }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field}) => {
        return (
          <textarea 
            placeholder={placeholder}
            className={
              style ??
              "textarea bg-slate-950 border border-slate-700  text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40 transition"
            }
            maxLength={150}
            {...field}
            {...others}
         />
        );
      }}
    />
  );
}

export default RHFTextArea;
