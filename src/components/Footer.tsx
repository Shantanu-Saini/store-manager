import { footerData } from "@/variables/pageData"

function Footer() {
  return (
    <div className='left-0 bottom-0 flex items-center justify-between px-6 py-6 bg-black text-white w-full'>
        <div>
            <h1>Need Help?</h1>
            <p>Call : {footerData.mobile}</p>
            <p>Email : {footerData.email}</p>
        </div>
        <div>
            <h1>Follow Us</h1>
            <p>f</p>
            <p>x</p>
            <p>i</p>
        </div>
    </div>
  )
}

export default Footer