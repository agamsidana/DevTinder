import { Controller, useFormContext } from "react-hook-form";

function RHFTextField({ name, placeholder, style, type = "text", others }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field}) => {
        return (
          <input
            type={type}
            placeholder={placeholder}
            className={
              style ??
              "input input-sm bg-slate-950 border border-slate-700  text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40 transition"
            }
            {...field}
            {...others}
          />
        );
      }}
    />
  );
}

export default RHFTextField;
