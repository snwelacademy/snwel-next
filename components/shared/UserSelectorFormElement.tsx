'use client'
import { getAllUser } from '@/services/admin/user-service'
import { useQuery } from '@tanstack/react-query'
import { MultiSelect } from "react-multi-select-component";

const UserSelectorFormElement = ({
    value = [],
    onChange
}: {
    value: string[],
    onChange?: (value: string[]) => void
}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['admin/users'],
        queryFn: () => getAllUser({limit: 100})
    })

    const onChangeHandler = (val: {lable: string, value: string}[]) => {
        onChange?.(val.map(v=> v.value));
    }
    
  return (
    <MultiSelect
        options={data && data?.docs.length > 0 ? data.docs.map(d => ({label: d.name, value: d._id})) : []}
        value={(data && data?.docs.length > 0)  ? data.docs.filter(d => value.includes(d._id)).map(d => ({label: d.name, value: d._id})) : [] }
        onChange={onChangeHandler}
        labelledBy="Select User"
        isLoading={isLoading}
      />
  )
}

export default UserSelectorFormElement