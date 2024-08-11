'use client'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = (_op: { type: 'table' | 'page' | 'default' }) => {
    return (
        <InfinitySpin
            width="200"
            color="#4fa94d"
        />
    )
}

export default Loader