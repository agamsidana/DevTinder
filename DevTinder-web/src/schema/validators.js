import * as yup from 'yup';

export const SignUpSchema=yup.object({
    firstName:yup.string().required(),
    lastName:yup.string().required(),
    email:yup.string().required(),
    password:yup.string().required(),
    age:yup.number().transform((value,originalValue)=>originalValue==="" ? null : value).required().min(1).max(90),
    about:yup.string().required(),
    skills:yup.string().required()
});

export const LoginSchema=yup.object({
    email:yup.string().required(),
    password:yup.string().required(),
});

export const UpdateProfileSchema=yup.object({
    firstName:yup.string().required(),
    lastName:yup.string().required(),
    age:yup.number().transform((value,originalValue)=>originalValue==="" ? null : value).required().min(1).max(90),
    about:yup.string().required(),
    gender:yup.string().required()
});