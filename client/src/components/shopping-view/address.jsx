import React, { useEffect, useState } from 'react'
import { addressFormControls } from '../../../config/index.js'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/Form'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/AddressSlice/index.js'
import Addresscard from './addresscard.jsx'
import { useToast } from '@/hooks/use-toast.js'

const Address = () => {
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        phone: "",
        pincode: "",
        notes: ""
    })
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)
    const { toast } = useToast()

    function handleManageAddress(e) {
        e.preventDefault();
        //  added only 3 max adddress and null is checking for upadting then is update 
        if (addressList.length >= 3 && currentEditedId===null) {
            setFormData({
                address: "",
                city: "",
                phone: "",
                pincode: "",
                notes: ""
            })
            toast({
                title: "You Can max 3 address",
                variant: "destructive"
            })
            return;
        }
        // check for edit is enable or not
        currentEditedId !== null ?
            // this for updation on address
            dispatch(editAddress({ userId: user?.id, addressId: currentEditedId, formData })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id))
                    setCurrentEditedId(null)
                    setFormData({
                        address: "",
                        city: "",
                        phone: "",
                        pincode: "",
                        notes: ""
                    })
                    toast({
                        title: "Address updated Successfully"
                    })
                }
            })

            :
            // addd new address
            dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id))
                    setFormData({
                        address: "",
                        city: "",
                        phone: "",
                        pincode: "",
                        notes: ""
                    })
                    toast({
                        title: "Address Added Successfully"
                    })
                }
            })
    }

    function isFormValid() {
        return Object.keys(formData).map((key) => {
            formData[key].trim() !== ''
        }).every(items => items)
    }

    // delete for 
    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id))
                toast({
                    title: "Address Delete Successfully"
                })
            }
        })
    }

    // update for
    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        })
    }

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])
    return (
        <Card>
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(singleAddressItem => {
                            return <Addresscard addressinfo={singleAddressItem} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} />
                        }) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <CommonForm formControl={addressFormControls} formData={formData} setFormData={setFormData} onSubmit={handleManageAddress} buttonText={currentEditedId !== null ? "Edit" : "Add"} isDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    )
}

export default Address