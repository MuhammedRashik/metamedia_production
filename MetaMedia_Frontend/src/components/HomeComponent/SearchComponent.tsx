import React from "react"
import { SetSidebarOpenFunction } from "src/pages/user/Home"

const Search: React.FC<SetSidebarOpenFunction> =  React.memo(({setSidebarOpen}) => {
    setSidebarOpen(true)
    return (

    <>

<div>search</div>
    
    
    </>


    )
})

export default Search