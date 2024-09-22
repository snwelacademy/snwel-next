
import { getAllMasters } from '@/services/admin/admin-master';
import { Master, MASTER_TYPE } from '@/types/master';
import { useQuery } from '@tanstack/react-query';
import AsyncSelect from 'react-select/async';

interface DropdownSelectorProps {
    parentCode?: string; // Optional parent code for filtering
    onChange: (value: string[]) => void;
    value?: string[];
    selectorKey?: keyof Master,
    type?: MASTER_TYPE,
    placeholder?: string
}


export const MultiSelectMaster = ({ parentCode, onChange, value=[], selectorKey = '_id', type, placeholder }: DropdownSelectorProps) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['/api/masters', parentCode],
        queryFn: () => getAllMasters({ filter: getFilterValue({parentCode, type}) })
    });
    

    const getFilterValue = (data: { parentCode?: string, type?: MASTER_TYPE }) => {
        const filter: any = {};
        if (parentCode) filter['parentCode'] = data.parentCode;
        if (type) filter['type'] = data.type;
        return filter;
    }

    const promiseOptions = async (inputValue: string) => {
        const masters = await getAllMasters({ search: inputValue, filter: getFilterValue({ parentCode, type }) });
        return masters.docs.map(master => ({label: master.name, value: master[selectorKey] as string}))
    }

    const convertMasterToMultiSelectValue = (dta: string) => {
    
        const exist = data?.docs?.find(dt => dt._id === dta);
        return {
          label: exist?.name||'',
          value: exist?._id||''
        }
      }

    console.log("value", value)
    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            onChange={value => onChange(value.map(vl => vl.value)) }
            placeholder={placeholder}
            value={value.map(vl => convertMasterToMultiSelectValue(vl))}
        />
    )
}
