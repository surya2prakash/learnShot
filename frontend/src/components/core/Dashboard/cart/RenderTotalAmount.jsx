import React from 'react'

export default function RenderTotalAmount() {

    const {total,cart} = useSelector(state=>state.cart);
    const {token} = useSelector(state=>state.auth);
    const {user} = useSelector(state=>state.profile);

    function clickHandler(){

    }

  return (
    <div>
         <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn text="Buy Now" onClick={clickHandler}/>
    </div>
  )
}
