import { authRegister } from "../../config/firebase-auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function UserRegister(props) {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="col-sm-12 col-lg-4">
      <div className="card card-style">
        <div className="content">
          <p className="mb-n1 color-highlight font-600 font-12">
            Register Account
          </p>
          <h4>Firebase Authentication</h4>
          <p>Register using email and password</p>

          <div className="mt-5 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                <input
                  {...register("email")}
                  type="text"
                  className="form-control validate-name"
                />
                <label htmlFor="form1" className="color-highlight">
                  Email
                </label>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                <input
                  {...register("password")}
                  type="password"
                  className="form-control validate-name"
                />
                <label htmlFor="form1" className="color-highlight">
                  Password
                </label>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
