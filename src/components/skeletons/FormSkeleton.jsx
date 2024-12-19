import React from 'react'

const FormSkeleton = (props) => {
    const { height, width } = props
return (
    <div className={`${height} ${width} rounded-lg bg-slate-500 animate-pulse`}></div>
)
}

export default FormSkeleton