import { FormWrapper } from "./FormWrapper";
type userData = {
    firstname :string,
    lastname:string,
    age:string,
}
type UserFormProps =userData & {
    updateFields :(fields :Partial<userData> ) =>void
}

export function UserForm({firstname ,lastname ,age,updateFields}:UserFormProps) {
    return(
        <FormWrapper title="User Details">
                <label>Fist Name</label>
                <input autoFocus type="text" placeholder="firstName" value={firstname} onChange={e =>updateFields({firstname:e.target.value})}/>
                <label>Last Name</label>
                <input type="text" placeholder="lastName" value={lastname} onChange={e =>updateFields({lastname:e.target.value})} />
                <label>Age</label>
                <input type="number" required min={1} placeholder="age" value={age} onChange={e =>updateFields({age:e.target.value})}/>
        </FormWrapper>
    )
}