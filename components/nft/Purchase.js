import { useEffect, useState } from "react"
import { IoMdWallet } from "react-icons/io";
import { HiTag } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const style = {
    button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
    buttonIcon: `text-xl`,
    buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
    const [selectedMarketNft, setSelectedMarketNft] = useState()
    const [enableButton, setEnableButton] = useState(false)

    useEffect(() => {

        console.log('useEffect 1 ', listings);
        console.log('useEffect 1 ', isListed);
        if (!listings || isListed === 'false') return
        (async () => {
            setSelectedMarketNft(listings.find(marketNft => marketNft.asset?.id === selectedNft.id))
            console.log('useEffect 1 ', selectedMarketNft);
        })()


    }, [selectedNft, listings, isListed,])

    useEffect(() => {
        console.log('useEffect 2 ', selectedMarketNft);
        console.log('useEffect 2 ', selectedNft);
        if (!selectedMarketNft || !selectedNft) return

        setEnableButton(true)


    }, [selectedNft, selectedMarketNft,])

    const confirmPurchase = (message) => {

        if (message === 'success') {

            toast.success('Purchase Successfull!', {
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
        } else {
            toast.error('Purchase Failed!', {
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
    }
    const buyItem = async (
        listingId = selectedMarketNft.id,
        quantityDesired = 1,
        module = marketPlaceModule,
    ) => {
        try {

            await module.buyoutDirectListing({ listingId, quantityDesired })
            confirmPurchase('success')
        } catch (error) {
            console.log('purchase failed : ', error);
            confirmPurchase('failed')
        }

    }

    const logButton = () => {
        console.log('enable button ', enableButton);
    }

    return (
        <div className='bg-[#303339] h-20 w-full flex items-center px-12 rounded-lg border-[#151c22] border'>
            <ToastContainer />
            {isListed === 'true' ? (
                <>
                    <div onClick={() => {
                        enableButton ? buyItem(selectedMarketNft.id, 1) : logButton()
                    }}
                        className={`${ style.button } bg-[#2081e2] hover:bg-[#42a0ff]`}
                    >
                        <IoMdWallet className={style.buttonIcon} />
                        <div className={style.buttonText}>Buy Now</div>

                    </div>
                    <div className={`${ style.button } border border-[#151c22] bg-[#363840] hover:bg-[#4c505c]`}>
                        <HiTag className={style.buttonIcon} />
                        <div className={style.buttonText}>Make Offer</div>
                    </div>
                </>
            ) : (
                <div className={`${ style.button } bg-[#2081e2] hover:bg-[#42a0ff]`}>
                    <IoMdWallet className={style.buttonIcon} />
                    <div className={style.buttonText}>List Item</div>
                </div>
            )}

        </div>
    )
}

export default MakeOffer