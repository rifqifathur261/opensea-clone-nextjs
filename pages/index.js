import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useWeb3 } from '@3rdweb/hooks'
import { useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';








const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Home() {
  const { address, connectWallet } = useWeb3()

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler(`Welcome back ${ userName === 'Unamed' ? ` ${ userName }` : '' }`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#04111d',
        color: '#fff'
      }
    });
  }

  useEffect(() => {
    if (!address) return
    (async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)
      console.log(result.userName);
      welcomeUser(result.userName)
    })()

  }, [address])


  return (
    <div className={style.wrapper}>
      <ToastContainer />
      {address ? (

        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>

          <button className={style.button} onClick={() => connectWallet('injected')}>
            Connect Metamask Wallet
          </button>

          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}
