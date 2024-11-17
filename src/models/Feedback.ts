type KeepInTouch = {
    email?: boolean
    phone?: boolean
}

type Feedback = {
    user_id: number | string,
    user_name: string,
    user_email: string,
    user_phone: string,
    section: string,
    type: string,
    keep_in_touch: KeepInTouch,
    text: string
}


export default Feedback;