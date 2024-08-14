"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'

function HomePage() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/user/logout')
      router.push("/login");
      console.log("Logout Successful", response);
    } catch (error: any) {
      console.log(error.message, "Error in Logging Out");
    }
  }

  return (
    <div>
      <h1>Welcome to the home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage