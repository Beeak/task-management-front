import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUser } from "../lib/api";
import { Input } from "../components/Input";

export const Route = createFileRoute("/register")({
    component: Login
})

interface Inputs {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

function Login() {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
        await createUser(inputs);

        navigate({ to: "/login" })
    }

    return <div className="flex justify-center items-center w-screen h-screen">
        <form className="flex flex-col gap-1.5" onSubmit={handleSubmit(onSubmit)}>
            <p className="self-center font-bold uppercase">Register</p>
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("email")} placeholder="Email address" />
            <Input {...register("password")} placeholder="Password" type="password" />
            <Input {...register("passwordConfirmation")} placeholder="Password confirmation" />

            <input type="submit" value="Register" className="bg-green-400 rounded px-2 py-1 text-white font-bold" />
        </form>
    </div>
}