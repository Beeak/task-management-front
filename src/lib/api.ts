import { Axios } from "axios";

export const AXIOM = new Axios({
    baseURL: "http://localhost:8000"
})

interface LoginParams {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

export async function createUser(params: LoginParams): Promise<void> {
    await AXIOM.post("/register", {
        password_onfirmation: params.passwordConfirmation,
        ...params
    })
}