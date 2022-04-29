import React from 'react'

export const Alert = (props) => {
    return (
        <div>
            {props.data && <div className={`alert alert-${props.data.type}`} role="alert">
                {props.data.msg}
            </div>}
        </div>
    )
}
