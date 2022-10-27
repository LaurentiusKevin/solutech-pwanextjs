import { useForm } from "react-hook-form";

export default function Forms(props) {
  const { register, handleSubmit } = useForm();

  const { children, onSubmit } = props;

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}
